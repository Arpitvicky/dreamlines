import React, { Component } from 'react';
import Post from '../post';
class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = {
        userPostData: []
    }
  }
  componentDidMount () {
     fetch('https://jsonplaceholder.typicode.com/posts?userId=' + this.props.userData.id)
      .then(response => response.json())
      .then(result => {
        this.setState({ userPostData:result });
      });
  }
  logoutHandler = () => {
    localStorage.removeItem('uname');
    this.props.logoutHandler();
  }
  onSubmitPost = (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body_text').value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            body: body,
            userId: this.props.userData.id
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => response.json())
    .then(json => {
        document.getElementById('title').value = '';
        document.getElementById('body_text').value = '';
        this.setState(prevState => ({
            userPostData: [json, ...prevState.userPostData]
        }));
    });
  }
  render() {
    const { userData } = this.props;
    const { userPostData } = this.state;

    const postList = userPostData && userPostData.map((post, index) => {
        return (
          <Post key={post.id} post = {post}/>
        )
    });
    return (
        <div className="user_detail_container">
            <button className='btn btn-danger pull-right' onClick={ this.logoutHandler }>Log Out</button>
            <div className='user_detail'>
                <h2>Welcome <span>{userData.name}</span></h2>
                <h4> Email Id: {userData.email} </h4>
                <h4>Address: </h4>
                <p>{userData.address.street}</p>
                <p>{userData.address.suite}</p>
                <p>{userData.address.city}</p>
                <p>{userData.address.zipcode}</p>
                <h4>Phone number : {userData.phone}</h4>
                <h4>Website : {userData.website}</h4>
                <h4>Company details : {userData.company.name} </h4>
            </div>
            <div className='post_form'>
                <form onSubmit={this.onSubmitPost}>
                    <div className="form-group">
                        <label htmlFor="title">Enter title</label>
                        <input id='title'  type="text" required placeholder='Enter title' className="form-control"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="body_text">Enter body</label>
                        <textarea rows="4" cols="50"  id='body_text' required placeholder='Enter body text' className="form-control"></textarea>
                    </div>
                    <button type="submit" className="btn btn-success">Submit Post</button>
                </form>
            </div> 
            <div className='posts_container'>
                <h2>My posts</h2>
                <ul>{postList}</ul>
            </div>
        </div>
    );
  }
}

export default Welcome;
