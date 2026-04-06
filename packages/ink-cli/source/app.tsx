import React, {useState} from 'react';
import {Box, Text, useApp, useInput} from 'ink';
import Image from 'ink-picture';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {usePokemon} from '../../shared/hooks/use-pokemon-hook';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pokeballPath = path.resolve(__dirname, './pokeball.png');

const MENU_ITEMS = ['Cyndaquil', 'Turtwig', 'Random'] as const;
const POKEMON_IDS: Record<string, number> = {
	Cyndaquil: 155,
	Turtwig: 387,
};

export default function App() {
	const {exit} = useApp();
	const [pokemonId, setPokemonId] = useState<number | undefined>(undefined);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const pokemon = usePokemon(pokemonId);

	useInput((input, key) => {
		if (key.upArrow) {
			setSelectedIndex(i => (i - 1 + MENU_ITEMS.length) % MENU_ITEMS.length);
		} else if (key.downArrow) {
			setSelectedIndex(i => (i + 1) % MENU_ITEMS.length);
		} else if (key.return) {
			const item = MENU_ITEMS[selectedIndex];
			if (item === 'Random') {
				setPokemonId(Math.floor(Math.random() * 898) + 1);
			} else {
				setPokemonId(POKEMON_IDS[item]);
			}
		} else if (input === 'q' || key.escape) {
			exit();
		}
	});

	return (
		<Box flexDirection="column" justifyContent="flex-start">
			<Box flexDirection="row" width={60} height={30}>
				<Image src={pokeballPath} protocol="kitty" alt={' '} />
				{pokemon?.imageUrl && (
					<Image src={pokemon.imageUrl} protocol="kitty" alt={' '} />
				)}
			</Box>
			<Box flexDirection="column">
				{MENU_ITEMS.map((item, index) => (
					<Text key={item} color={index === selectedIndex ? 'cyan' : undefined}>
						{index === selectedIndex ? '• ' : '  '}
						{item}
					</Text>
				))}
			</Box>
		</Box>
	);
}
