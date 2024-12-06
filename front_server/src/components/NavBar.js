import React from 'react';
import { Link } from 'react-router-dom';
import './views/NavBar.css'; 

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="nav-links">
                <Link to="/menucadcd">MenuCD</Link>
                <Link to="/home2">ConsultarPedidos</Link>
                <Link to="/home3">MenuVol</Link>
                <Link to="/home4">MenuAdminCD</Link>
                <Link to="/home5">MenuAdmAbr</Link>
                <Link to="/home6">MenuSuperAdmin</Link>
                <Link to="/home7">CadUser</Link>
                <Link to="/home8">CadAdmin</Link>
                <Link to="/home9">ConsultaUsersCD/Abrigo</Link>
                <Link to="/home10">ConsultaUsers</Link>
                <Link to="/pesqcd">PesqCD</Link>
                <Link to="/cadastracd">CadastraCD</Link>
                <Link to="/pesquisaAbrigo">Pesquisa Abrigo</Link>
                <Link to="/cadastraAbrigo">Cadastra Abrigo</Link>
                <Link to="/meuspedidos">Meus Pedidos</Link>
                <Link to="/novopedido">Novo Pedido</Link>
                <Link to="/doacoes">Doações</Link>
                <Link to="/pesqdoacao">PesqDoações</Link>
                <Link to="/doador">Doador</Link>
            </div>
        </nav>
    );
};

export default NavBar;
