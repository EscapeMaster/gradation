import axios from 'axios';
const VIDEO_LIST = 'VIDEO_LIST';
const VIDEO_SINGLE = 'VIDEO_SINGLE';
const initState = {
    videolist: []
}

export function chatuser(state = initState, action) {
    switch (action.type) {
        case VIDEO_LIST:
            return { ...state, videolist: action.payload }
        case VIDEO_SINGLE:
            return { ...state, videolist: action.payload }
        default:
            return state;
    }

}




function videoList(data) {
    return { type: VIDEO_LIST, payload: data }
}

function videoSingle(data) {
    return { type: VIDEO_SINGLE, payload: data }
}

export function getVideoList() {
    return dispatch => {
        axios.get('/user/list')
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(videoList(res.data.data))
                }
            })

    }
}

export function lookVideo({video_id,user_id,cate_id}) {
    return dispatch => {
        axios.get(`/user/video?video_id=${video_id}&user_id=${user_id}&cate_id=${cate_id}`)
            .then(res => {
                if (res.data.code == 0) {
                    dispatch(videoSingle(res.data.data))
                }
            })
    }
}