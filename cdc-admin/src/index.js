import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AutorBox from './componentes/Autor/Autor';
import LivroBox from './componentes/Livro/Livro';
import Home from './componentes/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <App>
            <Switch>
                <Route exact path="/" component={ Home } />
                <Route path="/autor" component={ AutorBox } />
                <Route path="/livro" component={ LivroBox } />
            </Switch>
        </App>
    </Router>,
    document.getElementById('root')
);
serviceWorker.unregister();
