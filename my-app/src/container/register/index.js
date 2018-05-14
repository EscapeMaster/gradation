import React from 'react';
import Logo from '../../component/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user_redux';
import { Redirect } from 'react-router-dom';
import immocForm from '../../component/immoc-form';

@connect(
    state => state.user,
    { register }
)
@immocForm
class Register extends React.Component {
    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this);
    }
    componentDidMount() {
        this.props.handleChange('type', 'student');
    }
    handleRegister() {
        this.props.register(this.props.state);
    }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                    <InputItem
                        onChange={v => { this.props.handleChange('user', v) }}
                    >用户名</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        onChange={v => { this.props.handleChange('pwd', v) }}
                    >密码</InputItem>
                    <WhiteSpace />
                    <InputItem
                        type='password'
                        onChange={v => { this.props.handleChange('repeatpwd', v) }}
                    >确认密码</InputItem>
                    <WhiteSpace />
                    <RadioItem
                        checked={this.props.state.type == 'student'}
                        onChange={() => { this.props.handleChange('type', 'student') }}
                    >
                        学生
                    </RadioItem>
                    <RadioItem
                        checked={this.props.state.type == 'teacher'}
                        onChange={() => { this.props.handleChange('type', 'teacher') }}
                    >
                        教师
                    </RadioItem>
                    <WhiteSpace />

                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </List>
            </div>
        )
    }
}
export default Register;