import React from 'react';
import Logo from '../../component/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux'
import { login } from '../../redux/user_redux';
import { Redirect } from 'react-router-dom';
import immocForm from '../../component/immoc-form'
@connect(
    state => state.user,
    { login }
)
@immocForm
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }
    register() {
        this.props.history.push('./register');
    }
    login() {
        this.props.login(this.props.state);
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.props.handleChange('user', v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            type='password'
                            onChange={v => this.props.handleChange('pwd', v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.login}>登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login;