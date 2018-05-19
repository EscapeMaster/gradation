import React from 'react';
import io from 'socket.io-client';
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile';
import { spawn } from 'child_process';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg, getMeMsg, readMsg } from '../../redux/chat_redux';
import { getChatId } from '../../util';
// const socket = io('ws://localhost:8000')//有跨域


@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
    }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
       
        // socket.on('recvmsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // });
    }
    componentWillUnmount() {
        const to = this.props.match.params.user;
        this.props.readMsg(to);
    }
    handleSumbit() {
        // socket.emit('sendmsg', { text: this.state.text })
        const from = this.props.user.user_id
        const to = this.props.match.params.user;
        const msg = this.state.text;
        this.props.sendMsg({ from, to, msg });
        this.setState({
            text: '',
            showEmoji: false
        })
    }
    fixCarousel() {
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    render() {
        const emojiArr = '😀 😁 😂 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 😇 😐 😑 😶 😏 😣 😥 😮 😯 😪 😫 😴 😌 😛 😜 😝 😒 😓 😔 😕 😲 😷 😖 😞 😟 😤 😢 😭 😦 😧 😨 😬 😰 😱 😳 😵 😡 😠 💪 👈 👉 ☝ 👆 👇 ✌ ✋ 👌 👍 👎 ✊ 👊 👋 👏 👐 ✍ 👦 👧 👨 👩 👴 👵 👶 👱 👮 👲 👳 👷 👸 💂 🎅 👰 👼 💆 💇 🙍 🙎 🙅 🙆 💁 🙋 🙇 🙌 🚶 🏃 👯 💃 👫 👬 👭 💏 💑 👪'
            .split(' ');
        const emoji = emojiArr.map(v => {
            return { text: v }
        })
        const user_id = this.props.match.params.user;
        const Item = List.Item;
        const users = this.props.chat.users;
        if (!users[user_id]) {
            return null;
        }
        const chatid = getChatId(user_id, this.props.user.user_id);
        const chatmsgs = this.props.chat.chatmsg.filter(v => { return getChatId(v.from, v.to) == chatid })
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
                            extra={
                                <div>
                                    <span
                                        style={{ marginRight: 15 }}
                                        onClick={
                                            () => {
                                                this.setState({ showEmoji: !this.state.showEmoji })
                                                this.fixCarousel()
                                            }
                                        }
                                    >
                                        😀</span>
                                    <span onClick={() => { this.handleSumbit() }}>发送</span>
                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {this.state.showEmoji ?
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el => {
                                this.setState({
                                    text: this.state.text + el.text
                                })
                            }}
                        />
                        : null
                    }

                </div>
            </div>

        )
    }

}
export default Chat;