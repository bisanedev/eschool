import React from 'react';

function Header(props) {
    return (
        <div className="flex items-center bg-white" style={{borderBottom:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>
          {props.children}           
        </div>
    );
}

export default Header;