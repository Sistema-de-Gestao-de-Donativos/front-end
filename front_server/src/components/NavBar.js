import React from 'react';
import { Link } from 'react-router-dom';
import './views/NavBar.css'; // Use this CSS for styling

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/home2">HomePage2</Link>
                <Link to="/home3">HomePage3</Link>
                <Link to="/home4">HomePage4</Link>
                <Link to="/home5">HomePage5</Link>
                <Link to="/home6">HomePage6</Link>
                <Link to="/home7">HomePage7</Link>
                <Link to="/home8">HomePage8</Link>
                <Link to="/home9">HomePage9</Link>
                <Link to="/home10">HomePage10</Link>
                <Link to="/pesqcd">PesqCD</Link>
                <Link to="/cadastracd">CadastraCD</Link>
                <Link to="/pesquisaAbrigo">Pesquisa Abrigo</Link>
                <Link to="/cadastraAbrigo">Cadastra Abrigo</Link>
            </div>
        </nav>
    );
};

export default NavBar;
