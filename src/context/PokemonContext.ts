import { createContext } from 'react';
import type { PokemonDetails } from '../types/PokemonDetails';
import type { PokeItem } from '../types/PokeItem';

type PokemonContextValue = {
  pokes: PokeItem[];
  selectPoke: (pokemon: PokemonDetails | null) => void;
  addPoke: (pokemon: PokemonDetails, nickname: string, role: string) => void;
  deletePoke: (id: string) => void;
  formState: { message: string };
  addPokemonAction: (formData: FormData) => void;
  isPending: boolean;
  selectedPokemon: PokemonDetails | null;
  searchState: { message: string };
  searchPokemonAction: (formData: FormData) => void;
  isSearching: boolean;
  total: number;
  titulares: number;
  reservas: number;
};

export const PokemonContext = createContext<PokemonContextValue>({
  pokes: [],
  selectPoke: () => {},
  addPoke: () => {},
  deletePoke: () => {},
  formState: { message: '' },
  addPokemonAction: () => {},
  isPending: false,
  selectedPokemon: null,
  searchState: { message: '' },
  searchPokemonAction: () => {},
  isSearching: false,
  total: 0,
  titulares: 0,
  reservas: 0
});
