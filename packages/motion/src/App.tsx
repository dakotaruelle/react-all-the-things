import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { usePokemon } from '@shared/hooks/use-pokemon-hook'
import './App.css'

function getRandomPokemonId() {
  return Math.floor(Math.random() * 151) + 1;
}

function App() {
  const [pokemonId, setPokemonId] = useState<number | undefined>(undefined)
  const pokemon = usePokemon(pokemonId)

  return (
    <div className="container">
      <div className="scene">
        <motion.button
          className="pokeball-btn"
          onClick={() => setPokemonId(getRandomPokemonId())}
          whileHover={{ scale: 1.1 }}
          whileTap={{ rotate: 360, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          aria-label="Catch a Pokemon"
        >
          <img src="/pokeball.png" alt="Pokeball" width={120} height={120} />
        </motion.button>

        <AnimatePresence mode="wait">
          {pokemon && (
            <motion.div
              key={pokemon.name}
              className="pokemon-display"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <motion.img
                src={pokemon.imageUrl}
                alt={pokemon.name}
                width={120}
                height={120}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
              />
              <motion.p
                className="pokemon-name"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {pokemon.name}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
