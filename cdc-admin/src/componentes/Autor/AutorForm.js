import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from '../InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from '../errors/TratadorErros';
import Grid from '@material-ui/core/Grid';

export default class AutorForm extends Component {

    constructor() {
        super();
        this.state = { nome: '', email: '', senha: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/api/autores',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({ nome: this.state.nome, email: this.state.email, senha: this.state.senha }),
            success: function (novaListagem) {
                PubSub.publish('atualiza-lista-autores', novaListagem);
                this.setState({ nome: '', email: '', senha: '' });
            }.bind(this),
            error: function (resposta) {
                if (resposta.status === 400)
                {
                    new TratadorErros().publicaErros(resposta.responseJSON);
                }
            },
            beforeSend: function () {
                PubSub.publish("limpa-erros", {});
            }
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (

            <Grid container direction="column" spacing={ 16 }>
                <form onSubmit={ this.enviaForm } method="post">
                    <InputCustomizado size={ 500 } id="nome" type="text" nome="nome" value={ this.state.nome } onChange={ this.handleInputChange } label="Nome" />
                    <InputCustomizado size={ 600 } id="email" type="email" nome="email" value={ this.state.email } onChange={ this.handleInputChange } label="Email" />
                    <InputCustomizado size={ 500 } id="senha" type="password" nome="senha" value={ this.state.senha } onChange={ this.handleInputChange } label="Senha" />
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </form>

            </Grid>
        );
    }
}