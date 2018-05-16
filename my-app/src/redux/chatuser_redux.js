import axios from 'axios';
// const VIDEO_LIST = 'VIDEO_LIST';
// const VIDEO_SINGLE = 'VIDEO_SINGLE';
// const SERACH_SUCCESS = 'SERACH_SUCCESS';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const COMMENT_SUCCESS = 'COMMENT_SUCCESS';
const initState = {
    videolist: [],
    commentslist: []
}

export function chatuser(state = initState, action) {
    switch (action.type) {
        // case VIDEO_LIST:
        //     return { ...state, videolist: action.payload }
        // case VIDEO_SINGLE:
        //     return { ...state, videolist: action.payload }
        // case SERACH_SUCCESS:
        //     return { ...state, videolist: action.payload }
        case LOAD_SUCCESS:
            return { ...state, videolist: action.payload }
        case COMMENT_SUCCESS:
            return { ...state, commentslist: action.payload }
        default:
            return state;
    }

}




// function videoList(data) {
//     return { type: VIDEO_LIST, payload: data }
// }

// function videoSingle(data) {
//     return { type: VIDEO_SINGLE, payload: data }
// }

// function searchResult(data) {
//     return { type: SERACH_SUCCESS, payload: data }
// }
function commentsData(data) {
    return { type: COMMENT_SUCCESS, payload: data }
}

function loadData(data) {
    return { type: LOAD_SUCCESS, payload: data }
}

export function getVideoList() {
    return dispatch => {
        axios.get('/user/list')
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(loadData(res.data.data))
                }
            })

    }
}

export function lookVideo({ video_id }) {
    return dispatch => {
        axios.get(`/user/video?video_id=${video_id}`)
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(loadData(res.data.data))
                }
            })
    }
}
export function lookComments({ video_id }) {
    return dispatch => {
        axios.get(`/user/comment?video_id=${video_id}`)
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(commentsData(res.data.data))
                }
            })
    }
}
export function submitComment({ video_id, user_id, time, content }) {
    return dispatch => {
        axios.post(`/user/save`, { video_id, user_id, time, content })
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(commentsData(res.data.data))
                }
            })
    }
}
export function searchVideo({ value }) {
    return dispatch => {
        axios.get(`/user/search?info=${value}`)
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(loadData(res.data.data))
                }
            })
    }
}