import React, { Component } from 'react';
import { Route } from "react-router-dom";

import Menu from './components/Menu'
import Dashboard from './components/Dashboard'
import Perfil from './components/Perfil'
import Produtos from './components/Produtos'


class App extends Component {
	constructor(){
		super();
		this.state = {
			menuAtivo: true
		};
	}

	componentDidMount(){
		const botaoMenu = document.querySelector('#botao-menu');
		botaoMenu.addEventListener('click', () => {
			const appDiv = document.querySelector('#app');
			appDiv.classList.toggle('menu-ativo');
		});
	}

	render() {
		return (
			<div id="app" className={this.state.menuAtivo ? " menu-ativo" : ""}>
				<header id="cabecalho" className="sombreado">
					<i id="botao-menu" className="icon bars big" />
					<h1 className="titulo">VibeSeller</h1>
				</header>

				<Menu />

				<main>
					<Route path='/dash' component={Dashboard} />
					<Route path='/perfil' component={Perfil} />
					<Route path='/produtos' component={Produtos} />
				</main>
			</div>
		);
	}
}

export default App;
