import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fillData: false
    }
  }

  login() {
    const userName = document.getElementById('name').value;
    if (userName) {
      this.setState({fillData: false});
      this.props.loginHandler(userName);
    } else {
      this.setState({fillData: true});
    }
  }

  render() {
    const { fillData } = this.state;
    return (
        <div className='login_container'>
          <h1>DREAMLINES <br/> EMPLOYEE LOGIN PORTAL</h1>
          <div className="form-group">
            <label htmlFor="name">Enter username</label>
            <input id='name' type="text" placeholder='Enter Username' className="form-control"></input>
          </div>
          <button onClick={() => this.login()} className="btn btn-success">Login</button>
          <span className={ !fillData ? 'hidden': ''}>Please enter username.</span>
        </div>
    );
  }
}

export default Login;
