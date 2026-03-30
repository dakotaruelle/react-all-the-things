import { Buffer } from 'buffer';
(globalThis as unknown as Record<string, unknown>).Buffer = Buffer;
import { PDFViewer } from '@react-pdf/renderer';
import { MyDocument } from './App';
import { createRoot } from 'react-dom/client';
import { usePokemon } from '@shared/hooks/use-pokemon-hook';
import { useState, useEffect } from 'react';

const ids = getRandomIds(4);

interface PokemonWithDataUrl {
  name: string;
  imageUrl: string;
}

function App() {
  const p1 = usePokemon(ids[0]);
  const p2 = usePokemon(ids[1]);
  const p3 = usePokemon(ids[2]);
  const p4 = usePokemon(ids[3]);

  const [resolved, setResolved] = useState<PokemonWithDataUrl[] | null>(null);

  const pokemon = [p1, p2, p3, p4].filter(p => p !== undefined);

  useEffect(() => {
    if (!pokemon.length) return;

    let cancelled = false;
    
    Promise.all(
      pokemon.map(async (p) => ({
        name: p.name,
        imageUrl: await toJpgDataUrl(p.imageUrl),
      }))
    ).then((result) => {
      if (!cancelled) setResolved(result);
    });
    return () => { cancelled = true; };
  }, [pokemon.length]);

  if (!resolved) {
    return <div>Loading Pokemon...</div>;
  }

  return (
    <PDFViewer style={{ width: '100vw', height: '100vh' }}>
      <MyDocument pokemon={resolved} />
    </PDFViewer>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);


function getRandomIds(count: number): number[] {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * 151) + 1);
  }
  return [...ids];
}

async function toJpgDataUrl(url: string): Promise<string> {
  const img = new window.Image();
  img.crossOrigin = 'anonymous';
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = url;
  });
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#E4E4E4';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/jpeg', 0.95);
}