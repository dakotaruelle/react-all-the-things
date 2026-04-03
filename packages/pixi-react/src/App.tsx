import {
  Application,
  extend,
} from '@pixi/react';
import {
  Container,
  Graphics,
  Sprite,
} from 'pixi.js';
import { useState } from 'react';

import { PokeballSprite } from './PokeballSprite';
import { PokemonSprite } from './PokemonSprite';

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Graphics,
  Sprite,
});

export default function App() {
  const [pokemonId, setPokemonId] = useState<number | undefined>(undefined);

  function handlePokeballClick() {
    setPokemonId(Math.ceil(Math.random() * 151));
  }

  return (
    <Application background={0xffffff}>
      <PokeballSprite onClick={handlePokeballClick} />
      {pokemonId !== undefined && (
        <PokemonSprite pokemonId={pokemonId} x={350} y={200} />
      )}
    </Application>
  );
}
