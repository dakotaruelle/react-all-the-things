import { Page, Text, View, Image, Document, StyleSheet } from '@react-pdf/renderer';
import pokeball from './pokeball.png';

interface Pokemon {
  name: string;
  imageUrl: string;
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
  pokemonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10
  },
  pokemonItem: {
    alignItems: 'center',
    width: 96
  },
  pokemonImage: {
    width: 96,
    height: 96
  },
  pokemonName: {
    fontSize: 10,
    textTransform: 'capitalize',
    marginTop: 4
  }
});

export function MyDocument({ pokemon }: { pokemon: Pokemon[] }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ ...styles.section, alignItems: 'center' }}>
          <Text>Who's that Pokemon?</Text>
          <Image src={pokeball} style={styles.sprite} />
        </View>
        <View style={{ ...styles.section, alignItems: 'center' }}>
            {pokemon.length && pokemon.map( (p, index) => 
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
