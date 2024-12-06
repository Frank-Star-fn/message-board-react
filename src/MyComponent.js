import React from 'react';

const MyComponent = ({onButtonClick}) => {
    return (
        <React.Fragment>
          <button className="btn-primary mt-2" onClick={onButtonClick}>发表留言</button>
        </React.Fragment>
    );
}

export default MyComponent;