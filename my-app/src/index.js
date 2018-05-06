import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';

import reducers from './reducer';
import './config';

const store = createStore(counter, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
        </BrowserRouter>
    </Provider>), document.getElementById('root')
);
