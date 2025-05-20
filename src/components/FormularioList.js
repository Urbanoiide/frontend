import React from 'react';
import { Link } from 'react-router-dom';

const FormularioList = ({ formularios }) => {
  return (
    <div>
      <h2>Formularios Disponibles</h2>
      <ul>
        {formularios.map(f => (
          <li key={f.id}>
            <strong>{f.nombre}</strong> - {f.descripcion}
            {/* Link para redirigir a la página de responder el formulario */}
            <Link to={`/formulario/${f.id}`}>Responder</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FormularioList;
