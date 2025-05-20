import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'; 
import FormularioList from './components/FormularioList';
import FormularioCrear from './components/FormularioCrear';
import FormularioResponder from './components/FormularioResponder';
import axios from 'axios';

function App() {
  const [formularios, setFormularios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/formularios')
      .then(res => setFormularios(res.data));
  }, []);

  return (
    <Router>
      <div className="container mt-4">
        <h1 className="text-center mb-4">Gestor de Formularios</h1>
        
        <nav className="mb-4">
          <ul className="nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link to="/crear" className="nav-link">Crear Formulario</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<FormularioList formularios={formularios} />} />
          <Route path="/crear" element={<FormularioCrear />} />
          <Route path="/formulario/:id" element={<FormularioResponderWrapper formularios={formularios} />} />
        </Routes>
      </div>
    </Router>
  );
}

// Este wrapper busca el formulario por ID y lo pasa a FormularioResponder
const FormularioResponderWrapper = ({ formularios }) => {
  const { id } = useParams(); // Usar useParams directamente
  const formulario = formularios.find(f => f.id.toString() === id);

  if (!formulario) return <p className="text-center">Formulario no encontrado o aún cargando...</p>;

  return (
    <FormularioResponder
      formularioId={formulario.id}
      campos={formulario.campos}
    />
  );
};

export default App;
