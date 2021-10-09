import React from 'react';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import ReactCrop from 'react-image-crop';
import Breadcrumb from '../../../components/breadcrumb';

class PageProfileFoto extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      croppedImageUrl:"",
      errorSelect:"",
      crop: {
        unit: 'px',        
        aspect: 3 / 4,
        width:260,
        height:320
      }
    }    
  }

  componentDidMount() {     

  }

  render() {
    let foto = <img src={"data/users/"+this.props.tokenData.username+".jpg"} onError={(e)=>{e.target.onerror = null; e.target.src=this.props.tokenData.jenis==="pria" ? "assets/images/cowok.png":"assets/images/cewek.png"}} />;
    const { crop, croppedImageUrl, src ,errorSelect } = this.state;
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Ganti foto - Nama Sekolah</title>
        </Helmet>   
        <div className="headings">
          <div className="title">Ganti foto</div>
          <div className="subtitle">Silahkan untuk mengganti foto profil anda</div>
          <Breadcrumb homeUrl="/profile" homeIcon={<div className="material-icons-outlined">manage_accounts</div>} homeText="Profil">
            <li className="breadcrumb-item" aria-current="page"><a href="#/profile/foto">Foto</a></li>
            <li className="breadcrumb-item active" aria-current="page">Ganti foto</li>
          </Breadcrumb>
        </div>
        <div className="container">                   
          <div className="col-md-12">
            <div className="card p-2">
              <span className="cardTitle mb-3">Pilih foto dan bingkai Anda </span>              
              <div className="row">
              <div className="col-md-9">                
                <input className="form-control mb-3" type="file" accept="image/*" onChange={this.onSelectFile}/>
                {src != null ? (
                  <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    minHeight={320}
                    minWidth={260}                                                                 
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                    onChange={this.onCropChange}
                  />
                ):(<h5 className="p-5" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{errorSelect}</h5>)}
              </div> 
              <div className="col-md-3" style={{display:"flex",flexDirection:"column"}}>
              <button type="button" className="btn btn-primary mb-3" disabled={croppedImageUrl ? false:true}>Upload</button>
              {croppedImageUrl && (                
                <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />                
              )}
              </div>             
              </div>             
            </div>
          </div>
        </div>                    
    </div>
    );
  }
  // ---------------------------- script 
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
            console.log("berhasil");
            wow.setState({ src: reader.result });                                    
          }else{
            console.log("gagal");
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
      this.setState({ croppedImageUrl });
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
          window.URL.revokeObjectURL(this.fileUrl);
          this.fileUrl = window.URL.createObjectURL(blob);
          resolve(this.fileUrl);
        },
        'image/jpeg',
        1
      );
    });
  }

  // ---------------------------- end of script
}

export default withRouter(PageProfileFoto);