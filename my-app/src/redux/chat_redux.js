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
    unread: 0,
    users: {}
}


export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v => !v.read && v.to == action.payload.user_id).length }
        case MSG_RECV:
            const n = action.payload.to == action.user_id ? 1 : 0;
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n }
        // case MSG_READ:
        default:
            return state
    }
}

function msgList(msgs, users, user_id) {
    return { type: 'MSG_LIST', payload: { msgs, users, user_id } }
}
function msgRecv(msg, user_id) {
    return { user_id, type: 'MSG_RECV', payload: msg }
}
// export function getMsgList(from, to) {
//     return dispatch => {
//         axios.post(`/user/getmsgList`, { from, to })
//             .then(res => {
//                 dispatch(msgList(res.data.msgs))
//             })
//     }
// }

export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg })
    }
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', function (data) {
            const user_id = getState().user.user_id;
            dispatch(msgRecv(data, user_id))
        })
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get(`/user/getmsgList`)
            .then(res => {
                if (res.data.code == 0) {
                    const user_id = getState().user.user_id;
                    dispatch(msgList(res.data.msgs, res.data.users, user_id))
                }
            })
    }
}
