import React from 'react';

function TableData(props) {
    return (
        <div className="flex flex-wrap">
          {props.children}           
        </div>
    );
}

export default TableData;