import {
  Document,
  Section,
  Paragraph,
  H1,
  Image,
  Table,
  Tbody,
  Tr,
  Td,
  Bold,
} from "@cordel/react-docx";
import { renderToBuffer } from "@cordel/react-docx";

interface Pokemon {
  name: string;
  imageUrl: string;
}

function getRandomIds(count: number): number[] {
  const ids = new Set<number>();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * 151) + 1);
  }
  return [...ids];
}

async function fetchPokemon(id: number): Promise<Pokemon> {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const result = await response.json();
  return {
    name: result.name,
    imageUrl: result.sprites["front_default"],
  };
}

const ids = getRandomIds(4);
const pokemon = await Promise.all(ids.map(fetchPokemon));

const PokemonDoc = () => (
  <Document>
    <Section>
      <H1>Who's that Pokemon?</H1>
      <Image src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png'} width={150} height={150} />
    </Section>
  </Document>
);

const { buffer } = await renderToBuffer(<PokemonDoc />);
await Bun.write("pokemon.docx", buffer);
