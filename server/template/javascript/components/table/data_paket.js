import React from 'react';
import { Link } from "react-router-dom";

function DataPaket(props) {     
    return (        
        <div className="wrapDataPaket bg-white tc br2">
            <div className="dataHeader ph2 bg-primary justify-between">
                <span className="f5 white">{props.nama}</span>
                <span className="f7 white">{props.acak ? "Diacak":"Tidak diacak"}</span>
            </div>
            <div className="dataBody flex justify-center">
                <div className="w-50 flex flex-column justify-center">
                    <span className="f6 b">Pilihan ganda</span>
                    <span className="f7">Soal {props.countPilihan} butir</span>
                    <span className="f7">Bobot soal {props.bobotPilihan}% </span>
                </div>
                <div className="w-50 flex flex-column justify-center">
                    <span className="f6 b">Essay</span>    
                    <span className="f7">Soal {props.countEssay} butir</span> 
                    <span className="f7">Bobot soal {props.bobotEssay}% </span> 
                </div>               
            </div>
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
                    <Link to={props.onEdit} style={{border:"1px solid rgba(0,0,0,.125)"}} className="pointer link dim pa1 dib primary bg-light-gray">
                        <i className="material-icons" style={{fontSize:"16px"}}>edit</i>
                    </Link>
                    <button type="button" onClick={() => props.onDelete()} style={{border:"1px solid rgba(0,0,0,.125)"}} className="pointer ml1 link dim pa1 dib red bg-light-gray">
                        <i className="material-icons-sharp" style={{fontSize:"16px"}}>delete</i>
                    </button>
                </div>                
            </div>
        </div>        
    );
}

export default DataPaket;