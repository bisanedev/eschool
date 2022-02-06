import React from 'react';
import {decode} from 'html-entities';
import MathView from 'react-math-view';

function SoalSelected(props) {  
    return (  
        <div className="wrapPaketSoal bg-white" style={{width:"100%",marginRight:0}}>      
        <div className="pertanyaaan" dangerouslySetInnerHTML={{ __html: decode(props.text, {level: 'html5'}) }}/>
        <div onClick={() => props.onDelete()} className="link dim deleteButton flex justify-center items-center">
           <i className="material-icons-outlined" style={{fontSize:"14px"}}>close</i>
        </div>
        <div className="pertanyaaanOpsional flex justify-center items-center">
            {props.dataValue.pertanyaan_tex === "" ? 
            <span className="mr1 link br2 pa1 dib disable-primary bg-disableSecondary" style={{fontSize: "13px"}}>Math</span>
            :
            <div className="popover_wrapper">
            <span className="pointer mr1 link dim br2 ba pa1 dib white bg-primary" style={{fontSize: "13px"}}>Math</span>
            <div className="popover_content flex justify-center items-center">    
               <MathView value={props.dataValue.pertanyaan_tex} readOnly={true} style={{ userSelect: 'none' }}/>                       
            </div>
            </div>
            } 
            {props.dataValue.pertanyaan_images === "" ? 
            <span className="mr1 link br2 pa1 dib disable-primary bg-disableSecondary" style={{fontSize: "13px"}}>Gambar</span>
            :
            <div className="popover_wrapper">                
            <span className="pointer mr1 link dim br2 ba pa1 dib white bg-primary" style={{fontSize: "13px"}}>Gambar</span>
            <div className="popover_content flex justify-center items-center">            
                <img src={props.linkImages}/>                
            </div>
            </div>
            }
            {props.dataValue.pertanyaan_audio === "" ? 
            <span className="mr1 link br2 pa1 dib disable-primary bg-disableSecondary" style={{fontSize: "13px"}}>Audio</span>
            :
            <div className="popover_wrapper">                                
            <span className="pointer mr1 link dim br2 ba pa1 dib white bg-primary" style={{fontSize: "13px"}}>Audio</span>
            <div className="popover_content flex justify-center items-center" style={{transform:"translate(0, -85px)",height:"60px"}}>                        
            <audio controls className="w-100" style={{height:30}} src={props.linkAudio}/>
            </div>
            </div>
            }                      
        </div>
    </div>
    );
}

export default SoalSelected;