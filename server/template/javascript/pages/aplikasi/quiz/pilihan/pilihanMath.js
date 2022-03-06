import React from "react";
import MathView from "react-math-view";

function PilihanMath(props) { 
    const {checked, value , onChange, onChecked,onRemove,disRem} = props;
    const ref = React.useRef(null);   

    return (
    <div className={"flex flex-column w-100 mb3 " + (props.errorPilihan ? "error":"")} style={{border:"1px solid rgba(0, 0, 0, 0.125)",backgroundColor:"white"}}>
        <div className="flex justify-between items-center bg-white">
            <label className="checkbox-container ml1">&nbsp;
                <input type="checkbox" checked={checked} onChange={onChecked}/>                
                <span className={"checkmark " + (props.errorCheck ? "error":"")}></span>
            </label>
            <span>Jawaban Math</span>
            {disRem ? 
            <span className="pa1 bg-moon-gray"><i className="material-icons gray" style={{fontSize:"20px"}}>close</i></span>
            :
            <span className="dim pointer pa1 bg-red" onClick={onRemove}><i className="material-icons white" style={{fontSize:"20px"}}>close</i></span>
            }            
        </div>
        <div className="mathWidth"> 
            <MathView ref={ref} value={value}
                onFocus={() => {
                    ref.current.executeCommand('showVirtualKeyboard');
                }}
                onBlur={() => {        
                    ref.current.executeCommand('hideVirtualKeyboard');
                }} 
                onContentDidChange={() => {onChange(ref.current.getValue('latex'))}}    
            />                                    
        </div>
        <div className="flex justify-center items-center ma1">
        <button className="w-30 pointer link dim br2 ba pa2 dib bg-white flex justify-center items-center" style={{height:"22px",fontSize:"12px", marginLeft:"auto"}} onClick={() => ref.current.executeCommand('showVirtualKeyboard')}><i className="material-icons-outlined mr1" style={{fontSize: "14px"}}>keyboard</i> Buka Virtual Keyboard</button>                            
        </div>        
    </div>
    );  
}

export default PilihanMath;