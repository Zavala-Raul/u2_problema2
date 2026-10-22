import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export default function PokemonSearch() {
  const { searchState, searchPokemonAction, isSearching, isPending } = useContext(PokemonContext);

  return (
    <section className="panel" aria-labelledby="search-title">
      <div className="section-heading">
        <span className="step">01</span>
        <div>
          <h2 id="search-title">Buscar pokémon</h2>
          <p>Escribe el nombre exacto para cargarlo en el formulario.</p>
        </div>
      </div>
      <form className="ticket-form" action={searchPokemonAction} noValidate>
        <div className="field">
          <label htmlFor="query">Nombre</label>
          <input id="query" name="query" placeholder="Ej. pikachu" autoComplete="off" disabled={isSearching || isPending} />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className="feedback" aria-live="polite">{searchState.message}</div>
        <button className="button primary" type="submit" disabled={isSearching || isPending}>
          {isSearching ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
    </section>
  );
}
