import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlink'
import AuthRoute from '.././authroute';
import User from '../../component/user'
import Video from '../../component/video-info';
import { Redirect } from 'react-router-dom';
import { getMsgList, recvMsg } from '../../redux/chat_redux';
import Msg from '../../component/msg';


@connect(
	state => state,
	{ getMsgList, recvMsg }
)
class Dashboard extends React.Component {
	componentDidMount() {
		if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList();//查询所有和我有关的消息
			this.props.recvMsg();
		}
	}
	render() {
		const { pathname } = this.props.location
		const user = this.props.user
		const navList = [
			{
				path: '/teacher',
				text: '视频',
				icon: 'video',
				title: '视频列表',
				component: Video,
				hide: user.type == 'teacher'
			},
			{
				path: '/student',
				text: '视频',
				icon: 'video',
				title: '视频列表',
				component: Video,
				hide: user.type == 'student'
			},
			{
				path: '/msg',
				text: '消息',
				icon: 'msg',
				title: '消息列表',
				component: Msg,
				hide: true
			},
			{
				path: '/me',
				text: '我',
				icon: 'user',
				title: '个人中心',
				component: User,
				hide: true
			}
		]
		return (
			<div>
				{user.type ?
					<div>
						<NavBar className='fixd-header' mode='dard'>{navList.find(v => v.path == pathname).title}</NavBar>
						<Switch>
							{navList.map(v => (
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>

						<NavLinkBar data={navList}></NavLinkBar>
					</div>
					: <AuthRoute></AuthRoute>}
			</div>
		)


	}

}

export default Dashboard