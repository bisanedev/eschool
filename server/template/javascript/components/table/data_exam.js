import React from 'react';

function DataExam(props) {     
    let foto = <img src={props.src} onError={(e)=>{e.target.onerror = null; e.target.src=props.data.jenis==="l" ? "assets/images/cowok.png":"assets/images/cewek.png"}} />;
    return (        
        <div className="wrapDataExam bg-white tc br2 flex">
            <div className="user">
                {foto}
                <span className="pendidik_nama ph1 pv1">{props.data.pendidik}</span>
            </div>
            <div className="data">
                {props.nama}
            </div>
        </div>        
    );
}

export default DataExam;