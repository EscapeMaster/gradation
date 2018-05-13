import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace,WingBlank} from 'antd-mobile'

class VideoCard extends React.Component{
	static propTypes = {
		videolist: PropTypes.array
    }
	render(){
		const Header = Card.Header
        const Body = Card.Body
        const videolist = this.props.videolist;
		return (
			<WingBlank>
			<WhiteSpace></WhiteSpace>
				{videolist.map(v=>(
					v.avator?(<Card key={v.video_id}>
						<Header
							title={v.user}
							thumb={require(`../img/${v.avator}.png`)}
							extra={<span>{v.username}</span>}
						></Header>
						<Body>

							{v.desc.split('\n').map(d=>(
								<div key={d}>{d}</div>
							))}
						</Body>
					</Card>):null

				))}
			</WingBlank>
        )
        // return 1;

	}
}
export default VideoCard

