import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import ReactCrop from 'react-image-crop';
import { Cards } from '../../../components/forms';
import {Breadcrumb} from '../../../components/menu';
import { ToastContainer, toast } from 'react-toastify';

class PageProfileFoto extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      src: "",
      croppedImageUrl:"",
      blobFile:"",
      errorSelect:"",      
      uploadProgress:false,
      uploadDisable:true,
      crop: {
        unit: 'px',        
        aspect: 3 / 4,
        height:320,
        width:260
      }
    }    
  }

  componentDidMount() {
        
  }

  render() {    
    const { crop, croppedImageUrl, src ,errorSelect,uploadProgress,uploadDisable } = this.state; 
    const uploadClass = uploadProgress ? "progress-active":"";
    const uploadAction = croppedImageUrl ? "w-100 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary mb3":"w-100 tc b f7 link br2 ba ph3 pv2 dib disable-primary bg-disableSecondary mb3"
    return (
    <>
    <div className="konten"> 
        <Helmet>
          <title>Ganti foto - Nama Sekolah</title>
        </Helmet>   
        <div className="headings">
          <div className="title">Ganti foto</div>
          <div className="subtitle">Silahkan untuk mengganti foto profil anda</div>
          <Breadcrumb homeUrl="/profile" homeText="Profil"> 
            <li><a href="#/profile/foto"><span>Foto</span></a></li>            
            <li><a href="#"><span>Ganti foto</span></a></li> 
          </Breadcrumb>    
        </div>
        <div className="mw9 center cf ph3 mb3">
          <Cards title="Pilih foto dan bingkai Anda">
            <div className="flex">
              <div className="w-70 pa3 flex justify-center flex-column">
              <input className="tc f7 link br2 ba ph3 pv2 dib black bg-light-gray ba b--light-silver mb3" type="file" accept="image/*" onChange={this.onSelectFile}/>
                {src != null && src != "" && (
                    <ReactCrop
                      src={src}
                      crop={crop}
                      ruleOfThirds
                      minHeight={300}
                      minWidth={200}                                                                 
                      onImageLoaded={this.onImageLoaded}
                      onComplete={this.onCropComplete}
                      onChange={this.onCropChange}
                    />
                )}
                {src === null && (
                  <h5 className="p-5" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{errorSelect}</h5>
                )}                
              </div>
              <div className="w-30 pa3">
                <button type="button" className={`${uploadClass} ${uploadAction}`} disabled={uploadDisable} onClick={this.uploadImages} style={{cursor:"pointer"}}>Upload</button>
                {croppedImageUrl && ( 
                  <div className="mb3 pa2" style={{border:"3px dashed rgba(0, 0, 0, 0.125)"}}>
                    <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} /> 
                  </div>                                 
                )}
              </div>                            
            </div>  
          </Cards>         
        </div>
    </div>
    <ToastContainer />
    </>
    );
  }
  // ---------------------------- script 

  uploadImages = () => {    
    const { blobFile } = this.state;
    this.setState({uploadProgress:true,uploadDisable:true});
    var formData = new FormData();    
    formData.append('file',blobFile);
    axios({
      method: 'post',
      url: window.location.origin +'/api/pendidik/profile/upload',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      if(response.data.status == true)
      {
        this.props.history.push('/profile');
      }
    }).catch(error => {
      if(error.response.status == 401){
        this.logout();
      }
      if(error.response.status == 400){        
        this.setState({uploadProgress:false,uploadDisable:false},() => toast.warn(error.response.data.message));        
      }
      if(error.message === "Network Error"){ 
        this.setState({uploadProgress:false,uploadDisable:false},() => toast.error("Jaringan internet tidak tersambung"));
      } 
    });
  }
  onSelectFile = (e) => {
    let wow = this; 
    if (e.target.files && e.target.files.length > 0) {      
      const reader = new FileReader();   
      reader.addEventListener('load', () => {        
        var image = new Image();        
        image.src = reader.result;   
        image.addEventListener('load', function () {
          var height = this.height;
          var width = this.width;
          console.log(`height: ${this.height}, width: ${this.width}`);          
          if (height >= 320 && width >= 260) {            
            wow.setState({ src: reader.result });                                    
          }else{            
            wow.setState({ src: null,croppedImageUrl:"",errorSelect:"Gambar foto dimensi minimal 320x260" }); 
          }
        });        
      });
      reader.readAsDataURL(e.target.files[0]);   
    }
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:    
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl:croppedImageUrl,uploadDisable:false });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;    
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');      

    canvas.width = crop.width * pixelRatio * scaleX;
    canvas.height = crop.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY     
    );        

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty');
            return;
          }
          blob.name = fileName;
          this.setState({blobFile:blob});
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        },
        'image/jpeg',
        1
      );
    });    
  }  

  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization']; 
    this.props.history.push('/');
  }
  // ---------------------------- end of script
}

export default withRouter(PageProfileFoto);