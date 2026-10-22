import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export default function RegistrySummary() {
  const { total, titulares, reservas } = useContext(PokemonContext);

  return (
    <section className="summary" aria-label="Resumen de registros">
      <article className="stat"><span>Total</span><strong>{total}</strong></article>
      <article className="stat"><span>Titulares</span><strong className="text-amber">{titulares}</strong></article>
      <article className="stat"><span>Reservas</span><strong className="text-green">{reservas}</strong></article>
    </section>
  );
}
