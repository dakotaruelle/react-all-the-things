import { useState, useEffect } from 'react'
import { render } from 'react-nil'
import { usePokemon } from '../../shared/hooks/use-pokemon-hook'

function EmptyPokemon() {
  const [pokemonId, setPokemonId] = useState(() => Math.floor(Math.random() * 151) + 1)
  useEffect(() => void setInterval(() => setPokemonId(Math.floor(Math.random() * 151) + 1), 1000), [])

  const pokemon = usePokemon(pokemonId)

  console.log(pokemon?.name)
}

render(<EmptyPokemon />)