import axios from 'axios';
const VIDEO_LIST = 'VIDEO_LIST'

const initState = {
    videolist:[]
}

export function chatuser(state=initState,action){
    switch(action.type){
        case VIDEO_LIST:
            return {...state,videolist:action.payload}
        default:
            return state;
    }
    
}




function videoList(data){
    return {type:VIDEO_LIST,payload:data}
}

export function getVideoList(){
    return dispatch=>{
		axios.get('/user/list')
			.then(res=>{
				if (res.data.code==0) {
					dispatch(videoList(res.data.data))
				}
			})

	}
}