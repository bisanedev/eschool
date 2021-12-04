import React from 'react';

function MenuText(props) {
    return (
    <div className="wrapCard">
        <div className="bg-white tc br2 menuText" style={props.style}>
            <a className="link relative dim" href={"#"+props.url} style={{color:props.color}}>
                <span className="title pt1">{props.title}</span>
                <span className="subtitle pt1">{props.subtitle}</span>
                <div className="absolute pa1 top-0 right-0">                
                    <i className="material-icons" style={{fontSize:"25px"}}>folder_open</i>
                </div>
                <div className="absolute pa1 bottom-0 right-0 jumlah">                
                    Jumlah soal {props.jumlah}
                </div>
            </a>          
        </div>
    </div>
    );
}

export default MenuText;