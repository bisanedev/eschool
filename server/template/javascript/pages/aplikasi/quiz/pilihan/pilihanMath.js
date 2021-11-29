import React from "react";

function PilihanMath(props) { 
    const {checked, value, onChange, onChecked,onRemove} = props; 
    return (
    <div className="flex flex-column w-100 mb3" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
        <div className="flex justify-between items-center bg-white">
            <label className="checkbox-container ml1">&nbsp;
                <input type="checkbox" checked={checked} onChange={onChecked}/>
                <span className="checkmark"></span>
            </label>
            <span>Jawaban Math</span>
            <span className="dim pointer pa1 bg-red" onClick={onRemove}>
                <i className="material-icons white" style={{fontSize:"20px"}}>close</i>
            </span>            
        </div>
    </div>
    );  
}

export default PilihanMath;