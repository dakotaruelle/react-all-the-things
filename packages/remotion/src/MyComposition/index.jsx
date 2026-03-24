import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { usePokemon } from "../../../shared/hooks/use-pokemon-hook";

const POKEMON_IDS = [1, 4, 7, 25, 39, 52, 54, 66, 74, 92];

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Oscillates between 0 (ground) and 1 (peak) repeatedly
  const bounce = Math.abs(Math.sin((frame / fps) * Math.PI * 2));

  // Map peak (1) to top of arc, ground (0) to resting position
  const translateY = interpolate(bounce, [0, 1], [40, -200]);

  // Squash horizontally and compress vertically at ground contact
  const scaleX = interpolate(bounce, [0, 0.15, 1], [1.2, 1, 1]);
  const scaleY = interpolate(bounce, [0, 0.15, 1], [0.8, 1, 1]);

  // A new bounce starts every fps/2 frames
  const currentBounce = Math.floor(frame / (fps / 2));
  const pokemonId = POKEMON_IDS[currentBounce % POKEMON_IDS.length];
  const pokemon = usePokemon(pokemonId);

  // Fade pokemon in on ground contact, out as ball rises
  const pokemonOpacity = interpolate(bounce, [0, 0.25, 0.5], [1, 1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      {pokemon && (
        <div
          style={{
            position: "absolute",
            bottom: 280,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: pokemonOpacity,
          }}
        >
          <Img src={pokemon.imageUrl} style={{ width: 160, imageRendering: "pixelated" }} />
          <span style={{ fontSize: 32, fontWeight: "bold", textTransform: "capitalize" }}>
            {pokemon.name}
          </span>
        </div>
      )}
      <Img
        src={staticFile("pokeball.jpg")}
        style={{
          width: 400,
          marginBottom: 100,
          transform: `translateY(${translateY}px) scaleX(${scaleX}) scaleY(${scaleY})`,
          transformOrigin: "bottom center",
        }}
      />
    </AbsoluteFill>
  );
};
