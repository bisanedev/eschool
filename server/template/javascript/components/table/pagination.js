import React from 'react';

function Pagination(props) { 
        
    const halaman = Array(props.pages).fill(1).map((x, y) => x + y);
    const last = props.pages - props.pageSize;
    const iStart = props.current <= last ? props.current-1:last;
    const iEnd = props.current > last ? props.pages:iStart + props.pageSize;

    return (
    <div className="dib overflow-hidden ba br2 bg-white" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
    {props.disable ?  
    <nav className="cf">
        <span className="fl dib moon-gray pa2" style={{borderRight:"1px solid rgba(0, 0, 0, 0.125)"}}>
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>first_page</i>
        </span>
        <span className="fl dib moon-gray pa2">
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>navigate_before</i>            
        </span>
        <span className="fr moon-gray pa2" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>            
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>last_page</i>                 
        </span>
        <span className="fr moon-gray pa2" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>            
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>navigate_next</i>                  
        </span>
    </nav>
    :<nav className="cf">
        {props.current === 1 ?
        <>
        <span className="fl dib moon-gray pa2" style={{borderRight:"1px solid rgba(0, 0, 0, 0.125)"}}>            
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>first_page</i>
        </span>
        <span className="fl dib moon-gray pa2">            
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>navigate_before</i>
        </span>
        </>
        :
        <>
        <span onClick={() => props.pilihPage(1)} className="fl dib link dim gray pa2 pointer" style={{borderRight:"1px solid rgba(0, 0, 0, 0.125)"}}>            
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>first_page</i>
        </span>
        <span onClick={() => props.pilihPage(props.current-1)} className="fl dib link dim gray pa2 pointer">            
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>navigate_before</i>
        </span>
        </>
        } 
        {props.current === props.pages ?
        <>
        <span className="fr moon-gray pa2" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>              
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>last_page</i>              
        </span>
        <span className="fr moon-gray pa2" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>            
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>navigate_next</i>             
        </span>
        </>
        :
        <>
        <span onClick={() => props.pilihPage(props.pages)} className="fr dib link dim gray pa2 pointer" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>              
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>last_page</i>                
        </span>
        <span onClick={() => props.pilihPage(props.current+1)} className="fr dib link dim gray pa2 pointer" style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>            
            <i className="material-icons-outlined" style={{fontSize:"18px"}}>navigate_next</i>              
        </span>
        </>
        }        
        <div className="overflow-hidden center dt tc">         
        {halaman.slice(iStart,iEnd).map((val, i) => 
        <span key={i} onClick={() => props.pilihPage(val)} className={props.current === val ? "dtc link primary pv2 ph3":"dtc link dim pointer gray pv2 ph3"} style={{borderLeft:"1px solid rgba(0, 0, 0, 0.125)"}}>
        {val}
        </span>
        )}        
        </div>
      </nav>
    }
    </div>
    );
}

export default Pagination;