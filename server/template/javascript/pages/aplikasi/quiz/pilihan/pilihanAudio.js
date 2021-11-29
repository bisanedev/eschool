import React, { useState } from "react";

function PilihanAudio(props) {
    const {checked, value, onChange, onChecked,onRemove} = props;    

    const onSelectFileAudio = (e) => {  
        if (e.target.files && e.target.files.length > 0) {  
          const reader = new FileReader();   
          reader.addEventListener('load', () => {                      
            onChange(reader.result);
          });
          reader.readAsDataURL(e.target.files[0]);               
        }
    };

    return (
    <div className="flex flex-column w-100 mb3" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
        <div className="flex justify-between items-center bg-white">
            <label className="checkbox-container ml1">&nbsp;
                <input type="checkbox" checked={checked} onChange={onChecked}/>
                <span className="checkmark"></span>
            </label>
            <span>Jawaban Audio</span>
            <span className="dim pointer pa1 bg-red" onClick={onRemove}>
                <i className="material-icons white" style={{fontSize:"20px"}}>close</i>
            </span>            
        </div>          
        <div className="flex justify-between items-center ph2 bg-white">
         <input className="link pv2" type="file" accept="audio/mp3" onChange={(e) => onSelectFileAudio(e)}/>
         <button type="submit" className="pointer link dim br2 ba pa2 dib bg-white" style={{height:"35px"}} onClick={() => onChange("")}>Reset</button>
        </div>        
        {value != "" && (<audio controls  className="bg-primary w-100" src={value}/>)}
    </div>
    ); 
}

export default PilihanAudio;