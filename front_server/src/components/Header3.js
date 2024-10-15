import React from 'react';
import logo from './logo.png';

function Header() {
    return (
        <div className="header-div">
            <header>
            <nav class="nav-menu">
            <ul>
                <li><a href="#">Criar Pedidos</a></li>
                <li><a href="#">Confirmar Recebimento</a></li>
                <li><a href="#">Consultar Pedidos</a></li>
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
