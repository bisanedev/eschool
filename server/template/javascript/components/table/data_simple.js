import React from 'react';

function DataSimple(props) {     
    return (        
        <div className="wrapDataSimple bg-white tc br2">
            {props.link ?
            <a className="pa2 flex items-center justify-center bg-primary relative dataInfo link pointer" href={props.href} style={props.style}>
                <span className="f4 white">{props.title}</span>   
                <div className="absolute pa1 top-0 right-0">                
                    <i className="material-icons-outlined" style={{fontSize:"25px",color:"white"}}>folder_open</i>
                </div>
            </a>
            :
            <div className="pa2 flex items-center justify-center bg-primary relative dataInfo link flex-column" style={props.style}>
                <span className="f4 white">{props.title}</span>               
                <span className="f6 white">{props.subtitle}</span>  
            </div>
            }
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
                    <button type="button" onClick={() => props.onEdit()} style={{cursor: "pointer",border:"1px solid rgba(0,0,0,.125)"}} className="ml1 link dim pa2 dib primary bg-light-gray">
                        <i className="material-icons" style={{fontSize:"18px"}}>edit</i> 
                    </button>
                    <button type="button" onClick={() => props.onDelete()} style={{cursor: "pointer",border:"1px solid rgba(0,0,0,.125)"}} className="ml1 link dim pa2 dib red bg-light-gray">
                        <i className="material-icons-sharp" style={{fontSize:"18px"}}>delete</i>
                    </button>
                </div>                
            </div>
        </div>        
    );
}

export default DataSimple;