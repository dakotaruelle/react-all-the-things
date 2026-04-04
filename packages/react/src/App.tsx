import { useState } from 'react'
import { usePokemon } from '@shared/hooks/use-pokemon-hook'
import './App.css'

function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1;
}

function App() {
  const [pokemonId, setPokemonId] = useState<number | undefined>(undefined)
  const pokemon = usePokemon(pokemonId)

  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <main className="flex flex-1 flex-col items-center justify-center gap-6">
        <h1>Gotta catch em all!</h1>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => setPokemonId(getRandomPokemonId())}
            aria-label="Catch a Pokemon"
            className='cursor-pointer'
          >
            <img src="/pokeball.png" alt="Pokeball" width={100} height={100} />
          </button>
          {pokemon && (
            <div className="flex flex-col items-center gap-1 mt-4">
              <img src={pokemon.imageUrl} alt={pokemon.name} width={96} height={96} />
              <p>{pokemon.name}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
