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

      if (!(result as any)?.name) {
        throw new Error('Pokemon result does not have a name')
      }

      if (!(result as any)?.sprites['front_default']) {
        throw new Error('Pokemon result does not have a sprite')
      }

      setPokemon({
        // @ts-ignore
        name: result.name,
        // @ts-ignore
        imageUrl: result.sprites['front_default'],
      });
    }

    getPokemon();
  }, [pokemonId]);

  return pokemon;
}
