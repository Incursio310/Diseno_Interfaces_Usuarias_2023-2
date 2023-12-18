import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import './App.css';
import swal from 'sweetalert';
import './SprintSurvey.css';

/* const mostrarAlerta = () => {
  swal({
    title: "¡Gracias por tu respuesta!",
    text: "Tu respuesta ha sido registrada",
    icon: "success",
    button: "Aceptar",
  });  
}; */

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',

};

const contentStyle = {
  textAlign: 'center',
  padding: '20px',
  border: '10px solid #000000',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  opacity: '0.9',
  borderRadius: '0.9rem',
  boxShadow: '15px 15px 15px rgba(1, 1, 1, 1)'
};

const buttonStyle = {
  padding: '10px 20px',
  margin: '10px',
  backgroundColor: 'rgba(75, 192, 192, 0.6)',
  color: '#000',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  border: '5px solid rgba(75, 192, 192, 0.9)',
  fontSize: '18px',



};

const questionStyle = {
  marginBottom: '10px',
  fontSize: '22px',
};

const selectStyle = {
  margin: '10px 50px',
  fontSize: '20px',
};

const dateSelectorStyle = {
  fontSize: '20px',
  width: '20%',
  marginBottom: '5px',
  textAlign: 'center',
};

const sub_title = {
  fontSize: '28px',
  textAlign: 'center',
  marginBottom: '20px',
};

const list_container_ul = {
  listStyleType: 'none',
  fontSize: '20px',
};

const calculateAverage = (responses) => {
  if (responses.length === 0) return 0;
  const sum = responses.reduce((acc, response) => acc + response, 0);
  return sum / responses.length;
};

const SprintSurvey = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [currentResponse, setCurrentResponse] = useState([1, 1, 1, 1, 1]);
  const [surveyData, setSurveyData] = useState([]);

  const questions = [
    '¿Cómo calificarías la comunicación y la colaboración en el equipo durante este sprint?',
    '¿Qué tan efectivas fueron las reuniones diarias de seguimiento del sprint para ti?',
    '¿Cómo evaluarías la calidad del trabajo entregado durante este sprint?',
    '¿Qué tan satisfecho estás con la gestión de las tareas y la asignación de trabajo en este sprint?',
    '¿Qué tan satisfecho estás con la capacidad del equipo para superar obstáculos y cumplir el tiempo del sprint?',
  ];

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  const handleResponseChange = (index, value) => {
    const updatedResponses = [...currentResponse];
    updatedResponses[index] = value;
    setCurrentResponse(updatedResponses);
  };

  const saveResponses = () => {
    if (!currentDate) {
      alert('Por favor, ingresa la fecha antes de guardar las respuestas.');
      return;
    }
    else{
      swal({
        title: "¡Gracias por tu respuesta!",
        text: "Tu respuesta ha sido registrada",
        icon: "success",
        button: "Aceptar",
      });  
    }

    // Busca si ya existe una entrada para la fecha actual
    const existingEntry = surveyData.find((entry) => entry.date === currentDate);

    if (existingEntry) {
      // Si ya existe, actualiza los valores existentes en lugar de agregar uno nuevo
      existingEntry.values = [...currentResponse];
    } else {
      // Si no existe, agrega una nueva entrada
      const newResponse = {
        date: currentDate,
        values: [...currentResponse],
      };
      surveyData.push(newResponse);
    }

    setSurveyData([...surveyData]);
    setCurrentResponse([1, 1, 1, 1, 1]);
  };

  const handleButtonClick = () => {
    saveResponses();
   /*  mostrarAlerta(); */
  };

  const chartDataSprintSurvey = surveyData.map((response) => {
    const averageValue = calculateAverage(response.values);
    return {
      date: response.date,
      value: averageValue.toFixed(2),
    };
  });

  const getSprintRatingMessage = (value) => {
    if (value >= 4) {
      return 'Fue un Sprint Eficiente';
    } else if (value >= 3) {
      return 'Fue un Sprint Decente';
    } else {
      return 'Fue un Sprint Deficiente';
    }
  };

  return (
    <div className="container">
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
        <h1>Encuesta de Satisfacción del Sprint</h1>
        <div>
          <input
            type="date"
            style={dateSelectorStyle}
            value={currentDate}
            onChange={handleDateChange}
          />
        </div>
        <ol>
          {questions.map((question, index) => (
            <div key={index} style={questionStyle}>
              <span>{question}</span>
              <br />
              <select
                style={selectStyle}
                value={currentResponse[index]}
                onChange={(e) => handleResponseChange(index, parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </ol>
        <button style={buttonStyle} onClick={handleButtonClick}>
          Guardar Respuestas
        </button>
        <Link to="/">
          <button style={buttonStyle}>Ir a la página de inicio</button>
        </Link>
      </div>
      <div className="chart-container">
      <div className="centered-container">
        {chartDataSprintSurvey.length > 0 ? (
          <BarChart width={600} height={400} data={chartDataSprintSurvey}>
            <XAxis fontSize={23} dataKey="date" type="category" angle={0} textAnchor="middle" />
            <YAxis fontSize={23} domain={[0, 5]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="rgb(255, 81, 0, 0.6)" />
          </BarChart>
        ) : (
          <div className="centered-container"></div>
        )}
      </div>
      {chartDataSprintSurvey.length > 0 && (
        <div>
          <p style={sub_title}>Calificacion del Sprint:</p>
          <ul style={list_container_ul}>
            {chartDataSprintSurvey.map((data) => (
              <li key={data.date}>
                {data.date}: {getSprintRatingMessage(parseFloat(data.value))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </div>
    </div>
  );
};

export default SprintSurvey;
