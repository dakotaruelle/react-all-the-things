// @ts-nocheck
import { Assets, Texture } from 'pixi.js';
import { useEffect, useState } from 'react';
import { usePokemon } from '@shared/hooks/use-pokemon-hook';

interface PokemonSpriteProps {
    pokemonId: number;
    x: number;
    y: number;
}

export function PokemonSprite({ pokemonId, x, y }: PokemonSpriteProps) {
    const pokemon = usePokemon(pokemonId);
    const [texture, setTexture] = useState(Texture.EMPTY);

    useEffect(() => {
        if (pokemon?.imageUrl) {
            Assets.load(pokemon.imageUrl).then(setTexture);
        }
    }, [pokemon?.imageUrl]);

    if (!pokemon) return null;

    return (
        <pixiSprite
            anchor={0.5}
            texture={texture}
            x={x}
            y={y}
            width={96}
            height={96}
        />
    );
}
