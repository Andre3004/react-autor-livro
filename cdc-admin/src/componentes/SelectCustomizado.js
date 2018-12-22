import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class SelectCustomizado extends React.Component {
  state = {
    age: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { classes } = this.props;

    return (
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Age</InputLabel>
          <Select
            value={ this.state.autorId }
            onChange={ this.props.onChange }
            inputProps={{
              name: { this.state.titulo },
              id: { this.state.autorId },
            }}
          >
            <MenuItem value="">
              <em>Nenhum</em>
            </MenuItem>
            { 
                this.props.autores.map(function(autor) {
                return <MenuItem key={ autor.id } value={ autor.id }>
                            { autor.nome }
                        </MenuItem>;
                })
            }
          </Select>
        </FormControl>
    );
  }
}

SelectCustomizado.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectCustomizado);