import React from 'react';

function DataPaket(props) {     
    return (        
        <div className="wrapDataSimple bg-white tc br2">
            <div className="pa2 flex items-center justify-center bg-primary relative dataInfo link flex-column" style={props.style}>
                <span className="f4 white">{props.title}</span>                
            </div>
            <div className="h2 flex pa2 dataAction">
                <div className="w-50">                    
                    <div className="pv2">
                    <label className="checkbox-container">Pilih
                        <input type="checkbox" checked={props.checked} onChange={props.onChecked}/>
                        <span className="checkmark"></span>
                    </label>                       
                    </div>                    
                </div>                
                <div className="flex w-50" style={{justifyContent:"flex-end"}}>
                    <a  href={props.onEdit} style={{border:"1px solid rgba(0,0,0,.125)"}} className="pointer ml1 link dim pa2 dib primary bg-light-gray">
                        <i className="material-icons" style={{fontSize:"18px"}}>edit</i> 
                    </a>
                    <button type="button" onClick={() => props.onDelete()} style={{border:"1px solid rgba(0,0,0,.125)"}} className="pointer ml1 link dim pa2 dib red bg-light-gray">
                        <i className="material-icons-sharp" style={{fontSize:"18px"}}>delete</i>
                    </button>
                </div>                
            </div>
        </div>        
    );
}

export default DataPaket;