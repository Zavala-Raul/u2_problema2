import EmptyState from './EmptyState.tsx';
import { useContext } from 'react';
import { PokemonContext } from '../context/PokemonContext';

export default function RegistryList() {
  const { pokes, deletePoke } = useContext(PokemonContext);

  return (
    <section className="panel list-panel" aria-labelledby="list-title">
      <div className="section-heading">
        <span className="step">03</span>
        <div>
          <h2 id="list-title">Registros</h2>
          <p>Cada envío simulado agrega una tarjeta al final.</p>
        </div>
      </div>
      <div className="ticket-list">
        {pokes.length === 0 ? <EmptyState /> : pokes.map(item => (
          <article key={item.entryId} className="ticket">
            <div className="ticket-top">
              <span className="ticket-id">Registro {item.entryId}</span>
              <div className="badges">
                <span className="badge">{item.details.type}</span>
                <span className={`badge role-${item.role}`}>
                  {item.role === 'titular' ? 'Titular' : 'Reserva'}
                </span>
              </div>
            </div>
            <div className="preview">
              {item.details.image && (
                <img src={item.details.image} alt={item.details.name} width={72} height={72} />
              )}
              <div>
                <h3>{item.nickname}</h3>
                <p className="requester">#{item.details.id} {item.details.name}</p>
              </div>
            </div>
            <div className="ticket-actions">
              <button className="button danger" type="button" onClick={() => deletePoke(item.entryId)}>
                Eliminar
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
