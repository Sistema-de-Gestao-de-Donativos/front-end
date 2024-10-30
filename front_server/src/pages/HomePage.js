import React from 'react';
import { Link } from 'react-router-dom';
import './views/adminCd.css';
import logo from '../components/logo.png'

function HomePage() {
    return (
        <main>
            <div>

                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <div className="menu-container">
                    <div className="row">
                        <div class="container">
                            <Link to='/cadastracd'><button className="menu-button">Cadastrar CD</button></Link>
                            <Link to='/pesqcd'><button className="menu-button">Pesquisar CD</button></Link>
                        </div>
                    </div>
                </div>

            </div>

        </main>
    );
}

export default HomePage;
