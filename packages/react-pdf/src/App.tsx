import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import { usePokemon } from '../../shared/hooks/use-pokemon-hook';
import { useState, useEffect } from 'react';
import pokeball from './pokeball.png';

export interface Pokemon {
  name: string;
  imageUrl: string;
}

export function getRandomIds(count: number): number[] {
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

const ids = getRandomIds(4);

function usePokemonTeam() {
  const p1 = usePokemon(ids[0]);
  const p2 = usePokemon(ids[1]);
  const p3 = usePokemon(ids[2]);
  const p4 = usePokemon(ids[3]);

  const [resolved, setResolved] = useState<Pokemon[] | null>(null);

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

  return resolved;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  sprite: {
    width: 150,
    height: 150,
    marginTop: 10
  },
  loadingPage: {
    padding: 30
  }
});

export function PokemonDocument({ pokemon }: { pokemon: Pokemon[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ ...styles.section, alignItems: 'center' }}>
          <Text>Who's that Pokemon?</Text>
          <Image src={pokeball} style={styles.sprite} />
        </View>
        <View style={{ ...styles.section, alignItems: 'center' }}>
            {pokemon.map((p, index) =>
              <View key={index} style={{ alignItems: 'center' }}>
                <Image src={p.imageUrl} style={styles.sprite} />
                <Text>{p.name}</Text>
              </View>)
            }
        </View>
      </Page>
    </Document>
  );
}

export function MyDocument() {
  const pokemon = usePokemonTeam();

  if (!pokemon) {
    return (
      <Document>
        <Page size="A4" style={styles.loadingPage}>
          <Text>Loading Pokemon...</Text>
        </Page>
      </Document>
    );
  }

  return <PokemonDocument pokemon={pokemon} />;
}
