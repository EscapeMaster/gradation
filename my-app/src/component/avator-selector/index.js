import React from 'react';
import {Grid, List} from 'antd-mobile';
import PropTypes from 'prop-types';

class AvatorSelector extends React.Component{
    static propTypes = {
		selectAvator: PropTypes.func.isRequired
	}//类型校验
	constructor(props) {
		super(props)
		this.state={}
	}
    render(){
        const avatorList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'.
                            split(',')
                            .map(v=>({
                                icon:require(`../img/${v}.png`),
                                text:v
                            }))
        const gridHeader = this.state.icon
                            ? (<div>
                                    <span>已选择头像</span>
                                    <img style={{width:20}} src={this.state.icon} alt=""/>
                                </div>)
                            : '请选择头像'
        return (
            <div>
                <List renderHeader={()=>gridHeader}/>
                <Grid
                    data={avatorList}
                    columnNum={5} 
                    onClick={elm=>{
                        this.setState(elm)
                        this.props.selectAvator(elm.text)
                    }}
                />
            </div>
        )
        
    }
}

export default AvatorSelector;