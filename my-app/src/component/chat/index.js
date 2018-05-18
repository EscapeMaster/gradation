import React from 'react';
import io from 'socket.io-client';
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import { spawn } from 'child_process';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg, getMeMsg } from '../../redux/chat_redux';
import { getChatId } from '../../util';
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
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
        
        // socket.on('recvmsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // });
    }
    handleSumbit() {
        // socket.emit('sendmsg', { text: this.state.text })
        const from = this.props.user.user_id
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({ from, to, msg });
        this.setState({ text: '' })
    }
    render() {
        const user_id = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        if (!users[user_id]) {
            return null;
        }
        const chatid = getChatId(user_id,this.props.user.user_id);
        const chatmsgs = this.props.chat.chatmsg.filter(v=>{return getChatId(v.from,v.to)==chatid})
        // console.log(chatmsgs)
        return (
            <div id="chat-page">
                <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => { this.props.history.goBack() }}
                >
                    {users[user_id - 1].username}
                </NavBar>
                {chatmsgs.map((v, idx) => {
                    const avator = require(`../img/${users[v.from - 1].avator}.png`)
                    return v.from == user_id ? (
                        <List key={idx}>
                            <Item
                                thumb={avator}
                            >{v.content}</Item>
                        </List>
                    ) : (
                            <List key={idx}>
                                <Item
                                    extra={<img src={avator} />}
                                    className="chat-me"
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