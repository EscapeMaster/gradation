import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';
import Login from './container/login';
import Regitser from './container/register';
import AuthRoute from './component/authroute';
import TeacherInfo from './container/teacherinfo';
import StudentInfo from './container/studentinfo';

import reducers from './reducer';
import './config';
import './index.css'
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));//window.devToolsExtension热加载redux插件
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Route path="/teacherinfo" component={TeacherInfo}></Route>
                <Route path="/studentinfo" component={StudentInfo}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Regitser}></Route>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root')
);
