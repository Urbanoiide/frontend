import React, { useState } from 'react';
import axios from 'axios';

const FormularioCrear = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [campos, setCampos] = useState([{ pregunta: '', tipo: 'radio', opciones: [''] }]);

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/formulario', {
      nombre,
      descripcion,
      campos
    }).then(() => alert('Formulario creado'));
  };

  return (
    <div className="container mt-4">
      <h2>Crear Nuevo Formulario</h2>
      <form onSubmit={handleSubmit} className="mt-3">

        <div className="mb-3">
          <label className="form-label">Nombre del Formulario</label>
          <input type="text" className="form-control" value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <input type="text" className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
        </div>

        {campos.map((campo, i) => (
          <div key={i} className="border p-3 mb-3 rounded">
            <div className="mb-2">
              <label className="form-label">Pregunta {i + 1}</label>
              <input
                type="text"
                className="form-control"
                value={campo.pregunta}
                onChange={e => {
                  const newCampos = [...campos];
                  newCampos[i].pregunta = e.target.value;
                  setCampos(newCampos);
                }}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Tipo de respuesta</label>
              <select
                className="form-select"
                value={campo.tipo}
                onChange={e => {
                  const newCampos = [...campos];
                  newCampos[i].tipo = e.target.value;
                  setCampos(newCampos);
                }}
              >
                <option value="radio">Opción única</option>
                <option value="checkbox">Múltiples opciones</option>
              </select>
            </div>

            {campo.opciones.map((op, j) => (
              <div className="mb-2" key={j}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Opción ${j + 1}`}
                  value={op}
                  onChange={e => {
                    const newCampos = [...campos];
                    newCampos[i].opciones[j] = e.target.value;
                    setCampos(newCampos);
                  }}
                />
              </div>
            ))}

            <button
              type="button"
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={() => {
                const newCampos = [...campos];
                newCampos[i].opciones.push('');
                setCampos(newCampos);
              }}
            >
              Agregar Opción
            </button>
          </div>
        ))}

        <div className="mb-3">
          <button
            type="button"
            className="btn btn-outline-primary me-2"
            onClick={() => setCampos([...campos, { pregunta: '', tipo: 'radio', opciones: [''] }])}
          >
            Agregar Pregunta
          </button>

          <button type="submit" className="btn btn-success">
            Crear Formulario
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioCrear;
