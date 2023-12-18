import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css';
import './HomePage.css';

const HomePage = () => {

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
      <div className='home-container'>
      <h1 className='evalua'>Evalúa</h1>
      <div className='button-container'>
        <Link to="/Satisfaccion">
          <button className='fondo btn btn-formulario btn-2' >Formulario de Sprint</button>
        </Link>
        </div>
      <div className='button-container'>
        <Link to="/Resumen">
          <button className='fondo btn btn-2'>Formulario de Salud</button>
        </Link>
      </div>
    </div>
      </div>
  );
};

export default HomePage;