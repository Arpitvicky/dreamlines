import React, { Component } from 'react';
import Comment from '../comment';
class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
        postCommentData: [],
        isLoading:true,
        expand:false
    }
  }

  showComments = () => {
    if(this.state.isLoading) {
     fetch('https://jsonplaceholder.typicode.com/comments?postId=' + this.props.post.id)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        this.setState({postCommentData:result, isLoading: false, expand: true});
      });
    } else {
        this.setState(prevState => ({
            expand: !prevState.expand
        }));
    }
  }
  render() {
    const { post } = this.props;
    const { postCommentData, expand, isLoading } = this.state;
    const commentList = postCommentData && postCommentData.map((comment,index) => {
        return (
          <Comment key={comment.id} comment = {comment}/>
        )
      });
    return (
        <li className='post_item'>
            <h3>{post.title}</h3>
            <p>{post.body} </p>
            <button className='btn btn-info' onClick={this.showComments}>Show comments</button>
            <ul className={expand ? 'expand' : ''}>
                <span className={isLoading ? 'loader':'hidden'}/>
                {commentList}
            </ul>
        </li>
    );
  }
}

export default Post;
