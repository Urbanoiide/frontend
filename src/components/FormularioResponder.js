import React, { useState } from 'react';
import axios from 'axios';

const FormularioResponder = ({ formularioId, campos }) => {
  const [respuestas, setRespuestas] = useState({});
  const [datosPersona, setDatosPersona] = useState({
    nombres: '',
    apellido_p: '',
    apellido_m: '',
    matricula: ''
  });

  const handleChange = (index, value, multiple) => {
    if (multiple) {
      const prev = respuestas[index] || [];
      setRespuestas({
        ...respuestas,
        [index]: prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      });
    } else {
      setRespuestas({ ...respuestas, [index]: value });
    }
  };

  const handleDatosChange = (e) => {
    const { name, value } = e.target;
    setDatosPersona({ ...datosPersona, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const finalRespuestas = {};

    // Incluye los datos personales al inicio
    finalRespuestas.nombres = datosPersona.nombres;
    finalRespuestas.apellido_p = datosPersona.apellido_p;
    finalRespuestas.apellido_m = datosPersona.apellido_m;
    finalRespuestas.matricula = datosPersona.matricula;

    // Las demás respuestas siguen después
    Object.keys(respuestas).forEach((key, i) => {
      const index = parseInt(key);
      finalRespuestas[`campo_${index}`] = Array.isArray(respuestas[key])
        ? respuestas[key].join(', ')
        : respuestas[key];
    });

    axios.post(`http://localhost:5000/api/respuesta/${formularioId}`, finalRespuestas)
      .then(() => alert('Respuesta enviada'))
      .catch((error) => alert('Error al enviar la respuesta: ' + error.message));
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <h3 className="mb-3">Datos del participante</h3>
      
      <div className="mb-3">
        <input 
          name="nombres" 
          placeholder="Nombres" 
          value={datosPersona.nombres} 
          onChange={handleDatosChange} 
          required 
          className="form-control" 
        />
      </div>
      
      <div className="mb-3">
        <input 
          name="apellido_p" 
          placeholder="Apellido Paterno" 
          value={datosPersona.apellido_p} 
          onChange={handleDatosChange} 
          required 
          className="form-control" 
        />
      </div>
      
      <div className="mb-3">
        <input 
          name="apellido_m" 
          placeholder="Apellido Materno" 
          value={datosPersona.apellido_m} 
          onChange={handleDatosChange} 
          required 
          className="form-control" 
        />
      </div>
      
      <div className="mb-3">
        <input 
          name="matricula" 
          placeholder="Matrícula" 
          value={datosPersona.matricula} 
          onChange={handleDatosChange} 
          required 
          className="form-control" 
        />
      </div>

      <h3 className="mb-3">Preguntas</h3>
      {campos.map((campo, i) => (
        <div key={i} className="mb-3">
          <p><strong>{campo.pregunta}</strong></p>
          {campo.opciones.map((op, j) => (
            <div key={j} className="form-check">
              <input
                type={campo.tipo}
                className="form-check-input"
                name={`campo_${i}`}
                value={op}
                checked={campo.tipo === 'checkbox' ? (respuestas[i] || []).includes(op) : respuestas[i] === op}
                onChange={e => handleChange(i, op, campo.tipo === 'checkbox')}
              />
              <label className="form-check-label">{op}</label>
            </div>
          ))}
        </div>
      ))}

      <button type="submit" className="btn btn-primary mt-3">Enviar</button>
    </form>
  );
};

export default FormularioResponder;
