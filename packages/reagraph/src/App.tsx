import './App.css'
import { GraphCanvas } from 'reagraph';
import { usePokemon } from '@shared/hooks/use-pokemon-hook';

function App() {
  const bulbasaur = usePokemon(1);
  const ivysaur = usePokemon(2);
  const venasaur = usePokemon(3);
  const charmander = usePokemon(4);
  const chameleon = usePokemon(5);
  const charizard = usePokemon(6);
  const squirtle = usePokemon(7);
  const wartortle = usePokemon(8);
  const blastoise = usePokemon(9);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <GraphCanvas
        nodes={[
          { id: "n-1", label: bulbasaur?.name ?? "...", icon: bulbasaur?.imageUrl, fx: -50, fy: -50 },
          { id: "n-2", label: ivysaur?.name ?? "...", icon: ivysaur?.imageUrl,     fx: -50, fy:   0 },
          { id: "n-3", label: venasaur?.name ?? "...", icon: venasaur?.imageUrl,   fx: -50, fy:  50 },
          { id: "s-1", label: squirtle?.name ?? "...", icon: squirtle?.imageUrl,   fx:   0, fy: -50 },
          { id: "s-2", label: wartortle?.name ?? "...", icon: wartortle?.imageUrl, fx:   0, fy:   0 },
          { id: "s-3", label: blastoise?.name ?? "...", icon: blastoise?.imageUrl, fx:   0, fy:  50 },
          { id: "c-1", label: charmander?.name ?? "...", icon: charmander?.imageUrl, fx: 50, fy: -50 },
          { id: "c-2", label: chameleon?.name ?? "...", icon: chameleon?.imageUrl,   fx: 50, fy:   0 },
          { id: "c-3", label: charizard?.name ?? "...", icon: charizard?.imageUrl,   fx: 50, fy:  50 },
        ]}
        edges={[
          { id: "1->2", source: "n-1", target: "n-2" },
          { id: "2->3", source: "n-2", target: "n-3" },
          { id: "s1->s2", source: "s-1", target: "s-2" },
          { id: "s2->s3", source: "s-2", target: "s-3" },
          { id: "c1->c2", source: "c-1", target: "c-2" },
          { id: "c2->c3", source: "c-2", target: "c-3" },
        ]}
      />
    </div>
  )
}

export default App

