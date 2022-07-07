import React from 'react';

function MenuCardDisable(props) {
  return (
    <div className="wrapCard">
    <div className="bg-white tc pa3 cardMenu relative br2" style={props.style}>
            <div className="cardMenuLocked">
                <i className="material-icons" style={{fontSize:"20px"}}>lock</i>                  
            </div>                     
            <div className="linkMenu">
                <img src={props.icon}/>
                <span className="pt1">{props.text}</span>
                <div className="middle">
                    <div className="text pa2">Hanya akses Superuser</div>                    
                </div>
            </div>
        </div>
    </div>
  );
}

export default MenuCardDisable;