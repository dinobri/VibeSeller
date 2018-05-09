import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/menu.css";
import logo from '../img/nyancat.png';
import iconDashboard from '../img/dashboard.png';
import iconPerfil from '../img/profile.png';
import iconProdutos from '../img/shop.png';

export default class Menu extends Component{
    render(){
        return (
            <nav className="sombreado">
                <header>
                    <img className="logo-loja" src={logo} alt="Logo da loja"/>
                    <h3 className="nome-loja">Nyan Cat</h3>
                    <span className="descricao-loja">Meme Shirts</span>
                </header>

                <ul>
                    <MenuItem path="/dash" img={iconDashboard} label="Dashboard" />
                    <MenuItem path="/perfil" img={iconPerfil} label="Perfil" />
                    <MenuItem path="/produtos" img={iconProdutos} label="Produtos" />
                </ul>
            </nav>
        );
    }
}

class MenuItem extends Component{
    render(){
        return (
            <li>
                <Link to={this.props.path} >
                    <img src={this.props.img} alt="Icone menu"/>
                    <span>{this.props.label}</span>
                </Link>
            </li>
        );
    }
}