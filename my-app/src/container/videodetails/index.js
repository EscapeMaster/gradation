
import React from 'react';
import { List, TextareaItem, WingBlank, WhiteSpace, Card, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user_redux';
import { Redirect, withRouter } from 'react-router-dom';
import { lookVideo, lookComments, submitComment } from '../../redux/chatuser_redux'


@connect(
    state => state.chatuser,
    { lookVideo, lookComments, submitComment }
)
class VideoDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        }
        this.video_id = this.getQueryString('video_id');
    }

    componentDidMount() {
        this.setState({ video_id: this.video_id }, () => {
            this.props.lookVideo(this.state);
            this.props.lookComments(this.state);
        })


    }
    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        });
    }
    getNowFormatDate() {
        let date = new Date();
        let seperator1 = "-";
        let seperator2 = ":";
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    }
    submit() {
        const user_id = this.getQueryString('user_id');
        const time = this.getNowFormatDate();
        this.setState({ user_id, time }, () => {
            this.props.submitComment(this.state);
            this.setState({content:''})
        })
    }
    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        const Footer = Card.Footer;
        const Item = List.Item;
        const Brief = Item.Brief;
        const { title, cate_name, desc, username, video_src } = this.props.videolist[0];
        return (
            <WingBlank>
                <div id="video">
                    <video className="video" src={require(`../../component/video/${video_src}`)} controls height="210" wight="375"></video>
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
                <WhiteSpace></WhiteSpace>
                {this.props.commentslist.length ?
                    this.props.commentslist.map((v, idx) => {
                        return (
                            <Card key={idx}>
                                <Header
                                    title="评论时间"
                                    extra={<span>{v.time}</span>}
                                ></Header>
                                <Body>
                                    {v.content}
                                </Body>
                                <Footer content="评论人" extra={<div>{v.username}</div>} />
                            </Card>
                        )
                    })
                    : null}

                <WhiteSpace></WhiteSpace>
                <TextareaItem
                    value={this.state.content}
                    onChange={(v) => this.handleChange('content', v)}
                    rows={3}
                    autoHeight
                    title="输入评论"
                >
                </TextareaItem>
                <WhiteSpace></WhiteSpace>
                <Button type='primary' onClick={this.submit.bind(this)}>提交</Button>
            </WingBlank>

        )
    }
}
export default VideoDetails;