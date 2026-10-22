import { type PokemonDetails } from "../types/PokemonDetails";

type PokemonResponse = {
    id: number;
    name: string;
    sprites: {
        front_default: string | null;
    };
    types: [
        {
            slot: number,
            type: {
                name: string
            }
        }
    ];
};

export const getPokemonAsync = async (reference: string): Promise<PokemonDetails> => {
    const search = reference.trim().toLowerCase();

    if (!search) {
        throw new Error('Escribe el nombre de un pokémon.');
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);

    if (response.status === 404) {
        throw new Error('Sin resultados.');
    }

    if (!response.ok) {
        throw new Error('No se pudo consultar PokéAPI.');
    }

    const pokemonData: PokemonResponse = await response.json();

    return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default ?? '',
        type: pokemonData.types[0].type.name
    };
};
