import React from 'react';
import { Link } from "react-router-dom";

function MenuText(props) {
    return (
    <div className="wrapCard">
        <div className="bg-white tc br2 menuText" style={props.style}>
            <Link className="link relative dim" style={{color:props.color}} to={props.url}>             
                <span className="title pt1">{props.title}</span>
                <span className="subtitle pt1">{props.subtitle}</span>
                <div className="absolute pa1 top-0 right-0">                
                    <i className="material-icons" style={{fontSize:"25px"}}>folder_open</i>
                </div>
                <div className="absolute pa1 bottom-0 right-0 jumlah">                
                    {props.jumlah}
                </div>            
            </Link>        
        </div>
    </div>
    );
}

export default MenuText;