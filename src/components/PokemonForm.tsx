import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export default function PokemonForm() {
  const { selectedPokemon, formState, addPokemonAction, isPending } = useContext(PokemonContext);

  return (
    <section className="panel" aria-labelledby="form-title">
      <div className="section-heading">
        <span className="step">02</span>
        <div>
          <h2 id="form-title">Datos del pokémon</h2>
          <p>La búsqueda llena estos campos. Después simula el registro.</p>
        </div>
      </div>
      <form className="ticket-form" action={addPokemonAction} noValidate>
        <div className="preview">
          {selectedPokemon?.image && (
            <img src={selectedPokemon.image} alt={selectedPokemon.name} width={72} height={72} />
          )}
          <div>
            <p className="ticket-id">{selectedPokemon ? `#${selectedPokemon.id}` : 'Sin selección'}</p>
            <strong>{selectedPokemon?.name ?? 'Ningún pokémon cargado'}</strong>
          </div>
        </div>
        <div className="field">
          <label htmlFor="pokemonId">Número</label>
          <input id="pokemonId" name="pokemonId" value={selectedPokemon?.id ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="pokemonName">Nombre</label>
          <input id="pokemonName" name="pokemonName" value={selectedPokemon?.name ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="type">Tipo</label>
          <input id="type" name="type" value={selectedPokemon?.type ?? ''} readOnly />
        </div>
        <div className="field">
          <label htmlFor="nickname">Apodo</label>
          <input id="nickname" name="nickname" placeholder="Ej. Chispa" disabled={isPending} />
          <small>Mínimo 3 caracteres.</small>
        </div>
        <div className="field">
          <label htmlFor="role">Rol</label>
          <select id="role" name="role" disabled={isPending}>
            <option value="">Selecciona un rol</option>
            <option value="titular">Titular</option>
            <option value="reserva">Reserva</option>
          </select>
        </div>
        <div className="feedback" aria-live="polite">{formState.message}</div>
        <button className="button primary" type="submit" disabled={!selectedPokemon || isPending}>
          {isPending ? 'Registrando...' : 'Registrar pokémon'}
        </button>
      </form>
    </section>
  );
}
