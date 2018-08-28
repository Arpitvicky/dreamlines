import React, { Component } from 'react';
import Login from '../login';
import Welcome from '../welcome';
class Blogapp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userData: null,
      noUser: false
    }
  }
  
  componentDidMount () {
    const cachedName = localStorage.getItem('uname');
    if(cachedName) {
      this.fetchUserDetail(cachedName);
    }
  }

  fetchUserDetail = (username) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(result => {
        const userFound = result.filter((user) => user.username.toLowerCase() === username.toLowerCase());
        if (userFound.length) {
          localStorage.setItem('uname', username);
          this.setState({userData:userFound[0], noUser: false});
        } else {
          this.setState({
            noUser: true
          });
        }
      }).catch(error => {
        alert('error occured');
        throw(error);
      });
  }

  submitHandler = (username) => {
    this.fetchUserDetail(username);
  }

  logoutHandler = () => {
    this.setState({userData:null});
  }

  render() {
    const {userData, noUser} = this.state;
    return (
      <div>
        {!userData ? 
          <Login 
            loginHandler={this.submitHandler} 
          /> : 
          <Welcome 
          userData={userData} logoutHandler={this.logoutHandler}
          />
        }
        <span className={!noUser ? 'hidden':''}>Please enter correct username.</span>
      </div>
    )
  }
}

export default Blogapp; 
