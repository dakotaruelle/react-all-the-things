import { Assets, Texture } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';
import { useTick } from '@pixi/react';
import pokeballUrl from './pokeball.png';

const BASE_Y = 200;
const HOP_HEIGHT = 30;
const HOP_SPEED = 0.02;

interface PokeballSpriteProps {
  onClick: () => void;
}

export function PokeballSprite({ onClick }: PokeballSpriteProps) {
  const [texture, setTexture] = useState(Texture.EMPTY);
  const spriteRef = useRef<any>(null);
  const hopProgress = useRef<number | null>(null);

  useEffect(() => {
    Assets.load(pokeballUrl).then(setTexture);
  }, []);

  useTick(() => {
    if (hopProgress.current === null || !spriteRef.current) return;

    hopProgress.current += HOP_SPEED;

    if (hopProgress.current >= 1) {
      hopProgress.current = null;
      spriteRef.current.y = BASE_Y;
      return;
    }

    spriteRef.current.y = BASE_Y - HOP_HEIGHT * Math.sin(hopProgress.current * Math.PI);
  });

  function handleClick() {
    hopProgress.current = 0;
    onClick();
  }

  return (
    <pixiSprite
      ref={spriteRef}
      anchor={0.5}
      texture={texture}
      x={200}
      y={BASE_Y}
      width={150}
      height={150}
      eventMode="static"
      cursor="pointer"
      onClick={handleClick}
    />
  );
}
