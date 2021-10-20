import React from 'react';

function TableBody(props) {
    return (
        <div className="flex flex-wrap pa3">
          {props.children}           
        </div>
    );
}

export default TableBody;