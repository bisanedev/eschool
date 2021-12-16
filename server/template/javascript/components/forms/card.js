import React from 'react';

function Cards(props) {
    return (
    <div className={`${props.custom === undefined ? "":props.custom} bg-white mr2 br2 mb2`} style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
      <div className="pa3 bg-primary white">
          <span className="f4">{props.title}</span>
      </div>
      <div className={props.bodyClass}>
          {props.children}
      </div>
    </div>
    );
}

export default Cards;