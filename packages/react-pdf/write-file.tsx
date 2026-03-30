import ReactPDF from '@react-pdf/renderer';
import { PokemonDocument, getRandomIds, type Pokemon } from './src/App';
import sharp from 'sharp';

async function fetchPokemon(id: number): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const result = await response.json() as { name: string; sprites: Record<string, string> };
  const spriteUrl = result.sprites['front_default']!;

  const imgResponse = await fetch(spriteUrl);
  const pngBuffer = Buffer.from(await imgResponse.arrayBuffer());
  const jpgBuffer = await sharp(pngBuffer).flatten({ background: '#E4E4E4' }).jpeg({ quality: 95 }).toBuffer();
  const imageUrl = `data:image/jpeg;base64,${jpgBuffer.toString('base64')}`;

  return { name: result.name, imageUrl };
}

const ids = getRandomIds(4);
const pokemon = await Promise.all(ids.map(fetchPokemon));

ReactPDF.render(<PokemonDocument pokemon={pokemon} />, `${__dirname}/pokemon.pdf`);
