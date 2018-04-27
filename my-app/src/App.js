import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { addGun, addGunAsync } from './redux';

// const mapStatetoProps = (state)=>{
//   return {num:state}
// }
// const actionCreators = { addGun, addGunAsync };
// App = connect(mapStatetoProps, actionCreators)(App)
@connect(
  state=>({num:state}),
  { addGun, addGunAsync }
)

class App extends Component {
  render() {
    const addGun = this.props.addGun;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Button type="primary" onClick={ this.props.addGun}>申请武器</Button>
        <Button type="primary" onClick={ this.props.addGunAsync}>拖两天再给</Button>
        <Button type="primary">现在有机枪{this.props.num}把</Button>
        
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
