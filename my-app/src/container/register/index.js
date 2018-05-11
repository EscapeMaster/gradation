import React from 'react';
import Logo from '../../component/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button, Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user_redux';
import { Redirect } from 'react-router-dom';

@connect(
    state=>state.user,
    {register}
)

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            user: '',
            pwd : '',
            repeatpwd: '',
            type: 'student'
        }
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        });
    }
    handleRegister(){
        this.props.register(this.state);
        console.log(this.state);
    }
    render(){
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo? <Redirect to={this.props.redirectTo}/>: null}
                <Logo></Logo>
                <List>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null}
                    <InputItem 
                    onChange={v=>{this.handleChange('user',v)}}
                    >用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem 
                    type='password'
                    onChange={v=>{this.handleChange('pwd',v)}}
                    >密码</InputItem>
                    <WhiteSpace/>
                    <InputItem 
                    type='password'
                    onChange={v=>{this.handleChange('repeatpwd',v)}}
                    >确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem 
                    checked={this.state.type == 'student'}
                    onChange={()=>{this.handleChange('type','student')}}
                    >
                        学生
                    </RadioItem>
                    <RadioItem 
                    checked={this.state.type == 'teacher'}
                    onChange={()=>{this.handleChange('type','teacher')}}
                    >
                        教师
                    </RadioItem>
                    <WhiteSpace/>
                    
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}
export default Register;