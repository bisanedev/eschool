import React from "react";
import { toJpeg } from 'html-to-image';
import MathView from 'react-math-view';

function PilihanMath(props) { 
    const {checked, value, onChange, onChecked,onRemove,disRem} = props;
    const [mathValue,SetMathValue] = React.useState("x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}");
    const captureRef = React.useRef(null); 
    const ref = React.useRef(null);   

    const getCapture = async () => {
       var capture = await toJpeg(captureRef.current, {
            quality: 1,
            pixelRatio: 1,
            canvasWidth:320, 
            canvasHeight:120,
            backgroundColor:"#fff"
        });
        onChange(capture);
    }

    return (
    <div className="flex flex-column w-100 mb3" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
        <div className="flex justify-between items-center bg-white">
            <label className="checkbox-container ml1">&nbsp;
                <input type="checkbox" checked={checked} onChange={onChecked}/>
                <span className="checkmark"></span>
            </label>
            <span>Jawaban Math</span>
            {disRem ? 
            <span className="pa1 bg-moon-gray"><i className="material-icons gray" style={{fontSize:"20px"}}>close</i></span>
            :
            <span className="dim pointer pa1 bg-red" onClick={onRemove}><i className="material-icons white" style={{fontSize:"20px"}}>close</i></span>
            }            
        </div>
        {value != "" && (
        <div className="relative">
          <div className="link dim deleteFotoJawaban flex justify-center items-center" onClick={() => {onChange("");}}>Ganti foto<i className="material-icons-outlined" style={{fontSize: "14px"}}>close</i></div>
          <img src={value} style={{width:"100%",height:"100%"}}/>
        </div>
        )}
        {value === "" && (
        <>        
            <div ref={captureRef} className="mathWidth" style={{fontSize:"32px"}}> 
                <MathView ref={ref} value={mathValue}
                    onFocus={() => {
                        ref.current.executeCommand('showVirtualKeyboard');
                    }}
                    onBlur={() => {        
                        ref.current.executeCommand('hideVirtualKeyboard');
                    }} 
                    onContentDidChange={() => {SetMathValue(ref.current.getValue('latex'))}}    
                />                                    
            </div>
            <div className="flex justify-center items-center ma2">
                <button className="w-30 pointer link dim br2 ba pa2 dib bg-white flex justify-center items-center" style={{height:"25px",fontSize:"12px", marginRight:"auto"}} onClick={() => ref.current.executeCommand('showVirtualKeyboard')}><i className="material-icons-outlined mr1" style={{fontSize: "14px"}}>keyboard</i> Buka Virtual Keyboard</button>            
                <button className="w-30 pointer link dim br2 ba pa2 dib bg-white flex justify-center items-center" style={{height:"25px",marginLeft:"auto",fontSize:"12px"}} onClick={() => {getCapture();}}><i className="material-icons-outlined mr1" style={{fontSize: "14px"}}>camera</i> Tangkap Gambar</button>
            </div>
        </>
        )}
    </div>
    );  
}

export default PilihanMath;