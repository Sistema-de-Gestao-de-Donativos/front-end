import React from 'react';

function Header() {
    return (
        <div className="header-div">
            <header>
                <div>
                    <a href="https://www.hp.com/us-en/home.html" target="blank">
                        <img id="hp-logo" className="hp-logo" src="/hp_logo.png" alt="HP logo"/>
                    </a>
                    <nav>
                        <ul>
                            <li><a href="/">HOME</a></li>
                        </ul>
                    </nav>
                </div>
                <h1 className="page-title">Sistema de Gestão de Donativos (SGD)</h1>
            </header>
        </div>
    );
}

export default Header;