import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';
import Login from './container/login';
import Regitser from './container/register';
import reducers from './reducer';
import './config';

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Regitser}></Route>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root')
);
