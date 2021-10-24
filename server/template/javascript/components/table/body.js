import React from 'react';

function Body(props) {
    return (
        <div className="flex flex-wrap pa3" style={{minHeight:"404px"}}>
          {props.children}           
        </div>
    );
}

export default Body;