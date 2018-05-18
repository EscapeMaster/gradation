import axios from 'axios';
import io from 'socket.io-client'
const socket = io('ws://localhost:8000')//有跨域

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    unread: 0
}


export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, chatmsg: action.payload, unread: action.payload.filter(v => { return !v.read }).length }
        case MSG_RECV:
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1 }
        // case MSG_READ:
        default:
            return state
    }
}

function msgList(msgs) {
    return { type: 'MSG_LIST', payload: msgs }
}
function msgRecv(msg) {
    return { type: 'MSG_RECV', payload: msg }
}
export function getMsgList(from,to) {
    return dispatch => {
        axios.post(`/user/getmsgList`,{from,to})
            .then(res => {
                dispatch(msgList(res.data.msgs))
            })
    }
}

export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg })
    }
}

export function recvMsg() {
    return dispatch => {
        socket.on('recvmsg', function (data) {
            console.log('recvmsg', data)
            dispatch(msgRecv(data))
        })
    }
}