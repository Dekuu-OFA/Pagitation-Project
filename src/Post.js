import React from 'react';

function Post(props) {
  return (
    <div className="post">
      <small>{props.id}</small>
      <h1>{props.title}</h1>
      <p>{props.body}</p>
    </div>
  );
}

export default Post;