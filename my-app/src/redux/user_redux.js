
import axios from 'axios';
import { getRedirectPath } from '../util';
const ERROR_MSG = 'ERROR_MSG';
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOGOUT = 'LOGOUT';
const LOAD_DATA = 'LOAD_DATA';
const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    type: ''
}
//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case ERROR_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        case LOAD_DATA:
            return { ...state, ...action.payload }
        case LOGOUT:
            return { ...initState, redirectTo: '/login' }
        default:
            return state;
    }
}


function authSuccess(obj) {
    const { pwd, ...data } = obj
    return { type: AUTH_SUCCESS, payload: data }
}

// function registerSuccess(data){
//     return {type:REGISTER_SUCCESS, payload:data}
// }

// function loginSuccess(data) {
//     return {type:LOGIN_SUCCESS, payload:data}
// }

function errorMsg(msg) {
    return { msg, type: ERROR_MSG }
}
export function logoutSubmit() {
    return { type: LOGOUT }
}

export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !type) {
        return errorMsg('用户密码必须输入')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('两次密码不一致')
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
            .then((res) => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd, type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            });
    }

}

export function login({ user, pwd }) {
    if (!user || !pwd) {
        return errorMsg('用户密码必须输入')
    }
    return dispatch => {
        axios.post('/user/login', { user, pwd })
            .then((res) => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data[0]))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            });
    }

}

export function loadData(userinfo) {//判断登录状态的action
    return { type: LOAD_DATA, payload: userinfo }
}

export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)
            .then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data[0]))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}