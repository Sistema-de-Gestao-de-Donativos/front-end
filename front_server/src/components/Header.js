import React from 'react';
import './views/header.css'
import { Link } from 'react-router-dom';
import logo from './logo.png'

function Header() {
    return (
        <div className="header-div">
            <header>
            <nav class="nav-menu">
            <ul>
                <li><Link to='/pesqcd'><a href="#">Consulta CD</a></Link></li>
                <li><Link to='/cadastracd'><a href="#">Cadastro CD</a></Link></li>
                <li><a href="#">Gerar Relatório</a></li>
                <li><a href="#">Consultar Pedidos</a></li>
                <li><a href="#">Editar Voluntários</a></li>
                <li><a href="#">Cadastrar Admin Abrigo</a></li>
                <li><a href="#">Tutorial do Sistema</a></li>
            </ul>
        </nav>
            </header>
            <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
        </div>
        </div>
    );
}

export default Header;