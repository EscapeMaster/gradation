import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { counter } from './redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <ul>
                Link
                <Link></Link>
            </ul>
            <App />
        </BrowserRouter>
    </Provider>), document.getElementById('root')
);
