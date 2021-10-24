import React from 'react';

function Body(props) {
    return (
        <div className="flex flex-wrap pa3" style={{minHeight:"310px"}}>
          {props.children}           
        </div>
    );
}

export default Body;