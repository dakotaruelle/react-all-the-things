import { usePokemon } from '../../shared/hooks/use-pokemon-hook';

interface PokemonProps {
  id: number;
}

export function Pokemon({ id }: PokemonProps) {
  const pokemon = usePokemon(id);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={pokemon.imageUrl} alt={pokemon.name} />
      <p>{pokemon.name}</p>
    </div>
  );
}