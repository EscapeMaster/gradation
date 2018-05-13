import React from 'react';
import {NavBar,InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatorSelector from '../../component/avator-selector';
import {connect} from 'react-redux';
import {update} from '../../redux/user_redux'
import { Redirect } from 'react-router-dom';


@connect(
	state=>state.user,
	{update}
)
class TeacherInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            desc:''
        }
    }
    onChange(k,v){
        this.setState({
            [k]:v
        })
    }
    render(){
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect&&redirect!==path? <Redirect to={this.props.redirectTo}></Redirect> :null}
                <NavBar mode="dark">老师完善信息页面</NavBar>
                <AvatorSelector
                    selectAvator={(imgname)=>{
						this.setState({
							avator:imgname
						})
					}}
                ></AvatorSelector>
                <TextareaItem
                    onChange={(v)=>this.onChange('desc',v)}
                    rows={3}
                    autoHeight
                    title="个人描述"
                >
                </TextareaItem>
                <Button 
					onClick={()=>{
						this.props.update(this.state)
					}}
					type='primary'>保存</Button>
            </div>
        )
        
    }
}

export default TeacherInfo;