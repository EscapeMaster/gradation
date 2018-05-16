import React from 'react'
import { connect } from 'react-redux'
import { getVideoList, searchVideo } from '../../redux/chatuser_redux'
import VideoCard from '../videocard'
import { SearchBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { withRouter } from 'react-router-dom'

@withRouter
@connect(
	state => state.chatuser,
	{ getVideoList, searchVideo }
)
class Video extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}
	componentDidMount() {
		this.props.getVideoList();
	}
	onChange(k, v) {
		this.setState({
			[k]: v
		},()=>{
			if(!this.state.value){
				this.props.getVideoList();
			}
		});
	}
	handleSearch() {
		this.props.searchVideo(this.state);
	}

	render() {
		const videolist = this.props.videolist ? this.props.videolist : [];
		return (
			<div>
				<SearchBar
					defaultValue={this.state.value}
					placeholder="Search"
					onSubmit={v => this.handleSearch()}
					showCancelButton
					onChange={(v) => this.onChange('value', v)}
				/>
				<VideoCard videolist={videolist}></VideoCard>
			</div>
		)
	}

}
export default Video