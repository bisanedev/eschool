import React from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import { Helmet } from 'react-helmet';
import { Cards } from '../../../components/forms';
import {Breadcrumb} from '../../../components/menu';
import { ToastContainer, toast } from 'react-toastify';


class PageProfileFoto extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      src: "",
      croppedImageUrl:"",      
      errorSelect:"",      
      uploadProgress:false,
      uploadDisable:true,           
    }  
    this.cropper = React.createRef();
    this.navigate = this.props.navigate;  
  }

  componentDidMount() {
        
  }

  render() {    
    const { croppedImageUrl, src ,errorSelect,uploadProgress,uploadDisable } = this.state; 
    const uploadClass = uploadProgress ? "progress-active":"";
    const uploadAction = croppedImageUrl ? "w-100 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary":"w-100 tc b f7 link br2 ba ph3 pv2 dib disable-primary bg-disableSecondary"
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
          </Breadcrumb>    
        </div>
        <div className="mw9 center cf ph3 mb3">
          <Cards title="Pilih foto dan bingkai Anda" bodyClass="pa3">
            <div className="flex">
              <div className="w-70 pa3 flex justify-center flex-column">
              <input className="tc f7 link br2 ba ph3 pv2 dib black bg-light-gray ba b--light-silver mb3" type="file" accept="image/*" onChange={this.onSelectFile}/>
                {src != null && src != "" && (
                  <Cropper
                      src={src}
                      style={{ height: 500, width: "100%" }}                      
                      initialAspectRatio={3 / 4}
                      minCropBoxWidth={255}    
                      minCropBoxHeight={330}
                      guides={false}
                      crop={this._crop.bind(this)}
                      onInitialized={this.onCropperInit.bind(this)} 
                      ref={this.cropper}
                      cropBoxResizable={false}
                      dragMode={'move'}                     
                  />
                )}
                {src === null && (
                  <h5 className="p-5" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{errorSelect}</h5>
                )}                
              </div>
              <div className="w-30 pa3">                
                {croppedImageUrl && ( 
                  <div className="mb3 pa2" style={{border:"3px dashed rgba(0, 0, 0, 0.125)"}}>
                    <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} /> 
                  </div>                                 
                )}
                <button type="button" className={`${uploadClass} ${uploadAction}`} disabled={uploadDisable} onClick={this.uploadImages} style={{cursor:"pointer"}}>Upload foto</button>
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
  _crop = () => {         
    const foto = this.cropper.getCroppedCanvas({
      width: 354,
      height: 472,
      fillColor: '#fff',
      imageSmoothingEnabled: true,
      imageSmoothingQuality: 'high',
    }).toDataURL(); 
    this.setState({croppedImageUrl:foto,uploadDisable:false});
  }

  onCropperInit = (cropper) => {
    this.cropper = cropper;
  }

  b64toBlob(dataURI) {    
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  }
  // -----------------------
  uploadImages = () => {    
    console.log("klik");
    const { croppedImageUrl } = this.state;
    var blobFile = this.b64toBlob(croppedImageUrl);    
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
        this.navigate('/profile');
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

  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];     
    this.navigate("/", { replace: true });
  }
  // ---------------------------- end of script
}

export default PageProfileFoto;