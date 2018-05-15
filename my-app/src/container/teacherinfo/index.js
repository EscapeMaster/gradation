import React from 'react';
import { NavBar, TextareaItem, Button, InputItem, WhiteSpace, Toast } from 'antd-mobile'
import AvatorSelector from '../../component/avator-selector';
import { connect } from 'react-redux';
import { update } from '../../redux/user_redux'
import { Redirect } from 'react-router-dom';


@connect(
    state => state.user,
    { update }
)
class TeacherInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            desc: '',
            school: '',
            college: '',
            address: ''
        }
    }
    onChange(k, v) {
        this.setState({
            [k]: v
        })
    }
    render() {
        const path = this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return (
            <div>
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">教师完善信息页面</NavBar>
                <AvatorSelector
                    selectAvator={(imgname) => {
                        this.setState({
                            avator: imgname
                        })
                    }}
                ></AvatorSelector>
                <WhiteSpace />
                <InputItem onChange={(v) => this.onChange('school', v)}>
                    所在学校
				</InputItem>
                <WhiteSpace />
                <InputItem onChange={(v) => this.onChange('college', v)}>
                    所属学院
				</InputItem>
                <WhiteSpace />
                <InputItem onChange={(v) => this.onChange('address', v)}>
                    办公室
				</InputItem>
                <WhiteSpace />
                <TextareaItem
                    onChange={(v) => this.onChange('desc', v)}
                    rows={3}
                    autoHeight
                    title="教师简介"
                >
                </TextareaItem>

                <Button
                    onClick={() => {
                        if (this.state.desc && this.state.school && this.state.address && this.state.college) {
                            this.props.update(this.state)
                        }else{
                            Toast.fail('请补全教师信息', 1)
                        }
                    }}
                    type='primary'>保存</Button>

            </div>
        )

    }
}

export default TeacherInfo;