import React from 'react';

function DataSoal(props) {  
    return (  
    <div className="tableCell bg-white tc br2 flex">      
     <div className="w-90 pa2 flex items-center">
        <label className="checkbox-container">{props.nomor}.
            <input type="checkbox" checked={props.checked} onChange={props.onChecked}/>
            <span className="checkmark"></span>
        </label>
        <div className="ml2" style={{overflow:"hidden",display:"inline-block",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
        {props.text}
        </div>        
     </div>
     <div className="w-10 flex justify-center items-center">
        <button type="button" onClick={() => props.onEdit()} style={{cursor: "pointer",border:"1px solid rgba(0,0,0,.125)",height:"40px"}} className="ml1 link dim pa2 dib primary bg-light-gray">
            <i className="material-icons" style={{fontSize:"18px"}}>edit</i> 
        </button>
        <button type="button" onClick={() => props.onDelete()} style={{cursor: "pointer",border:"1px solid rgba(0,0,0,.125)",height:"40px"}} className="ml1 link dim pa2 dib red bg-light-gray">
            <i className="material-icons-sharp" style={{fontSize:"18px"}}>delete</i>
        </button>
     </div> 
    </div>
    );
}

export default DataSoal;