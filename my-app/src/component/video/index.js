import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'
import {getVideoList} from '../../redux/chatuser_redux'
import VideoCard from '../videocard'

@connect(
	state=>state.chatuser,
	{getVideoList}
)
class Video extends React.Component{
	constructor(props){
        super(props);
        this.state = {
            videolist:[]
        }
    }
	componentWillMount() {
		this.props.getVideoList();
		
	}

	render(){
		const videolist = this.props.videolist ? this.props.videolist : [];
		return <VideoCard videolist={videolist}></VideoCard>
	}

}
export default Video