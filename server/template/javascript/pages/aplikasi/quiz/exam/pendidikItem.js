import React from 'react';

function PendidikItem(props) {
    let foto = <img src={props.src} onError={(e)=>{e.target.onerror = null; e.target.src=props.data.jenis==="l" ? "assets/images/cowok.png":"assets/images/cewek.png"}} />;     
    return (        
        <div className="wrapDataProfile bg-white tc br2" style={{width:"30%"}}>
            <div className="foto">
                {foto}
            </div>            
            <a className="menu">
                <span className="nama">{props.data.nama}</span>                                            
            </a>
            <label className="checkbox-profile">            
                <input type="checkbox" checked={props.checked} onChange={props.onChecked}/>
                <span className={"checkmark " + (props.errorCheck ? "error":"")}></span>                
            </label>                                
        </div>        
    );
}

export default PendidikItem;