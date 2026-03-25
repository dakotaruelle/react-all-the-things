import React, {useState} from 'react';
import {Box, Text, useInput} from 'ink';
import Image from "ink-picture";
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pokeballPath = path.resolve(__dirname, '../source/pokeball.png');

export default function App({name = 'Stranger'}: Props) {
	const [pressCount, setPressCount] = useState(0);

	return (
		<Box flexDirection="row" gap={2}>
			<Image
				src={pokeballPath}
				width={20}
				height={20}
				alt="Pokeball"
			/>
			<Box flexDirection="column" gap={1}>
				<Text>
					Hello, <Text color="green">{name}</Text>
				</Text>
				<Button label="Press Enter to click me" onPress={() => setPressCount(c => c + 1)} />
				{pressCount > 0 && (
					<Text color="cyan">Button pressed {pressCount} time{pressCount === 1 ? '' : 's'}!</Text>
				)}
			</Box>
		</Box>
	);
}

type Props = {
	name: string | undefined;
};

function Button({label, onPress}: {label: string; onPress: () => void}) {
	const [focused, setFocused] = useState(false);

	useInput((input, key) => {
		if (key.return) {
			onPress();
		}

		if (input === 'f') {
			setFocused(f => !f);
		}
	});

	return (
		<Box
			borderStyle="round"
			borderColor={focused ? 'green' : 'white'}
			paddingX={1}
		>
			<Text color={focused ? 'green' : 'white'}>{label}</Text>
		</Box>
	);
}


