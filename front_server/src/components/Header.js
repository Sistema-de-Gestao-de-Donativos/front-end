import React from 'react';

function Header() {
    return (
        <div className="header-div">
            <header>
                <div>
                    <a href="" target="blank">
                        <img id="pucrs-logo" className="pucrs-logo" src="/pucrs.png" alt="PUCRS logo"/>
                    </a>
                    <nav>
                        <ul>
                            <li><a href="/">HOME</a></li>
                            <li><a href="/pesqcd">Pesquisar CD</a></li>
                            <li><a href="/cadastracd">Cadastrar CD</a></li>
                        </ul>
                    </nav>
                </div>
                <h1 className="page-title">Sistema de Gestão de Donativos</h1>
            </header>
        </div>
    );
}

export default Header;