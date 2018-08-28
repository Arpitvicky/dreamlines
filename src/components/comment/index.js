import React from 'react';
const Comment = (props) => {
    const {name, email, body} = props.comment;
    return (
        <li>
            <h2>{body}</h2>
            <p>Email id:- {email}</p>
            <p>Name {name}</p>
        </li>
    )
}
export default Comment;

