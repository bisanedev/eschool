import React from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import { Helmet } from 'react-helmet';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import {Breadcrumb} from '../../../../components/menu';
import { InputText,InputMath,Cards } from '../../../../components/forms';
import { ToastContainer, toast } from 'react-toastify';
import { toJpeg,toBlob } from 'html-to-image';

class PageAplikasiQuizPilihanSoalAdd extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tingkatan:null,
      mapel:null,
      semester:null,
      editorState: EditorState.createEmpty(),
      src: "",
      errorSelect:"",
      croppedImageUrl:"",
      srcAudio:"",
      toggleMath:false,
      mathValue:"x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",      
    }
    this.handleInputChange = this.handleInputChange.bind(this);  
    this.tingkatID = this.props.params.tingkatID;
    this.mapelID = this.props.params.mapelID;
    this.semesterID = this.props.params.semesterID;    
    this.navigate = this.props.navigate; 
    this.cropper = React.createRef();   
    this.captureRef = React.createRef();   
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID),300); 
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {     
    const {tingkatan,mapel,semester,src,srcAudio,editorState,errorSelect,uploadProgress,uploadDisable,toggleMath,mathValue} = this.state; 
    const uploadClass = uploadProgress ? "progress-active":"";     
    return (    
    <div className="konten" style={{minHeight:900}}> 
        <Helmet>
            <title>Bank soal - Nama Sekolah</title>
        </Helmet> 
        <div className="headings">    
          <div className="title">Bank Soal</div>
          <div className="subtitle">Data bank soal untuk tingkatan {tingkatan != null ? tingkatan.nama:"memuat..."}, mata pelajaran {mapel != null ? mapel.nama:"memuat..."} dan {semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</div>
          <Breadcrumb homeUrl="/aplikasi" homeText="Aplikasi"> 
            <li><a href="#/aplikasi/quiz"><span>Kuis platform</span></a></li>   
            <li><a href="#/aplikasi/quiz/pilihan"><span>Pilihan ganda</span></a></li>               
            <li><a href={"#/aplikasi/quiz/pilihan/"+this.tingkatID}><span>{tingkatan != null ? tingkatan.nama:"memuat..."}</span></a></li>  
            <li><a href={"#/aplikasi/quiz/pilihan/"+this.tingkatID+"/"+this.mapelID}><span>{mapel != null ? mapel.nama:"memuat..."}</span></a></li>
            <li><a href={"#/aplikasi/quiz/pilihan/"+this.tingkatID+"/"+this.mapelID+"/"+this.semesterID}><span>{semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</span></a></li>            
            <li><a href="#"><span>Menambahkan soal</span></a></li>   
          </Breadcrumb>   
        </div>
        <div className="mw9 center cf ph3 mb3 flex">
          <div className="w-50">
          <Cards title="Menambahkan soal pilihan ganda" bodyClass="flex flex-column">                               
            <div className="w-100 mb3 pa3">
            <label className="f5 fw4 db mb2">Pertanyaan Text</label>
            <Editor
              editorState={editorState} 
              editorClassName="wysiwyg-editor"
              onEditorStateChange={this.onEditorStateChange}              
              toolbar={{
                options: ['inline', 'list','colorPicker','textAlign','emoji', 'remove', 'history'],
              }}
            />
            </div>
            <div className="w-100 mb3 pa3">
                <div className="flex justify-between items-center mb2">
                  <label className="f5 fw4 db">Pertanyaan Gambar (Opsional)</label>
                  <div className="pointer link dim flex items-center" onClick={() => this.setState({toggleMath:!toggleMath})}>
                    {toggleMath ? "Math":"File"} 
                    {toggleMath ? (<i className="material-icons" style={{fontSize:25}}>calculate</i>):(<i className="material-icons" style={{fontSize:25}}>crop_original</i>)}
                  </div>                  
                </div>
                {toggleMath ? ( 
                  <div ref={this.captureRef} className="mathWidth" style={{fontSize:"30px"}}>                 
                    <InputMath value={mathValue} onChange={(value) => this.setState({mathValue:value})} />                         
                  </div>
                ):(
                  <div className="flex justify-between items-center mb3">
                    <input className="link pv2" type="file" accept="image/*" onChange={this.onSelectFile}/>
                    <button className="pointer link dim br2 ba pa2 dib bg-white" style={{height:"35px"}} onClick={() => this.setState({croppedImageUrl:"",src:""})}>Reset</button>
                  </div>
                )}                             
                {src != null && !toggleMath && src != "" && (
                  <Cropper
                      src={src}
                      style={{ height: 250, width: "100%" }}                      
                      initialAspectRatio={4 / 3}                     
                      guides={false}
                      minCropBoxWidth={600}    
                      minCropBoxHeight={430}
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
            <div className="w-100 mb3 pa3">
                <label className="f5 fw4 db mb2">Pertanyaan Audio (Opsional)</label>
                <div className="flex justify-between items-center mb3">
                  <input className="link pv2" type="file" accept="audio/*" onChange={this.onSelectFileAudio}/>
                  <button type="submit" className="pointer link dim br2 ba pa2 dib bg-white" style={{height:"35px"}} onClick={() => this.setState({srcAudio:""})}>
                    Reset
                  </button>
                </div>
                {srcAudio != "" && (<audio controls ref="audio_player" className="bg-primary w-100" src={srcAudio}/>)}                                 
            </div>                     
          <div className="flex items-center justify-center bg-near-white" style={{borderTop:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>            
            <button type="submit" className={`${uploadClass} dim pointer w-30 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary`} disabled={uploadDisable} onClick={this.newSoal}>Tambahkan soal</button> 
          </div>          
          </Cards>
          </div>
          <div className="w-50">
            <div className="flex justify-center items-center" style={{height:"55px"}}>
              <span className='dim pointer mr2 f6 link br2 ba ph3 pv2 flex primary' disabled={uploadDisable} onClick={this.jawabanText}>
                <i className="material-icons mr1" style={{fontSize:"18px"}}>article</i>
                Text
              </span>
              <span className='dim pointer mr2 f6 link br2 ba ph3 pv2 flex primary' disabled={uploadDisable} onClick={this.jawabanImages}>
                <i className="material-icons mr1" style={{fontSize:"18px"}}>crop_original</i>
                Images
              </span>
              <span className='dim pointer mr2 f6 link br2 ba ph3 pv2 flex primary' disabled={uploadDisable} onClick={this.jawabanAudio}>
                <i className="material-icons mr1" style={{fontSize:"18px"}}>audiotrack</i>
                Audio
              </span>
              <span className='dim pointer f6 link br2 ba ph3 pv2 flex primary' disabled={uploadDisable} onClick={this.jawabanMath}>
                <i className="material-icons mr1" style={{fontSize:"18px"}}>calculate</i>
                Math
              </span>
            </div>            
          </div>
        </div>
        <ToastContainer />
    </div>    
    );
  }
  // ---------------------------- script 
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value});    
  }
  onEditorStateChange = (editorState) => {
    this.setState({editorState});
  };
  /* --- Crop Foto Pertanyaan ---*/
  _crop = () => {         
    const foto = this.cropper.getCroppedCanvas({
      width: 500,
      height: 250,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
    }).toDataURL(); 
    this.setState({croppedImageUrl:foto});
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
          if (height >= 125 && width >= 250) {            
            wow.setState({ src: reader.result });                                    
          }else{            
            wow.setState({ src: null,croppedImageUrl:"",errorSelect:"Gambar foto dimensi minimal height 125 , width 250" }); 
          }
        });        
      });
      reader.readAsDataURL(e.target.files[0]);   
    }
  };
  /* --- end of Crop Foto Pertanyaan ---*/
  jawabanText = () => {
    console.log("jawaban Text style");
  }
  jawabanAudio = () => {
    console.log("jawaban audio");
  }
  jawabanImages = () => {
    console.log("jawaban images");
  }
  jawabanMath = () => {
    console.log("jawaban math images");
  }
  /* --- file select audio Pertanyaan ---*/
  onSelectFileAudio = (e) => {  
    if (e.target.files && e.target.files.length > 0) {  
      const reader = new FileReader();   
      reader.addEventListener('load', () => {        
        this.setState({ srcAudio: reader.result });       
      });
      reader.readAsDataURL(e.target.files[0]);               
    }
  };
  /* --- end of file select audio Pertanyaan ---*/
  fetchData = (tingkat,mapel,semester) => {   
    axios.get(
      window.location.origin + `/api/pendidik/aplikasi/quiz/index/${tingkat}/${mapel}/${semester}?&nocache=`+Date.now()
    ).then(response => {      
      this.setState({
        semester:response.data.message.semester,        
        tingkatan:response.data.message.tingkatan,
        mapel:response.data.message.mapel        
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /*--- post new soal ----*/
  newSoal = async () => {
    const {toggleMath,croppedImageUrl} = this.state;
    var formData = new FormData();
    let pertanyaaan_images;
    if(toggleMath){
      pertanyaaan_images = await toJpeg(this.captureRef.current, {
        quality: 1,
        pixelRatio: 1,
        canvasWidth:500, 
        canvasHeight:250,
        backgroundColor:"#fff"
      });            
    }else{ pertanyaaan_images = croppedImageUrl;}
    if(pertanyaaan_images != "" || croppedImageUrl != ""){
      var blobFile = this.b64toBlob(pertanyaaan_images); 
      console.log(blobFile);
      formData.append('file',blobFile);
    }

 
    console.log(pertanyaaan_images);
  }    
  /*--- end post new soal ----*/
  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];     
    this.navigate("/", { replace: true });
  }
  // ---------------------------- end of script
}

export default PageAplikasiQuizPilihanSoalAdd;