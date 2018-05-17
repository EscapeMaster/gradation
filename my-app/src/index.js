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
import Dashboard from './component/dashboard';
import VideoDetails from './container/videodetails';
import Chat from './component/chat';
import Search from './container/search';
import reducers from './reducer';
import './config';
import './index.css';
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f=>f
));//window.devToolsExtension热加载redux插件
ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/teacherinfo" component={TeacherInfo}></Route>
                    <Route path="/studentinfo" component={StudentInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Regitser}></Route>
                    <Route path="/video" component={VideoDetails}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>), document.getElementById('root')
);
