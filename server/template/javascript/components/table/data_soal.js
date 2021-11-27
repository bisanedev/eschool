import React from 'react';
import {decode} from 'html-entities';

function DataSoal(props) {  
    return (  
    <div className="tableCell bg-white br2 flex">      
     <div className="w-pertanyaan pa2 flex items-center">
        <label className="checkbox-container">&nbsp;
            <input type="checkbox" checked={props.checked} onChange={props.onChecked}/>
            <span className="checkmark"></span>
        </label>
        <div className="ml1 htmlText" style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",height:"18px"}} dangerouslySetInnerHTML={{ __html: decode(props.text, {level: 'html5'}) }}/>
     </div>
     <div className="w-aksi flex justify-center items-center">
        <button type="button" onClick={() => props.onView()} style={{border:"1px solid rgba(0,0,0,.125)",height:"40px"}} className="pointer ml1 link dim pa2 dib primary bg-light-gray">
            <i className="material-icons" style={{fontSize:"18px"}}>preview</i> 
        </button>
        <a type="button" href={props.linkEdit} style={{border:"1px solid rgba(0,0,0,.125)",height:"40px"}} className="pointer ml1 link dim pa2 dib primary bg-light-gray">
            <i className="material-icons" style={{fontSize:"18px"}}>edit</i> 
        </a>
        <button type="button" onClick={() => props.onDelete()} style={{border:"1px solid rgba(0,0,0,.125)",height:"40px"}} className="pointer ml1 link dim pa2 dib red bg-light-gray">
            <i className="material-icons-sharp" style={{fontSize:"18px"}}>delete</i>
        </button>
     </div> 
    </div>
    );
}

export default DataSoal;