import React from 'react';
import { Link } from "react-router-dom";

function Breadcrumb(props) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">                
        <li>
          <Link to={props.homeUrl}>                    
            <span>{props.homeText}</span>          
          </Link>
        </li>
        {props.children}                 
      </ol>   
    </nav>
  );
}

export default Breadcrumb;