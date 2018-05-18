import React from 'react';
import io from 'socket.io-client';
import { List, InputItem, NavBar } from 'antd-mobile';
import { spawn } from 'child_process';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat_redux';
// const socket = io('ws://localhost:8000')//有跨域


@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: []
        }
    }
    componentDidMount() {
        this.props.getMsgList(this.props.user.user_id, this.props.match.params.user);
        this.props.recvMsg();
        // socket.on('recvmsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // });
    }
    handleSumbit() {
        // socket.emit('sendmsg', { text: this.state.text })
        const from = this.props.user.user_id;
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({ from, to, msg });
        this.setState({ text: '' })
    }
    render() {
        const user = this.props.match.params.user;
        const Item = List.Item;
        return (
            <div id="chat-page">
                <NavBar mode="dark">
                    {this.props.match.params.user}
                </NavBar>
                {this.props.chat.chatmsg.map((v, idx) => {
                    return v.from == user ? (
                        <List key={idx}>
                            <Item
                            // thumb={}
                            >{v.content}</Item>
                        </List>
                    ) : (
                            <List key={idx}>
                                <Item
                                    extra={'avator'}
                                    className="chat-me"
                                // thumb={}
                                >{v.content}</Item>
                            </List>
                        )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入消息"
                            value={this.state.text}
                            onChange={
                                v => {
                                    this.setState({ text: v })
                                }
                            }
                            extra={<span onClick={() => { this.handleSumbit() }}>发送</span>}
                        >
                        </InputItem>
                    </List>
                </div>
            </div>

        )
    }

}
export default Chat;