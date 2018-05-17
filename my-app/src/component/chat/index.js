import React from 'react';
import io from 'socket.io-client';
import { List, InputItem } from 'antd-mobile';
import { spawn } from 'child_process';
import {connect} from 'react-redux';
import {getMsgList} from '../../redux/chat_redux';
const socket = io('ws://localhost:8000')//有跨域


@connect(
    state=>state,
    {getMsgList}
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
        // console.log(this.props)
        this.props.getMsgList();
        // socket.on('recvmsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // });
    }
    handleSumbit() {
        socket.emit('sendmsg', { text: this.state.text })
        this.setState({ text: '' })
    }
    render() {
        return (
            <div>
                {this.state.msg.map((v, idx) => {
                    return <p key={idx}>{v}</p>
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