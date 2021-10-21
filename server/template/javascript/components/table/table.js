import React from 'react';

function Table(props) {
    return (
        <div className="bg-white mr2 br2 mb2" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
            {props.children}
        </div>
    );
}

export default Table;