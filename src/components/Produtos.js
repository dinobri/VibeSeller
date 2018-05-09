import React, { Component } from "react";
import Card from "./Card";

import "../styles/produtos.css";
import imgAdd from "../img/icon-add-picture.png";

const categorias = [
    'Acessórios', 'Bolsas e mochilas', 'Vestuários', 'Jóias e bijouteria',
    'Arte e colecionáveis', 'Beleza', 'Decoração', 'Calçados'
];

const formasPagamento = [
    { id: 0, logoUrl: require('../img/pagamento/Visa_Inc._logo.svg.png'), nome: 'Visa', campo: 'pgmt_visa' },
    { id: 1, logoUrl: require('../img/pagamento/Mastercard-01.png'), nome: 'Master', campo: 'pgmt_master' },
    { id: 2, logoUrl: require('../img/pagamento/credit-card.png'), nome: 'Cartão de crédito', campo: 'pgmt_cartao' },
    { id: 3, logoUrl: require('../img/pagamento/bars-code.png'), nome: 'Boleto', campo: 'pgmt_boleto' },
    { id: 4, logoUrl: require('../img/pagamento/Bitcoin_Logo Copy.png'), nome: 'Bitcon (MBTC $0,4)', campo: 'pgmt_bitcoin' },
    { id: 5, logoUrl: require('../img/pagamento/notes.png'), nome: 'Dinheiro', campo: 'pgmt_dinheiro' }
];

export default class Produtos extends Component {

    constructor() {
        super();
        this.state = {
            produto: {
                nome: '',
                descricao: '',
                categoria: '',
                listaImagens: [],
                listaMedidas: [],
                preco: 0.0,
                aceitaPontos: true,
                cuponsValidos: '',
                listaPagamentos: [],
            }
        };

        this.atualizaProduto = this.atualizaProduto.bind(this);
        this.atualizaProdutoCampo = this.atualizaProdutoCampo.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputPagamento = this.handleInputPagamento.bind(this);
        this.handleFileInputChange = this.handleFileInputChange.bind(this);
        this.handleTabelaMedidas = this.handleTabelaMedidas.bind(this);
        this.adicionarCor = this.adicionarCor.bind(this);
        this.salvarProduto = this.salvarProduto.bind(this);
    }

    atualizaProduto(novo) {
        this.setState({ produto: novo });
    }

    atualizaProdutoCampo(campo, valor) {
        let produto = this.state.produto;
        produto[campo] = valor;

        this.atualizaProduto(produto);
    }

    handleInputChange(event) {
        const target = event.target;
        const valor = target.type === 'checkbox' ? target.checked : target.value;
        const campo = target.name;
        this.atualizaProdutoCampo(campo, valor);
    }

    handleFileInputChange(event) {
        const arquivo = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(arquivo);

        reader.onloadend = () => {
            let novaListaImagens = [].concat(this.state.produto.listaImagens);
            novaListaImagens.push({ id: this.state.produto.listaImagens.length, url: reader.result });

            this.atualizaProdutoCampo('listaImagens', novaListaImagens);
        }
    }

    handleInputPagamento(event) {
        const campo = event.target.name;

        let novaListaPagamentos = [].concat(this.state.produto.listaPagamentos);
        const index = novaListaPagamentos.indexOf(campo);

        if (index < 0) {
            novaListaPagamentos.push(campo);
        } else {
            novaListaPagamentos.splice(index, 1);
        }

        this.atualizaProdutoCampo('listaPagamentos', novaListaPagamentos);
    }

    adicionarCor(event) {
        event.preventDefault();

        let novaListaMedidas = [].concat(this.state.produto.listaMedidas);

        novaListaMedidas.push({
            id: novaListaMedidas.length,
            cor: '#812388',
            tamanhoPP: 0,
            tamanhoP: 0,
            tamanhoM: 0,
            tamanhoG: 0,
            tamanhoGG: 0
        });

        console.log(novaListaMedidas);

        this.atualizaProdutoCampo('listaMedidas', novaListaMedidas);
    }

    handleTabelaMedidas(linha, campo, valor) {
        console.log(this.state.produto.listaMedidas);
        const novaListaMedidas = this.state.produto.listaMedidas.map((medida, idx) => {
            if(idx == linha){
                return {...medida, [campo]: valor}
            }
            return medida;
        });

        console.log(novaListaMedidas);
        
        this.atualizaProdutoCampo('listaMedidas', novaListaMedidas);
    }

    salvarProduto(event){
        event.preventDefault();
        console.log(this.state.produto);
        alert('Verifique o console.');
    }

    render() {
        return (
            <div className="principal">
                <form className="ui tiny form">
                    <div className="campos">
                        <div className="ui two column grid">
                            <div className="column">
                                <ProdutoInformacoes produto={this.state.produto} onChange={this.handleInputChange} />
                            </div>

                            <div className="column">
                                <ProdutoMedidas produto={this.state.produto} onChange={this.handleTabelaMedidas}
                                    onNovaCor={this.adicionarCor} />
                            </div>

                            <div className="column">
                                <ProdutoFotos produto={this.state.produto}
                                    onChange={this.handleFileInputChange} />
                            </div>

                            <div className="column">
                                <ProdutoAcessos produto={this.state.produto} onChange={this.handleInputChange}
                                    onChangePagamento={this.handleInputPagamento} />
                            </div>
                        </div>
                    </div>

                    <footer>
                        <button className="ui right floated large primary button" onClick={this.salvarProduto} >Salvar e publicar</button>
                    </footer>
                </form>
            </div>
        );
    }
}

class ProdutoInformacoes extends Component {
    render() {
        return (
            <Card index="1" titulo="Informações" className="column">

                {/* NOME */}
                <div className="field">
                    <label htmlFor="nome">Nome</label>
                    <input id="nome" type="text" name="nome"
                        value={this.props.produto.nome} onChange={this.props.onChange} />
                </div>

                {/* DESCRIÇÃO */}
                <div className="field">
                    <label htmlFor="descricao">Descrição</label>
                    <textarea id="descricao" name="descricao" rows="4"
                        value={this.props.produto.descricao} onChange={this.props.onChange} />
                </div>

                {/* CATEGORIA */}
                <div className="grouped fields">
                    <label>Categoria</label>

                    <div style={{ columns: 2 }} >
                        {categorias.map(categoria => {
                            return (
                                <div className="field" key={categoria}>
                                    <div className="ui radio checkbox">
                                        <input id={"radioCat-" + categoria} type="radio" name="categoria" value={categoria}
                                            onChange={this.props.onChange} defaultChecked={this.props.produto.categoria === categoria} />
                                        <label htmlFor={"radioCat-" + categoria} >{categoria}</label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </Card>
        );
    }
}

class ProdutoFotos extends Component {
    render() {
        return (
            <Card index="2" titulo="Fotos" className="column">
                <img src={imgAdd} alt="Adicionar imagem" className="adicionar-foto"
                    onClick={() => document.getElementById('imgUpload').click()} />

                <input type="file" name="imgUpload" id="imgUpload"
                    accept=".png, .jpg, .jpeg"
                    onChange={this.props.onChange} style={{ display: 'none' }} />

                {
                    this.props.produto.listaImagens.length > 0 ?
                        (
                            <div className="ui tiny images" style={{ marginTop: 40 }}>
                                {this.props.produto.listaImagens.map(imagem =>
                                    <img key={imagem.id} src={imagem.url} alt="Foto" />)}
                            </div>
                        ) :
                        (
                            <p><strong>Nenhuma foto.</strong> <br />Clique no botão ao lado para inserir uma imagem.</p>
                        )
                }
            </Card>
        );
    }
}

class ProdutoMedidas extends Component {
    render() {
        return (
            <Card index="3" titulo="Medidas" className="column">
                <table id="tabela-medidas" className="ui very compact celled table">
                    <thead>
                        <tr>
                            <th>Tamanho/Cor</th>
                            <th>PP</th>
                            <th>P</th>
                            <th>M</th>
                            <th>G</th>
                            <th>GG</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.produto.listaMedidas.length > 0 ?
                                
                                this.props.produto.listaMedidas.map(medida => {
                                    return (
                                        <tr key={medida.id}>
                                            <td><input type="color" value={medida.cor}
                                                onChange={(e) => this.props.onChange(medida.id, 'cor', e.target.value)} /></td>
                                            <td className="selectable">
                                                <input type="number" value={medida.tamanhoPP}
                                                    onChange={(e) => this.props.onChange(medida.id, 'tamanhoPP', e.target.value)} /></td>
                                            <td className="selectable">
                                                <input type="number" value={medida.tamanhoP}
                                                    onChange={(e) => this.props.onChange(medida.id, 'tamanhoP', e.target.value)} /></td>
                                            <td className="selectable">
                                                <input type="number" value={medida.tamanhoM}
                                                    onChange={(e) => this.props.onChange(medida.id, 'tamanhoM', e.target.value)} /></td>
                                            <td className="selectable">
                                                <input type="number" value={medida.tamanhoG}
                                                    onChange={(e) => this.props.onChange(medida.id, 'tamanhoG', e.target.value)} /></td>
                                            <td className="selectable">
                                                <input type="number" value={medida.tamanhoGG}
                                                    onChange={(e) => this.props.onChange(medida.id, 'tamanhoGG', e.target.value)} /></td>
                                        </tr>
                                    )
                                }) :
                                <tr>
                                    <td colSpan="6">Nenhuma cor cadastrada.</td>
                                </tr>
                        }
                    </tbody>
                    <tfoot className="full-width">
                        <tr>
                            <th colSpan="6">
                                <button className="ui icon secondary labeled compact button" onClick={this.props.onNovaCor}>
                                    <i className="icon add"></i> Adicionar cor
                                </button>
                            </th>
                        </tr>
                    </tfoot>
                </table>
            </Card>
        );
    }
}

class ProdutoAcessos extends Component {
    render() {
        return (
            <Card index="4" titulo="Acessos" className="column">
                <div className="inline field">
                    <label htmlFor="preco">Preço</label>
                    <input type="number" name="preco" id="preco" value={this.props.produto.preco}
                        onChange={this.props.onChange} />
                </div>

                <div className="field">
                    <div className="ui checkbox">
                        <input type="checkbox" name="aceitaPontos" id="aceitaPontos"
                            value={this.props.produto.aceitaPontos} defaultChecked={this.props.produto.aceitaPontos} />
                        <label htmlFor="aceitaPontos">Aceita sistema de pontos</label>
                    </div>
                </div>

                <div className="field">
                    <label htmlFor="cupons">Cupons válidos</label>
                    <textarea id="cupons" name="cupons" rows="3"
                        value={this.props.produto.cuponsValidos} onChange={this.props.onChange} />
                </div>

                <div className="grouped fields">
                    <label>Pagamentos aceitos</label>
                    <table className="tabela-pagamentos">
                        <tbody>
                            {
                                formasPagamento.map(pgmt => {
                                    return (
                                        <tr key={pgmt.id}>
                                            <td><img src={pgmt.logoUrl} alt="" /></td>
                                            <td>{pgmt.nome}</td>
                                            <td>
                                                <div className="field">
                                                    <div className="ui checkbox">
                                                        <input type="checkbox" name={pgmt.campo}
                                                            onChange={this.props.onChangePagamento}
                                                            defaultChecked={this.props.produto.listaPagamentos.indexOf(pgmt.campo) > -1} />
                                                        <label htmlFor={pgmt.campo}></label>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </Card>
        );
    }
}