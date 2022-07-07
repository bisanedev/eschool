import React from 'react';
import { Link } from "react-router-dom";

function DataSimple(props) {     
    return (        
        <div className="wrapDataSimple bg-white tc br2">
            {props.link ?
            <Link className="pa2 flex items-center justify-center bg-primary relative dataInfo link pointer" style={props.style} to={props.href}>
                <span className="f4 white">{props.title}</span>   
                <div className="absolute pa1 top-0 right-0">                
                <i className="material-icons-outlined" style={{fontSize:"25px",color:"white"}}>folder_open</i>
                </div>
            </Link>
            :
            <div className="pa2 flex items-center justify-center bg-primary relative dataInfo link flex-column" style={props.style}>
                <span className="f4 white">{props.title}</span>               
                <span className="f6 white">{props.subtitle}</span>  
            </div>
            }
            <div className="h2 flex pa1 dataAction">
                <div className="w-50">                    
                    <div className="pv1">
                    <label className="checkbox-container" style={{width:78}}>Pilih
                        <input type="checkbox" checked={props.checked} onChange={props.onChecked}/>
                        <span className="checkmark"></span>
                    </label>                       
                    </div>                    
                </div>                
                <div className="flex w-50" style={{justifyContent:"flex-end"}}>
                    <button type="button" onClick={() => props.onEdit()} style={{border:"1px solid rgba(0,0,0,.125)"}} className="pointer link dim pa1 dib primary bg-light-gray">
                        <i className="material-icons" style={{fontSize:"16px"}}>edit</i> 
                    </button>
                    <button type="button" onClick={() => props.onDelete()} style={{border:"1px solid rgba(0,0,0,.125)"}} className="pointer ml1 link dim pa1 dib red bg-light-gray">
                        <i className="material-icons-sharp" style={{fontSize:"16px"}}>delete</i>
                    </button>
                </div>                
            </div>
        </div>        
    );
}

export default DataSimple;