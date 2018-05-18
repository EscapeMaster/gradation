import React from 'react';
import { connect } from 'react-redux'
import { List,Badge } from 'antd-mobile'

@connect(
    state => state
)
class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1]
    }
    render() {
        const Item = List.Item;
        const Brief = Item.Brief;
        const user_id = this.props.user.user_id;
        // if(!this.props.chat.chatmsg.length){

        // }
        const msgGroup = {}
        const userinfo = this.props.chat.users;
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.only_id] = msgGroup[v.only_id] || [];
            msgGroup[v.only_id].push(v);
        })
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLast(a).create_time;
            const b_last = this.getLast(b).create_time;
            return b_last - a_last;
        });
        return (
            <div>
                {chatList.map((v, idx) => {
                    const lastItem = this.getLast(v);
                    const unreadNum = v.filter(v => !v.read && v.to == user_id).length
                    const targetId = v[0].from == user_id ? v[0].to - 1 : v[0].from - 1;
                    const name = userinfo[targetId] && userinfo[targetId].username
                    const avator = userinfo[targetId] && userinfo[targetId].avator
                    return (
                        <List key={idx}>
                            <Item
                                extra={<Badge text={unreadNum}></Badge>}
                                thumb={require(`../img/${avator}.png`)}
                                arrow="horizontal"
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId+1}`);
                                }}
                            >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                        </List>

                    )

                })}
            </div>
        )
    }
}
export default Msg