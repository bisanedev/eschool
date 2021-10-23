import React from 'react';

function Body(props) {
    return (
        <div className="flex flex-wrap pa3">
          {props.children}           
        </div>
    );
}

export default Body;