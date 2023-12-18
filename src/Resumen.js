import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import './App.css';


const mostrarAlerta = () => {
  swal({
    title: "¡Gracias por tu respuesta!",
    text: "Tu respuesta ha sido registrada",
    icon: "success",
    button: "Aceptar",
  });  
};

const containerStyle = {
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  width: '100%',

};

const contentStyle = {
  width:'80%',
  margin: '100px',
  textAlign: 'center',

  border: '10px solid #000000',
  borderRadius: '8px',
  boxShadow: '15px 15px 15px rgba(1, 1, 1, 1)',
  backgroundColor: '#f9f9f9',
  
};

const buttonStyle = {
  fontSize: '18px',
  padding: '10px 20px',
  margin: '10px',
  background: 'rgba(75, 192, 192, 0.6)',
  color: '#000',
  border: '5px solid rgba(75, 192, 192, 0.9)'  ,
  borderRadius: '5px',
  cursor: 'pointer',
};

const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const selectStyle = {
  fontSize: '15px',
  margin: '10px 15px',
  
};

const chartContainerStyle = {
  width: '50%',
  margin: '0 auto',
  
};

const HappinessSurvey = () => {

  const initialSurveyData = {
    gestion: 1,
    software: 1,
    cultura: 1,
    valor: 1,
    entregas: 1,
    autodeterminacion: 1,
  };

  const [surveyData, setSurveyData] = useState(initialSurveyData);
  const [showChart, setShowChart] = useState(false);
  const [showPointsChart, setShowPointsChart] = useState(false);
  const [savedResponses, setSavedResponses] = useState([]);
  const [savedAverage, setSavedAverage] = useState(null);

  const handleChange = (e, category) => {
    const value = parseInt(e.target.value);
    setSurveyData({
      ...surveyData,
      [category]: value,
    });
  };

  const calculateAverage = (data) => {
    const values = Object.values(data);
    const sum = values.reduce((acc, value) => acc + value, 0);
    return (sum / values.length).toFixed(2);
  };


  const saveResponses = () => {
    const responses = { ...surveyData };
    setSavedResponses([...savedResponses, responses]);
    setSurveyData(initialSurveyData);
  };

  const handleButtonClick = () => {
    saveResponses();
    mostrarAlerta();
  };

  const generateChart = () => {
    setShowChart(true);
    const average = calculateAverage(surveyData);
    setSavedAverage(average);

    // Actualiza el estado global con el promedio de todas las respuestas
  };

  const generatePointsChart = () => {
    setShowPointsChart(true);
    const categoryAverages = calculateCategoryAverages();
  };

  const calculateTotalAverage = () => {
    const totalResponses = savedResponses.length;
    const totalSum = savedResponses.reduce((acc, response) => {
      const values = Object.values(response);
      return acc + values.reduce((valAcc, value) => valAcc + value, 0);
    }, 0);
    return (totalSum / (totalResponses * 6)).toFixed(2);
  };

  const totalAverageData = [
    {
      name: 'Promedio Total de Puntos',
      promedio: parseFloat(calculateTotalAverage()),
    },
  ];

  const calculateCategoryAverages = () => {
    const categoryAverages = {};

    // Calcular promedio para cada categoría
    for (const key in initialSurveyData) {
      if (initialSurveyData.hasOwnProperty(key)) {
        const totalSum = savedResponses.reduce((acc, response) => {
          return acc + response[key];
        }, 0);
        const average = (totalSum / savedResponses.length).toFixed(2);
        categoryAverages[key] = average;
      }
    }

    return categoryAverages;
  };

  const categoryAverages = calculateCategoryAverages();

  return (
  
    <div className="container1">
      <header className="navbar">
        <a className="navbar-brand"href='/'>Chocobito</a>
        <label htmlFor="menu-toggle" className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
        </label>
        <nav className="navbar-collapse">
          <ul className="navbar-nav">
              <a href='/Satisfaccion'>
              <b><label htmlFor="evaluacionDropdown" className="nav-link dropdown-label">SPRINT
              </label></b>
              </a>
              <a href='/Resumen'>
              <b><label htmlFor="evaluacionDropdown" className="nav-link dropdown-label">SALUD
              </label></b>
              </a>

          </ul>
        </nav>
      </header>
      
      
      <div style={containerStyle}>
        <div style={contentStyle}>
          <h1>Índice de Salud del Equipo Ágil</h1>
          <form style={formContainerStyle}>
            <div>
              <label className='font'>
              <b>Gestion:</b> Entendemos nuestra estrategia y responsabilidades.
                <select
                  onChange={(e) => handleChange(e, 'gestion')}
                  value={surveyData.gestion}
                  style={selectStyle}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className='font'>
              <b>Software:</b> Nuestro software es mantenible, seguro y confiable.
                <select
                  onChange={(e) => handleChange(e, 'software')}
                  value={surveyData.software}
                  style={selectStyle}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className='font'>
              <b>Cultura:</b> Trabajamos eficazmente entre nosotros.
                <select
                  onChange={(e) => handleChange(e, 'cultura')}
                  value={surveyData.cultura}
                  style={selectStyle}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className='font'>
              <b>Valor:</b> Usamos comentarios para mejorar.
                <select
                  onChange={(e) => handleChange(e, 'valor')}
                  value={surveyData.valor}
                  style={selectStyle}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className='font'>
              <b>
                Entregas:</b> Entregamos a tiempo, damos mantención y soporte.
                <select
                  onChange={(e) => handleChange(e, 'entregas')}
                  value={surveyData.entregas}
                  style={selectStyle}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
                </label>
            </div>
            <div>
              <label className='font'>
              <b>Autodeterminación:</b> Solucionamos los problemas propios y de los clientes.
                <select
                  onChange={(e) => handleChange(e, 'autodeterminacion')}
                  value={surveyData.autodeterminacion}
                  style={selectStyle}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </form>
        
          <div>
            <button style={buttonStyle} onClick={handleButtonClick}>
              Guardar Respuestas
            </button>
            <button style={buttonStyle} onClick={generateChart}>
              Generar Gráfico de Promedio
            </button>
            <button style={buttonStyle} onClick={generatePointsChart}>
              Generar Gráfico de Puntos
            </button>
            <Link to="/">
              <button style={buttonStyle}>Ir a la página de inicio</button>
            </Link>
          </div>
          {savedResponses.length > 0 && (
            <div>
              {/* { <><h3>Respuestas guardadas:</h3><ul>
                  {savedResponses.map((response, index) => (
                    <div key={index}>Respuesta {index + 1}: guardada</div>
                  ))}
                </ul></> } */}
            </div>
          )}
        {showChart && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={chartContainerStyle}>
              <BarChart width={600} height={400} data={Object.entries(categoryAverages).map(([name, promedio]) => ({
                name,
                promedio: parseFloat(promedio),
              }))}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 5]} />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="promedio" fill="rgb(255, 81, 0, 0.6)" />
              </BarChart>
            </div>
            {showPointsChart && (
              <div style={chartContainerStyle}>
                <BarChart width={600} height={400} data={totalAverageData}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="promedio" fill="rgb(255, 81, 0, 0.6)" />
                </BarChart>
              </div>
            )}
          </div>
        )}
        </div>
      </div> 
    </div>

  );
};

export default HappinessSurvey;