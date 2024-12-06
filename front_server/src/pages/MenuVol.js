import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './views/menu.css';
import logo from './logo.png';

function HomePage3() {
  const generateReport = () => {
    alert("Relatório gerado!");
  };

  return (
    <div>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="menu-container">
        <div className="row">
          {/* Placeholder for "Entrada de Produto" button */}
          <Link to="#" className="menu-button">
            Entrada de Produto
          </Link>
          <button className="menu-button" onClick={generateReport}>Tutorial do Sistema</button>
        </div>
        <div className="row">
          <Link to="/pesqprod" className="menu-button">
            Status do Pedido
          </Link>
          {/* Placeholder for "Saída de Produto" button */}
          <Link to="#" className="menu-button">
            Saída de Produto
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage3;
