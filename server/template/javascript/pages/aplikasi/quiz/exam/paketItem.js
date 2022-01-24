import React from 'react';

function PaketItem(props) {     
    return (        
        <div className="wrapDataPaket bg-white tc br2" style={{width: "47%"}}>
            <div className="dataHeader ph2 justify-between" style={{borderBottom:"1px solid rgba(0, 0, 0, 0.125)"}}>
                <span className="f5">{props.nama}</span>
                <span className="f7">{props.acak ? "Diacak":"Tidak diacak"}</span>
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
                <div className="pv1">
                    <label className="checkbox-container" style={{width:120}}>Pilih paket 
                        <input type="checkbox" checked={props.checked} onChange={props.onChecked}/>
                        <span className="checkmark"></span>
                    </label>                       
                </div>    
            </div>
        </div>        
    );
}

export default PaketItem;