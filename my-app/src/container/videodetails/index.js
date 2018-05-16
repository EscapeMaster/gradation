
import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Card } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user_redux';
import { Redirect, withRouter } from 'react-router-dom';
import { lookVideo } from '../../redux/chatuser_redux'


@connect(
    state => state.chatuser
)
class VideoDetails extends React.Component {
    constructor(props) {
        super(props)
    }

    // componentDidMount(){
    //     console.log(this.props)
    //     // this.props.lookVideo()
    // }
    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        const Footer = Card.Footer;
        const videolist = this.props.videolist;
        const Item = List.Item;
        const Brief = Item.Brief;
        const { title, cate_name, desc, username, video_src } = this.props.videolist[0];
        return (
            <div>
                <div id="video">
                    <video className="video" src={require(`../../component/video/${video_src}`)} controls height="220" wight="375"></video>
                </div>
                <Card>
                    <Header
                        title={title}
                        extra={<span>{cate_name}</span>}
                    ></Header>
                    <Body>
                        {desc.split('\n').map(d => (
                            <div key={d}>{d}</div>
                        ))}
                    </Body>
                    <Footer content={username}></Footer>
                </Card>
                <InputItem
                // onChange={v => { this.props.handleChange('user', v) }}
                >输入评论</InputItem>
                {/* <Card>
                    {videolist.map((v,index) => {
                        <div key={index}>
                            <Header
                                title="评论时间"
                                extra={<span>{v.time}</span>}
                            ></Header>
                            <Body>
                                {v.content}
                            </Body>
                        </div>

                    })}
                </Card> */}
            </div>

        )
    }
}
export default VideoDetails;