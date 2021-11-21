import React from 'react';

function MenuText(props) {
    return (
    <div className="wrapCard">
        <div className="bg-white tc br2 menuText" style={props.style}>
            <a className="link relative" href={"#"+props.url} style={{color:props.color}}>
                <span className="title pt1">{props.title}</span>
                <span className="subtitle pt1">{props.subtitle}</span>
                <div className="absolute pa1 top-0 right-0">                
                    <i className="material-icons" style={{fontSize:"25px"}}>folder_open</i>
                </div>
            </a>          
        </div>
    </div>
    );
}

export default MenuText;