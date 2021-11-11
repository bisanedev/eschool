import React from 'react';

function DataProfile(props) {
    let foto = <img src={props.src} onError={(e)=>{e.target.onerror = null; e.target.src=props.data.jenis==="l" ? "assets/images/cowok.png":"assets/images/cewek.png"}} />;     
    return (        
        <div className="wrapDataProfile bg-white tc br2">
            <div className="foto">
                {foto}
            </div>            
            <a className="menu dim" href={props.href}>
                <span className="nama">{props.data.nama}</span>
                <span className="info">{props.children}</span>                               
            </a>
            {!props.superuser &&
            <>
            <label className="checkbox-profile">            
                <input type="checkbox" checked={props.checked} onChange={props.onChecked}/>
                <span className="checkmark"></span>
            </label>
            <div onClick={() => props.onDelete()} className="link dim deleteButton  flex justify-center items-center">
                <i className="material-icons-outlined" style={{fontSize:"14px"}}>close</i>
            </div>
            </>
            }
            {props.noAbsen && 
            <div className="nomorAbsen">{props.noAbsen}</div>
            }
                       
        </div>        
    );
}

export default DataProfile;