import React from 'react';

function Body(props) {
    return props.column ? (
    <div className="flex flex-column pa3" style={{minHeight:"404px"}}>
      {props.children}           
    </div>
    ):(
    <div className="flex flex-wrap pa3" style={{minHeight:"404px"}}>
      {props.children}           
    </div>
    );    
}

export default Body;