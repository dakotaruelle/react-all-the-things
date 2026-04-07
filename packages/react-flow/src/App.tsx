import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ReactFlow,
  Handle,
  Position,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  type Connection,
  type NodeProps,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { usePokemon } from '@shared/hooks/use-pokemon-hook';

function PokemonNode({ data }: NodeProps) {
  return (
    <div style={{ textAlign: 'center', padding: 8 }}>
      {!(data as any).hideTop && <Handle type="target" position={Position.Top} />}
      {(data as any).imageUrl && (
        <img src={data.imageUrl as string} width={64} height={64} alt={data.label as string} />
      )}
      <div>{String(data.label)}</div>
      {!(data as any).hideBottom && <Handle type="source" position={Position.Bottom} />}
    </div>
  );
}

const nodeTypes = { pokemon: PokemonNode };

const initialEdges: Edge[] = [
  { id: '1->2', source: 'n-1', target: 'n-2', animated: true },
  { id: '2->3', source: 'n-2', target: 'n-3', animated: true },
  { id: 'c1->c2', source: 'c-1', target: 'c-2', animated: true },
  { id: 'c2->c3', source: 'c-2', target: 'c-3', animated: true },
  { id: 's1->s2', source: 's-1', target: 's-2', animated: true },
  { id: 's2->s3', source: 's-2', target: 's-3', animated: true },
];

function App() {
  const bulbasaur = usePokemon(1);
  const ivysaur = usePokemon(2);
  const venusaur = usePokemon(3);
  const charmander = usePokemon(4);
  const charmeleon = usePokemon(5);
  const charizard = usePokemon(6);
  const squirtle = usePokemon(7);
  const wartortle = usePokemon(8);
  const blastoise = usePokemon(9);

  const pokemon = useMemo(() => [
    { id: 'n-1', data: bulbasaur, x: 0, y: 0, hideTop: true },
    { id: 'n-2', data: ivysaur, x: 0, y: 150 },
    { id: 'n-3', data: venusaur, x: 0, y: 300, hideBottom: true },
    { id: 'c-1', data: charmander, x: 300, y: 0, hideTop: true },
    { id: 'c-2', data: charmeleon, x: 300, y: 150 },
    { id: 'c-3', data: charizard, x: 300, y: 300, hideBottom: true },
    { id: 's-1', data: squirtle, x: 600, y: 0, hideTop: true },
    { id: 's-2', data: wartortle, x: 600, y: 150 },
    { id: 's-3', data: blastoise, x: 600, y: 300, hideBottom: true },
  ], [bulbasaur, ivysaur, venusaur, charmander, charmeleon, charizard, squirtle, wartortle, blastoise]);

  const [nodes, setNodes] = useState<Node[]>(
    pokemon.map((p) => ({
      id: p.id,
      type: 'pokemon',
      position: { x: p.x, y: p.y },
      data: { label: '...', imageUrl: '', hideTop: p.hideTop ?? false, hideBottom: p.hideBottom ?? false },
    })),
  );
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  useEffect(() => {
    setNodes((prev) =>
      prev.map((node) => {
        const p = pokemon.find((pk) => pk.id === node.id);
        return {
          ...node,
          data: {
            label: p?.data?.name ?? '...',
            imageUrl: p?.data?.imageUrl ?? '',
            hideTop: p?.hideTop ?? false,
            hideBottom: p?.hideBottom ?? false,
          },
        };
      }),
    );
  }, [pokemon]);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}

export default App;
