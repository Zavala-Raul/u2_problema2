import type { ReactNode } from 'react';
import usePokemon from '../hooks/usePokemon';
import { PokemonContext } from './PokemonContext';

type PokemonProviderProps = {
  children: ReactNode;
};

const PokemonProvider = ({ children }: PokemonProviderProps) => {
  const {
    pokes, selectPoke, addPoke, deletePoke, formState, addPokemonAction, isPending,
    selectedPokemon, total, titulares, reservas,
    searchState, searchPokemonAction, isSearching
  } = usePokemon();

  return (
    <PokemonContext.Provider value={{
      pokes, selectPoke, addPoke, deletePoke, formState, addPokemonAction, isPending,
      selectedPokemon, total, titulares, reservas,
      searchState, searchPokemonAction, isSearching
    }}>
      {children}
    </PokemonContext.Provider>
  );
};

export default PokemonProvider;
