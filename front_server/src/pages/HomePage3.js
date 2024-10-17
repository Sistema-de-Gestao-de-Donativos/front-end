import React from 'react';
import './views/adminCd.css';
import logo from './logo.png';

function HomePage3() {
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
        <button className="menu-button" onClick={() => goToPage('estoque.html')}>Consulta de Estoque</button>
        <button className="menu-button" onClick={generateReport}>Gerar Relatório</button>
      </div>
      <div className="row">
        <button className="menu-button" onClick={() => goToPage('consultar_pedidos.html')}>Consultar Pedidos</button>
        <button className="menu-button" onClick={() => goToPage('editar_voluntarios.html')}>Editar Voluntários</button>
      </div>
      <div className="row">
        <button className="menu-button" onClick={() => goToPage('cadastrar_admin.html')}>Cadastrar Admin Abrigo</button>
        <button className="menu-button" onClick={() => goToPage('tutorial_sistema.html')}>Tutorial do Sistema</button>
      </div>
    </div>
    </div>
  );
}

export default HomePage3;
