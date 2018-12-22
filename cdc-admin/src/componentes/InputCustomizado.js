import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import PubSub from 'pubsub-js';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    }
});

class InputCustomizado extends Component {


    constructor() {
        super();
        this.state = { msgErro: '' };
    }


    render() {

        const { classes } = this.props;

        return (

            <Grid container
                direction="row"
                justify="flex-start"
                alignItems="center">
                <TextField
                    htmlFor={ this.props.id }
                    id={ this.props.id }
                    type={ this.props.type }
                    label={ this.props.label }
                    name={ this.props.nome }
                    value={ this.props.value }
                    onChange={ this.props.onChange }
                    className={ classes.textField }
                    margin="normal"
                    variant="outlined"
                    style={ { width: this.props.size } }
                />
                <span className="error">{ this.state.msgErro }</span>
            </Grid>
        );
    }

    componentDidMount() {
        PubSub.subscribe("erro-validacao", function (topico, erro) {
            if (erro.field === this.props.name)
            {
                this.setState({ msgErro: erro.defaultMessage });
            }
        }.bind(this));

        PubSub.subscribe("limpa-erros", function (topico) {
            this.setState({ msgErro: '' });
        }.bind(this));
    }
}

InputCustomizado.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputCustomizado);

