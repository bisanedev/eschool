import React from 'react';
import { Link } from "react-router-dom";

function MenuCard(props) {
  return (
    <div className="wrapCard">
        <div className="bg-white tc pa3 cardMenu br2" style={props.style}>   
            <Link className="linkMenu" to={props.url}>            
              <img src={props.icon}/>
              <span className="pt1">{props.text}</span>            
            </Link>
        </div>
    </div>
  );
}

export default MenuCard;