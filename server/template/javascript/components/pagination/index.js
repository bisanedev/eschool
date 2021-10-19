import React from 'react';

function Pagination(props) {
    return (
    <div className="dib overflow-hidden ba br2 bg-white" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
      <nav className="cf" data-name="pagination-numbers-bordered">
        <a className="fl dib link dim gray pa2 " href="#" style={{borderRight:"1px solid rgba(0, 0, 0, 0.125)"}}>
            <i className="fas fa-angle-double-left" style={{fontSize:"14px"}}/> 
        </a>
        <a className="fl dib link dim gray pa2 " href="#">
            <i className="fas fa-angle-left" style={{fontSize:"14px"}}/> 
        </a>
        <a className="fr dib link dim gray pa2" href="#" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>
            <i className="fas fa-angle-double-right" style={{fontSize:"14px"}}/>                   
        </a>
        <a className="fr dib link dim gray pa2" href="#" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>
            <i className="fas fa-angle-right" style={{fontSize:"14px"}}/>                   
        </a>
        <div className="overflow-hidden center dt tc">
            <a className="dtc link dim primary pa2" href="#" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>1</a>
            <a className="dtc link dim gray pa2" href="#" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>2</a>
            <a className="dtc link dim gray pa2" href="#" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>3</a>
            <a className="dtc link dim gray pa2" href="#" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>4</a>
            <a className="dtc link dim gray pa2" href="#" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>5</a>
        </div>
      </nav>
    </div>
    );
}

export default Pagination;