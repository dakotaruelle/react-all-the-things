'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePokemon } from '@shared/hooks/use-pokemon-hook';

export default function PokemonButton() {
  const [pokemonId, setPokemonId] = useState<number | undefined>(undefined);
  const pokemon = usePokemon(pokemonId);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => setPokemonId(getRandomPokemonId())}
        className="transition-transform hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Catch a Pokemon"
      >
        <Image src="/pokeball.png" alt="Pokeball" width={100} height={100} />
      </button>
      {pokemon && (
        <div className="flex flex-col items-center gap-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={pokemon.imageUrl} alt={pokemon.name} width={96} height={96} />
          <p className="capitalize text-lg font-semibold dark:text-zinc-50">{pokemon.name}</p>
        </div>
      )}
    </div>
  );
}

function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1;
}