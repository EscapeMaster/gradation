import React from 'react'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'
import {Switch, Route} from 'react-router-dom'
import NavLinkBar from '../navlink'
import AuthRoute from '.././authroute';

// import Boss from '../../component/boss/boss'
// import Genius from '../../component/genius/genius'
function Msg(){
	return <h2>消息列表页面</h2>
}
function User(){
	return <h2>个人中心页面</h2>
}
@connect(
	state=>state
)
class Dashboard extends React.Component{

	render(){
		const {pathname} = this.props.location
		const user = this.props.user
		const navList = [
			{
				path:'/teacher',
				text:'视频',
				icon:'video',
				title:'视频列表',
				component:Msg,
				hide:user.type=='teacher'
			},
			{
				path:'/student',
				text:'视频',
				icon:'video',
				title:'视频列表',
				component:Msg,
				hide:user.type=='student'
			},
			{
				path:'/msg',
				text:'消息',
				icon:'msg',
				title:'消息列表',
				component:Msg
			},
			{
				path:'/me',
				text:'我',
				icon:'user',
				title:'个人中心',
				component:User
			}
        ]
        console.log(user.user)
		return (
			<div>
                   
                {user.type?
                <div>
                    <NavBar className='fixd-header' mode='dard'>{navList.find(v=>v.path==pathname).title}</NavBar>
				{/* <div style={{marginTop:45}}>
						<Switch>
							{navList.map(v=>(
								<Route key={v.path} path={v.path} component={v.component}></Route>
							))}
						</Switch>
				</div> */}

				<NavLinkBar data={navList}></NavLinkBar>
                </div>
                
                : <AuthRoute></AuthRoute>}
				
				
			</div>
		)

		
	}

}

export default Dashboard