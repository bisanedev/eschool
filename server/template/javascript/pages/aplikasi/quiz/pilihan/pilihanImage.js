import React, { useRef,useState } from "react";
import Cropper from "react-cropper";

function PilihanImage(props) {    
    const {checked, url, onChange, onChecked,onRemove,disRem} = props; 
    const cropperRef = useRef(null);      
    const [errorSelect, setErrorSelect] = useState(""); 
    const [src , setSrc] = useState("");

    const onCrop = () => {
        const imageElement = cropperRef.current;
        const cropper = imageElement.cropper;
        const foto = cropper.getCroppedCanvas({
            width: 400,
            height: 280,
            fillColor: '#fff',
            imageSmoothingEnabled: false,
            imageSmoothingQuality: 'high',
        }).toDataURL();             
        onChange(foto);
    }; 
        
    const onSelectFile = (e) => {        
        if (e.target.files && e.target.files.length > 0) {      
          const reader = new FileReader();   
          reader.addEventListener('load', () => {        
            var image = new Image();        
            image.src = reader.result;   
            image.addEventListener('load', function () {
              var height = this.height;
              var width = this.width;                 
              if (height >= 125 && width >= 250) {                            
                setSrc(reader.result);
              }else{ 
                setErrorSelect("Gambar foto dimensi minimal height 125px , width 250px");                  
                setSrc(null);                 
              }
            });        
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
            <span>Jawaban Gambar</span>
            {disRem ? 
            <span className="pa1 bg-moon-gray"><i className="material-icons gray" style={{fontSize:"20px"}}>close</i></span>
            :
            <span className="dim pointer pa1 bg-red" onClick={onRemove}><i className="material-icons white" style={{fontSize:"20px"}}>close</i></span>
            } 
        </div>        
        <div className="flex justify-between items-center ph2 bg-white">
            <input className="link pv2" type="file" accept="image/*" onChange={(e) => onSelectFile(e)}/>            
        </div>        
        {src === "" && url != "" && ( <img src={url} style={{width:"100%",height:"100%"}} />)}
        {src != null && src != "" && (
            <Cropper src={src} style={{ height: 250, width: "100%" }} initialAspectRatio={4 / 3} guides={false} minCropBoxWidth={600} minCropBoxHeight={430} crop={onCrop} ref={cropperRef} cropBoxResizable={false} dragMode={'move'} />
        )}
        {src === null && (
            <h5 className="p-5" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{errorSelect}</h5>
        )}
    </div>
    );
}

export default PilihanImage;