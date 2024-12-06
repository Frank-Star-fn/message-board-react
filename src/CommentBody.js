import React from 'react';

const CommentBody = ({ posts }) => {
    return (
      <React.Fragment>
      <div className="">
        <div>
          {posts.map((item, index) => (
            <div className="wrapper" key={index}>
              <div className="media-body">
                <div>
                {item.user}
                <span className="color-grey"> ·</span>
                <span className="color-grey"> {new Date(item.date).toLocaleString()}</span>
                </div>
                {item.content} 
              </div>
            </div>
          ))}
        </div>
      </div>
      </React.Fragment>
    );
}

export default CommentBody;