import React from 'react';
import './views/menu.css';
import logo from './logo.png';

function HomePage2() {
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
          <button className="menu-button" onClick={() => goToPage('estoque.html')}>Entrada de Produto</button>
          <button className="menu-button" onClick={generateReport}>Tutorial do Sistema</button>
        </div>
        <div className="row">
          <button className="menu-button" onClick={() => goToPage('consultar_pedidos.html')}>Saída de Produto</button>
          <button className="menu-button" onClick={() => goToPage('consultar_pedidos.html')}>Status do Pedido</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage2;
