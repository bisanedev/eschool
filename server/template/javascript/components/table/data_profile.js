import React from 'react';

function DataProfile(props) {
    let foto = <img src={"data/users/"+props.data.username+".jpg?nocache="+Date.now()} onError={(e)=>{e.target.onerror = null; e.target.src=props.data.jenis==="pria" ? "assets/images/cowok.png":"assets/images/cewek.png"}} />;     
    return (        
        <div className="wrapDataProfile bg-white tc br2">
            <div className="foto">
                {foto}
            </div>            
            <a className="menu dim" href={props.href}>
                <span className="nama">{props.data.nama}</span>
                <span className="info">{props.children}</span>                               
            </a>
            {props.data.id != 1 &&
            <label className="checkbox-profile">            
                <input type="checkbox" checked={props.checked} onChange={props.onChecked}/>
                <span className="checkmark"></span>
            </label> 
            }
                       
        </div>        
    );
}

export default DataProfile;