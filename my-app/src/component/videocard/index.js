import React from 'react'
import PropTypes from 'prop-types'
import { Card, WhiteSpace, WingBlank, List } from 'antd-mobile'
import { connect } from 'react-redux'
import { StateType } from 'rmc-calendar/lib/Calendar';
import {withRouter} from 'react-router-dom'
import {lookVideo} from '../../redux/chatuser_redux'

@withRouter
@connect(
	state => state,
	{lookVideo}
)
class VideoCard extends React.Component {
	static propTypes = {
		videolist: PropTypes.array
	}
	constructor(props) {
		super(props);
	}
	handleplay(video_id,user_id,cate_id) {
		// console.log(this.props)
		this.setState({video_id:video_id,user_id:user_id,cate_id:cate_id},()=>{
			this.props.lookVideo(this.state);
			this.props.history.push(`/video?video_id=${video_id}&user_id=${user_id}&cate_id=${cate_id}`);
		})
		
	}
	render() {
		const Header = Card.Header;
		const Body = Card.Body;
		const videolist = this.props.videolist;
		const Item = List.Item;
		const Brief = Item.Brief;
		return (
			<WingBlank>
				<WhiteSpace></WhiteSpace>
				{videolist.map(v => (
					v.avator ? (
						<div className="video" key={v.video_id}>
							<Card>
								<Header
									title={v.title}
									thumb={require(`../img/${v.avator}.png`)}
									extra={<span>{v.username}</span>}
								></Header>
								<Body>
									{v.desc.split('\n').map(d => (
										<div key={d}>{d}</div>
									))}
								</Body>
							</Card>
							<List>
								<Item onClick={this.handleplay.bind(this,v.video_id,v.user_id,v.cate_id)}><Brief>点击观看</Brief></Item>
							</List>
							<WhiteSpace></WhiteSpace>
						</div>

					) : null

				))}
			</WingBlank>
		)

	}
}
export default VideoCard

