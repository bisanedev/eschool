import React from 'react';

function Footer(props) {
    return (
        <div className="flex items-center bg-near-white" style={{borderTop:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>
          {props.children}           
        </div>
    );
}

export default Footer;