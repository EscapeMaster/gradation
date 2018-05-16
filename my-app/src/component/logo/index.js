import React from 'react';
import './index.css'
const logo = require(`./logo.png`)
class Logo extends React.Component{
    
    render(){
        return(
            <div className="logo-container">
                <img src={logo} alt=""/>
            </div> 
        );
    }
}
export default Logo;