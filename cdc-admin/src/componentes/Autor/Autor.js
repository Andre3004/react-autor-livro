import React, { Component } from 'react';
import $ from 'jquery';
import PubSub from 'pubsub-js';
import AutorForm from './AutorForm'
import AutorList from './AutorList'

export default class AutorBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/api/autores",
            dataType: 'json',
            success: function (resposta) {
                this.setState({ lista: resposta });
            }.bind(this)
        }
        );

        PubSub.subscribe('atualiza-lista-autores', function (topico, novaLista) {
            this.setState({ lista: novaLista });
        }.bind(this));
    }


    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de autores</h1>
                </div>
                <div className="content" id="content">
                    <AutorForm />
                    <AutorList lista={ this.state.lista } />
                </div>
            </div>
        );
    }
}