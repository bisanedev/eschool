import React from "react";

function PilihanAudio(props) {
    const {checked, value, url, onChange, onChecked,onRemove,disRem} = props;    

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
            {disRem ? 
            <span className="pa1 bg-moon-gray"><i className="material-icons gray" style={{fontSize:"20px"}}>close</i></span>
            :
            <span className="dim pointer pa1 bg-red" onClick={onRemove}><i className="material-icons white" style={{fontSize:"20px"}}>close</i></span>
            }           
        </div>          
        <div className="flex justify-between items-center ph2 bg-white">
         <input className="link pv2" type="file" accept="audio/mp3" onChange={(e) => onSelectFileAudio(e)}/>         
        </div>
        {url != "" && value === "" && (<audio controls className="bg-primary w-100" src={url}/>) }
        {value != "" && (<audio controls className="bg-primary w-100" src={value}/>)}
    </div>
    ); 
}

export default PilihanAudio;