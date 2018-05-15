import React from 'react'
import { connect } from 'react-redux'
import { Result, List, Brief, WhiteSpace, Modal, Button } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user_redux'
import { Redirect } from 'react-router-dom'
@connect(
	state => state.user,
	{ logoutSubmit }
)
class User extends React.Component {
	constructor(props) {
		super(props)
		this.logout = this.logout.bind(this)
		this.update = this.update.bind(this)
	}
	logout() {
		const alert = Modal.alert

		alert('注销', '确认退出登录吗???', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{
				text: '确认', onPress: () => {
					browserCookie.erase('userid')
					this.props.logoutSubmit()
				}
			}
		])
	}
	update() {
		const alert = Modal.alert
		const { type } = this.props;
		alert('更改个人信息', '确认更改信息吗???', [
			{ text: '取消', onPress: () => console.log('cancel') },
			{
				text: '确认', onPress: () => {
					console.log(1);
					this.props.history.push(`/${type}info`);
				}
			}
		])
	}
	render() {
		const props = this.props;
		const Item = List.Item;
		const Brief = Item.Brief;
		const descAddress = props.type == 'teacher' ? '办公室：' : '寝室地址：';
		const desc = props.type == 'teacher' ? '教师简介：' : '个性签名：';
		return props.type ? (
			<div>
				<Result
					img={<img src={require(`../img/${props.avator}.png`)} style={{ width: 50 }} alt="" />}
					title={props.username}
					message={props.type == 'teacher' ? '教师' : '学生'}
				/>

				<List renderHeader={() => '简介'}>
					<Item
						multipleLine
					>
						<Brief>{desc}</Brief>
						{props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
					</Item>
					<Item multipleLine><Brief>所在学校：{props.school}</Brief></Item>
					<Item multipleLine><Brief>所在学院：{props.college}</Brief></Item>
					<Item multipleLine><Brief>{descAddress + props.address}</Brief></Item>
				</List>

				<WhiteSpace></WhiteSpace>
				<List>
					<Item onClick={this.logout} arrow="horizontal">退出登录</Item>
				</List>
				<List>
					<Item onClick={this.update} arrow="horizontal">修改信息</Item>
				</List>
			</div>
		) : <Redirect to={props.redirectTo} />

	}
}


export default User
