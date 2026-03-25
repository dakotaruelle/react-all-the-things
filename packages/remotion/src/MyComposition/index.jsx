import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { usePokemon } from "../../../shared/hooks/use-pokemon-hook";

const POKEMON_IDS = [1, 4, 7, 25, 39, 52, 54, 66, 74, 92];

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Oscillates between 0 (ground) and 1 (peak) repeatedly
  const bounce = Math.abs(Math.sin((frame / (fps * 2)) * Math.PI * 2));

  // Map peak (1) to top of arc, ground (0) to resting position
  const translateY = interpolate(bounce, [0, 1], [40, -200]);

  // Squash horizontally and compress vertically at ground contact
  const scaleX = interpolate(bounce, [0, 0.15, 1], [1.2, 1, 1]);
  const scaleY = interpolate(bounce, [0, 0.15, 1], [0.8, 1, 1]);

  // Ball hits bottom every fps frames (Math.abs halves the sin period)
  const currentBounce = Math.floor(frame / fps);
  const pokemonId = POKEMON_IDS[currentBounce % POKEMON_IDS.length];
  const pokemon = usePokemon(pokemonId);

  // Fade pokemon in/out over each bounce cycle
  const bounceInterval = fps;
  const frameInBounce = frame % bounceInterval;
  const pokemonOpacity = interpolate(
    frameInBounce,
    [0, 8, bounceInterval - 8, bounceInterval],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      {/* Pokemon sprite — left side */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 100,
          marginLeft: 200,
          opacity: pokemon ? pokemonOpacity : 0,
        }}
      >
        {pokemon && (
          <>
            <Img src={pokemon.imageUrl} style={{ width: 160, imageRendering: "pixelated" }} />
            <span style={{ fontSize: 32, fontWeight: "bold", textTransform: "capitalize" }}>
              {pokemon.name}
            </span>
          </>
        )}
      </div>

      {/* Pokeball — right side */}
      <Img
        src={staticFile("pokeball.jpg")}
        style={{
          width: 400,
          marginBottom: 100,
          marginRight: 200,
          transform: `translateY(${translateY}px) scaleX(${scaleX}) scaleY(${scaleY})`,
          transformOrigin: "bottom center",
        }}
      />
    </AbsoluteFill>
  );
};
