import React from 'react'
import {connect} from 'react-redux'
import {getVideoList} from '../../redux/chatuser_redux'
import VideoCard from '../videocard'

@connect(
	state=>state.chatuser,
	{getVideoList}
)
class Video extends React.Component{
	componentDidMount() {
		this.props.getVideoList();
	}

	render(){
		const videolist = this.props.videolist ? this.props.videolist : [];
		return <VideoCard videolist={videolist}></VideoCard>
	}

}
export default Video