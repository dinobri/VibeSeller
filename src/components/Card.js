import React, { Component } from "react";

export default class Card extends Component{
    render(){
        return(
            <div className="card sombreado">
                <header>
                    <span className="index">{this.props.index}</span>
                    <span className="titulo">{this.props.titulo}</span>
                </header>
                <div className="conteudo">
                    {this.props.children}
                </div>
            </div>
        );
    }
}