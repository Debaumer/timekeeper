import React, {Component} from 'react';
//import {Link} from 'react-router-dom';

class Login extends Component {
  state = {

  }
  //lc hooks

  render (){

    const style = {
      paddingTop: '5%'
    }
    return (
      <div className="Login">
        <h1>Login</h1>
        <form style={style}>
          <input type="text" placeholder="username/email"/>
          <input type="text" placeholder="password"/>
        </form>
        <p>Forgotten Password</p>
      </div>
    );
  }
}

export default Login;
