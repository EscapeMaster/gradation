
import React from 'react';
import { List, InputItem, WingBlank, WhiteSpace, Button, Radio } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/user_redux';
import { Redirect } from 'react-router-dom';


@connect(
    state => state.user
)
class Search extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props)
        return (
            <h2>xixi</h2>
        )
    }
}
export default Search;