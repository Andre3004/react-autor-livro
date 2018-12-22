import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from '../InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from '../errors/TratadorErros';
import Grid from '@material-ui/core/Grid';

export default class LivroForm extends Component {

    constructor() {
        super();
        this.state = { titulo: '', preco: '', autorId: '' };
        this.enviaForm = this.enviaForm.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        
    }

    enviaForm(evento) {
        evento.preventDefault();
        $.ajax({
            url: 'http://localhost:8080/api/livros',
            contentType: 'application/json',
            dataType: 'json',
            type: 'post',
            data: JSON.stringify({
                titulo: this.state.titulo,
                preco: this.state.preco,
                autorId: this.state.autorId
            }),
            success: function (novaListagem) {
                PubSub.publish('atualiza-lista-livros', novaListagem);
                this.setState({ titulo: '', preco: '', autorId: '' });
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
                    <InputCustomizado size={ 500 } id="titulo" type="text" nome="titulo" value={ this.state.titulo } onChange={ this.handleInputChange } label="Título" />
                    <InputCustomizado size={ 600 } id="preco" type="number" nome="preco" value={ this.state.preco } onChange={ this.handleInputChange } label="Preço" />
                    <select value={ this.state.autorId } name="autorId" onChange={ this.handleInputChange }>
                        <option value="">Selecione</option>
                        {
                            this.props.autores.map(function (autor) {
                                return <option key={ autor.id } value={ autor.id }>
                                    { autor.nome }
                                </option>;
                            })
                        }
                    </select>
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                </form>

            </Grid>
        );
    }
}