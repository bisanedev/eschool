import React from 'react';

function TableCell(props) { 
    return (
        <>
        <div className="wrapDataCell bg-white tc cardMenu br2">
            <div className="pa2 flex items-center justify-center bg-primary relative dataInfo" style={{cursor:"pointer"}}>
                <span className="f3 white">{props.data.nama}</span>   
                <div className="absolute pa1 top-0 right-0">
                    <i className="fas fa-folder-open" style={{fontSize:"18px",color:"white"}}/>                 
                </div>
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
                    <button type="button" style={{cursor: "pointer",border:"1px solid rgba(0,0,0,.125)"}} className="ml1 link dim pa2 dib primary bg-light-gray">
                        <i className="fas fa-pen" style={{fontSize:"14px"}}/> 
                    </button>
                    <button type="button" onClick={() => props.onDelete()} style={{cursor: "pointer",border:"1px solid rgba(0,0,0,.125)"}} className="ml1 link dim pa2 dib red bg-light-gray">
                        <i className="fas fa-trash" style={{fontSize:"14px"}}/>
                    </button>
                </div>                
            </div>
        </div>
        </>
    );
}

export default TableCell;