import React from 'react';
import './views/adminAbrigo.css';
import logo from './logo.png';

function HomePage5() {
  const goToPage = (page) => {
    window.location.href = page;
  };

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
        <button className="menu-button" onClick={() => goToPage('estoque.html')}>Cadastrar Centros de Distribuição</button>
        <button className="menu-button" onClick={generateReport}>Acessar Funções do Voluntário</button>
      </div>
      <div className="row">
        <button className="menu-button" onClick={() => goToPage('consultar_pedidos.html')}>Acessar Funções do Admin CD</button>
        <button className="menu-button" onClick={() => goToPage('editar_voluntarios.html')}>Acessar Funções do Admin do Abrigo</button>
      </div>
      <div className="row">
        <button className="menu-button" onClick={() => goToPage('editar_voluntarios.html')}>Tutorial do Sistema</button>
      </div>
    </div>
    </div>
  );
}

export default HomePage5;
