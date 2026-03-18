import { useEffect, useState } from 'react';

interface Pokemon {
  name: string;
  imageUrl: string;
}

export function usePokemon(pokemonId: number | undefined) {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>(undefined);

  useEffect(() => {
    async function getPokemon() {
      if (pokemonId === undefined) {
        return;
      }

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`,
      );
      const result = await response.json();

      console.log('name: ', result.name);
      console.log('sprite url: ', result.sprites['front_default']);

      setPokemon({
        name: result.name,
        imageUrl: result.sprites['front_default'],
      });
    }

    getPokemon();
  }, [pokemonId]);

  return pokemon;
}
