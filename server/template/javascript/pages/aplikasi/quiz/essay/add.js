import React from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import { Helmet } from 'react-helmet';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import { Breadcrumb } from '../../../../components/menu';
import { Cards } from '../../../../components/forms';
import { ToastContainer, toast } from 'react-toastify';
import { convertToHTML } from 'draft-convert';
import {encode} from 'html-entities';
import MathView from 'react-math-view';

class PageAplikasiQuizEssaySoalAdd extends React.Component{

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
      mathValue:""        
    }
    this.handleInputChange = this.handleInputChange.bind(this);  
    this.tingkatID = this.props.params.tingkatID;
    this.mapelID = this.props.params.mapelID;
    this.semesterID = this.props.params.semesterID;    
    this.navigate = this.props.navigate; 
    this.cropper = React.createRef();        
    this.math =  React.createRef();  
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID),300); 
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {     
    const {tingkatan,mapel,semester,src,srcAudio,editorState,errorSelect,uploadProgress,uploadDisable,toggleMath,mathValue,jawaban,pilihan,files} = this.state; 
    const uploadClass = uploadProgress ? "progress-active":"";     
    return (    
    <div className="konten"> 
        <Helmet>
            <title>Bank soal - Nama Sekolah</title>
        </Helmet> 
        <div className="headings">    
          <div className="title">Bank Soal</div>
          <div className="subtitle">Data bank soal untuk tingkatan {tingkatan != null ? tingkatan.nama:"memuat..."}, mata pelajaran {mapel != null ? mapel.nama:"memuat..."} dan {semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</div>
          <Breadcrumb homeUrl="/aplikasi" homeText="Aplikasi"> 
            <li><a href="#/aplikasi/quiz"><span>Kuis platform</span></a></li>   
            <li><a href="#/aplikasi/quiz/essay"><span>Essay</span></a></li>               
            <li><a href={"#/aplikasi/quiz/essay/"+this.tingkatID}><span>{tingkatan != null ? tingkatan.nama:"memuat..."}</span></a></li>  
            <li><a href={"#/aplikasi/quiz/essay/"+this.tingkatID+"/"+this.mapelID}><span>{mapel != null ? mapel.nama:"memuat..."}</span></a></li>
            <li><a href={"#/aplikasi/quiz/essay/"+this.tingkatID+"/"+this.mapelID+"/"+this.semesterID}><span>{semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</span></a></li>            
            <li><a href="#"><span>Menambahkan soal</span></a></li>   
          </Breadcrumb>   
        </div>
        <div className="mw9 center cf ph3 flex" style={{marginBottom:300}}>          
          <Cards title="Menambahkan soal essay" custom="w-100" bodyClass="flex flex-column">
          <div className="pa3">                               
            <div className="w-100 mb3">
            <label className="f5 fw4 db mb2">Pertanyaan Teks</label>
            <Editor
              editorState={editorState} 
              editorClassName="wysiwyg-editor-essay"
              onEditorStateChange={this.onEditorStateChange}              
              toolbar={{
                options: ['inline', 'list','colorPicker','textAlign','emoji', 'remove', 'history'],
                inline: {
                  options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
                }
              }}
            />
            </div>
            <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Pertanyaan Rumus Matematika (Opsional)</label>
                <div className="flex flex-column mb3">
                <div className="mathWidth" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}> 
                <MathView ref={this.math} value={mathValue}
                      onFocus={() => {
                        this.math.current.executeCommand('showVirtualKeyboard');
                      }}
                      onBlur={() => {        
                        this.math.current.executeCommand('hideVirtualKeyboard');
                      }} 
                      onContentDidChange={() => {this.setState({mathValue:this.math.current.getValue('latex')});}}    
                />
                </div>
                <button className="w-30 pointer link dim br2 ba pa2 dib bg-white flex justify-center items-center mt2" style={{height:"25px",fontSize:"12px", marginLeft:"auto"}} onClick={() => this.math.current.executeCommand('showVirtualKeyboard')}><i className="material-icons-outlined mr1" style={{fontSize: "14px"}}>keyboard</i> Buka Virtual Keyboard</button>
                </div>                
            </div> 
            <div className="w-100 mb3">                
                <label className="f5 fw4 db mb2">Pertanyaan Gambar (Opsional)</label>                 
                <div className="flex justify-between items-center mb3">
                    <input className="link pv2" type="file" accept="image/*" onChange={this.onSelectFile}/>
                    <button className="pointer link dim br2 ba pa2 dib bg-white" style={{height:"35px"}} onClick={() => this.setState({croppedImageUrl:"",src:""})}>Reset</button>
                </div>                             
                {src != null && src != "" && (
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
            <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Pertanyaan Audio (Opsional)</label>
                <div className="flex justify-between items-center mb3">
                  <input className="link pv2" type="file" accept="audio/mp3" onChange={this.onSelectFileAudio}/>
                  <button type="submit" className="pointer link dim br2 ba pa2 dib bg-white" style={{height:"35px"}} onClick={() => this.setState({srcAudio:""})}>
                    Reset
                  </button>
                </div>
                {srcAudio != "" && (<audio controls ref="audio_player" className="bg-primary w-100" src={srcAudio}/>)}                                 
            </div> 
          </div>                    
          <div className="flex items-center justify-center bg-near-white" style={{borderTop:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>            
            <button type="submit" className={`${uploadClass} dim pointer w-30 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary`} disabled={uploadDisable} onClick={this.newSoal}>Tambahkan soal</button> 
          </div>          
          </Cards>          
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

  b64toBlobIMG(dataURI) {    
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  } 

  b64toBlobMP3(dataURI) {    
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'audio/mp3' });
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
            wow.setState({ src: null,croppedImageUrl:"",errorSelect:"Gambar foto dimensi minimal height 250 , width 125" }); 
          }
        });        
      });
      reader.readAsDataURL(e.target.files[0]);   
    }
  };

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
    const {toggleMath,croppedImageUrl,editorState,srcAudio,mathValue} = this.state;
    this.setState({uploadProgress:true,uploadDisable:true});
    var formData = new FormData();

    if(croppedImageUrl != ""){
      var blobFileImage = this.b64toBlobIMG(croppedImageUrl);       
      formData.append('pertanyaan_images',blobFileImage);      
    }

    if(mathValue != undefined){
      formData.append('pertanyaan_tex',mathValue);    
    }

    if(srcAudio != ""){
      var blobFileMp3 = this.b64toBlobMP3(srcAudio);       
      formData.append('pertanyaan_audio',blobFileMp3);      
    }
   
    formData.append('pertanyaan_text',encode(convertToHTML(editorState.getCurrentContent())));
   
    axios({
      method: 'post',
      url: `/api/pendidik/aplikasi/quiz/essay/${this.tingkatID}/${this.mapelID}/${this.semesterID}/add`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(response => {                 
        if(response.data.status == true)
        {      
          console.log("berhasil");                                    
          this.navigate(-1); 
        }
    }).catch(error => {                   
      if(error.response.status == 400){                       
        this.setState({uploadProgress:false,uploadDisable:false},() => toast.warn(error.response.data.message));
      }  
      if(error.response.status == 401){
        this.logout();
      }                    
      if(error.message === "Network Error"){ 
        toast.error("Jaringan internet tidak tersambung");                    
      }     
    });
     
  }    
  /*--- end post new soal ----*/
  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];     
    this.navigate("/", { replace: true });
  }
  // ---------------------------- end of script
}

export default PageAplikasiQuizEssaySoalAdd;