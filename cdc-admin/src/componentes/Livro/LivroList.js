import React, { Component } from 'react';

export default class LivroList extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (livro) {
                                return (
                                    <tr key={ livro.id }>
                                        <td>{ livro.titulo }</td>
                                        <td>{ livro.preco }</td>
                                        <td>{ livro.autor.nome }</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
