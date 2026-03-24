import { usePokemon } from '@shared/hooks/use-pokemon-hook';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [selectedPokemonId, setSelectedPokemonId] = useState<
    number | undefined
  >(undefined);
  const selectedPokemon = usePokemon(selectedPokemonId);

  function onClick() {
    setSelectedPokemonId(155);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Who's that Pokemon?</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Pressable
          onPress={onClick}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
        >
          <Image
            source={require('@/assets/images/pokeball.png')}
            style={{ width: 100, height: 100 }}
          />
        </Pressable>
      </ThemedView>
      {selectedPokemon && (
        <ThemedView style={styles.stepContainer}>
          <ThemedText>{selectedPokemon.name}</ThemedText>
          <Image
            source={{ uri: selectedPokemon.imageUrl }}
            style={{ width: 250, height: 250 }}
          />
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
