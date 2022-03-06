import React from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import { Helmet } from 'react-helmet';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import { Breadcrumb } from '../../../../components/menu';
import { Cards ,SwitchMini} from '../../../../components/forms';
import { toast } from 'react-toastify';
import { convertToHTML } from 'draft-convert';
import {encode} from 'html-entities';
import MathView from 'react-math-view';
import PilihanText from './pilihanText';
import PilihanImage from './pilihanImage';
import PilihanAudio from './pilihanAudio';
import PilihanMath from './pilihanMath';

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
      mathValue:"",
      jawaban:[],
      pilihan:[],
      files:[],
      rumusToggle:false,       
      audioToggle:false,
      imageToggle:false,
      errorPertanyaan:"",
      errorJawaban:false,
      errorPilihan:false,
      errorAudio:"",
      errorGambar:"",
      errorFiles:false
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
    const {tingkatan,mapel,semester,src,srcAudio,editorState,errorSelect,uploadProgress,uploadDisable,mathValue,jawaban,pilihan,files,rumusToggle,audioToggle,imageToggle,errorPertanyaan,errorJawaban,errorPilihan,errorAudio,errorGambar,errorFiles} = this.state; 
    const uploadClass = uploadProgress ? "progress-active":"";     
    return (    
    <div className="konten"> 
        <Helmet>
            <title>Pilihan ganda - Nama Sekolah</title>
        </Helmet> 
        <div className="headings">    
          <div className="title">Pilihan ganda</div>
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
        <div className="mw9 center cf ph3 flex" style={{marginBottom:300}}>
          <div className="w-50">
          <Cards title="Menambahkan soal pilihan ganda" bodyClass="flex flex-column">
          <div className="pa3">                               
            <div className="w-100 mb3">
            <label className="f5 fw4 db mb2">Pertanyaan Teks</label>
            <Editor
              editorState={editorState} 
              editorClassName={"wysiwyg-editor " + (errorPertanyaan != "" ? "error":"")}
              onEditorStateChange={this.onEditorStateChange}              
              toolbar={{
                options: ['inline', 'list','colorPicker','textAlign','emoji', 'remove', 'history'],
                inline: {
                  options: ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'],
                }
              }}
            />
            {errorPertanyaan != "" && (
                <span className="pesan-error">{errorPertanyaan}</span>
            )}
            </div>
            <div className="w-100 mb3">
                <div className="db mb2 flex justify-between">
                  <label className="f5 fw4">Pertanyaan Rumus Matematika (Opsional)</label>
                  <SwitchMini name="rumusToggle" value={rumusToggle} onChange={this.handleInputChange}/>
                </div>
                {rumusToggle && (
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
                )}             
            </div> 
            <div className="w-100 mb3">                                  
                <div className="db mb2 flex justify-between">
                  <label className="f5 fw4">Pertanyaan Gambar (Opsional)</label>
                  <SwitchMini name="imageToggle" value={imageToggle} onChange={this.handleInputChange}/>
                </div>  
                {imageToggle && (
                  <div className="flex justify-between items-center mb3">
                   <input className="link pv2" type="file" accept="image/*" onChange={this.onSelectFile}/>
                   <button className="pointer link dim br2 ba pa2 dib bg-white" style={{height:"35px"}} onClick={() => this.setState({croppedImageUrl:"",src:""})}>Reset</button>
                  </div>  
                )}                               
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
                {errorGambar != "" && (
                  <span className="pesan-error">{errorGambar}</span>
                )}
            </div>
            <div className="w-100 mb3">           
                <div className="db mb2 flex justify-between">
                  <label className="f5 fw4">Pertanyaan Audio (Opsional)</label>
                  <SwitchMini name="audioToggle" value={audioToggle} onChange={this.handleInputChange}/>
                </div> 
                {audioToggle && (
                <div className="flex justify-between items-center mb3">
                  <input className="link pv2" type="file" accept="audio/mp3" onChange={this.onSelectFileAudio}/>
                  <button type="submit" className="pointer link dim br2 ba pa2 dib bg-white" style={{height:"35px"}} onClick={() => this.setState({srcAudio:""})}>
                    Reset
                  </button>
                </div>
                )} 
                {srcAudio != "" && (<audio controls ref="audio_player" className="w-100" src={srcAudio}/>)}
                {errorAudio != "" && (
                  <span className="pesan-error">{errorAudio}</span>
                )}
            </div> 
          </div>                    
          <div className="flex items-center justify-center bg-near-white" style={{borderTop:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>            
            <button type="submit" className={`${uploadClass} dim pointer w-30 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary`} disabled={uploadDisable} onClick={this.newSoal}>Tambahkan soal</button> 
          </div>          
          </Cards>
          </div>
          <div className="w-50 flex flex-column">
            <div className="flex justify-center items-center" style={{height:"55px"}}>
              <span className='dim pointer mr2 f6 link br2 ba b--black-10 ph3 pv2 flex bg-white primary' disabled={uploadDisable} onClick={this.jawabanText}>
                <i className="material-icons mr1" style={{fontSize:"18px"}}>article</i>
                Teks
              </span>
              <span className='dim pointer mr2 f6 link br2 ba b--black-10 ph3 pv2 flex bg-white primary' disabled={uploadDisable} onClick={this.jawabanImages}>
                <i className="material-icons mr1" style={{fontSize:"18px"}}>crop_original</i>
                Gambar
              </span>
              <span className='dim pointer mr2 f6 link br2 ba b--black-10 ph3 pv2 flex bg-white primary' disabled={uploadDisable} onClick={this.jawabanAudio}>
                <i className="material-icons mr1" style={{fontSize:"18px"}}>audiotrack</i>
                Audio
              </span>
              <span className='dim pointer mr2 f6 link br2 ba b--black-10 ph3 pv2 flex bg-white primary' disabled={uploadDisable} onClick={this.jawabanMath}>
                <i className="material-icons mr1" style={{fontSize:"18px"}}>calculate</i>
                Math
              </span>
            </div> 
            {pilihan.length === 0 && 
              <div className="flex justify-center items-center pa3" style={{border:"3px dashed rgba(0, 0, 0, 0.125)",height:"125px"}}>
                <span className="f4 gray">Jawaban pilihan ganda kosong</span>
              </div> 
            }                                   
            {pilihan.length > 0 && pilihan.map((row, idx) => {
            if(row.type === "text"){
              return <PilihanText 
                key={idx} 
                value={row.data}
                disRem={pilihan.length === idx+1 ? false:true}
                checked={jawaban.includes(idx) ? true:false}
                onChange={(value) => this.updateValue(value, idx)} 
                onChecked={() => this.onChecked(idx)}
                onRemove={() => this.RemJawaban(idx)} 
                errorCheck={errorJawaban && jawaban.length === 0 ? true:false} 
                errorPilihan={errorPilihan && row.data === "" ? true:false}       
              />
            }           
            else if(row.type === "image"){
              return <PilihanImage 
                key={idx} 
                url="" 
                value={files[idx].raw}
                disRem={pilihan.length === idx+1 ? false:true}
                checked={jawaban.includes(idx) ? true:false}
                onChange={(value) => this.updateValue(value, idx)} 
                onChecked={() => this.onChecked(idx)}
                onRemove={() => this.RemJawaban(idx)}
                errorCheck={errorJawaban && jawaban.length === 0 ? true:false}
                errorPilihan={errorPilihan && files[idx].raw === "" ? true:false}
              />
            }
            else if(row.type === "audio"){
              return <PilihanAudio 
                key={idx}
                url=""                
                value={files[idx].raw}
                disRem={pilihan.length === idx+1 ? false:true}
                checked={jawaban.includes(idx) ? true:false}      
                onChange={(value) => this.updateValue(value, idx)}           
                onChecked={() => this.onChecked(idx)}
                onRemove={() => this.RemJawaban(idx)} 
                errorCheck={errorJawaban && jawaban.length === 0 ? true:false}
                errorPilihan={errorPilihan && files[idx].raw === "" ? true:false}  
                errorFile={errorFiles}
              />
            }
            else if(row.type === "math"){
              return <PilihanMath 
                key={idx}          
                value={row.data}
                disRem={pilihan.length === idx+1 ? false:true}
                checked={jawaban.includes(idx) ? true:false}
                onChange={(value) => this.updateValue(value, idx)}                       
                onChecked={() => this.onChecked(idx)}
                onRemove={() => this.RemJawaban(idx)} 
                errorCheck={errorJawaban && jawaban.length === 0 ? true:false} 
                errorPilihan={errorPilihan && row.data === "" ? true:false} 
              />
            }
            })}
          </div>
        </div>        
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
  /* --- end of Crop Foto Pertanyaan ---*/   
  updateValue = (value, idx) => {
    const multiple = [...this.state.pilihan];
    const file = [...this.state.files];

    if(multiple[idx].type === "text" && value !=""){
      multiple[idx].data = value;
      this.setState({pilihan:multiple}); 
    }
    else if(multiple[idx].type === "image" && value !=""){
      var blobFileImage = this.b64toBlobIMG(value);
      file[idx].nama = "jawaban_"+idx+".jpg";
      file[idx].file = blobFileImage;
      file[idx].raw = value;
      multiple[idx].data = "jawaban_"+idx+".jpg";
      this.setState({files:file,pilihan:multiple}); 
    }
    else if(multiple[idx].type === "audio" && value !=""){      
      var blobFileMp3 = this.b64toBlobMP3(value);
      file[idx].nama = "jawaban_"+idx+".mp3";
      file[idx].file = blobFileMp3;
      file[idx].raw = value;
      multiple[idx].data = "jawaban_"+idx+".mp3";
      this.setState({files:file,pilihan:multiple}); 
    }
    else if(multiple[idx].type === "math" && value !=""){
      multiple[idx].data = value;
      this.setState({pilihan:multiple});       
    }else if(value === ""){
      file[idx].nama = "";
      file[idx].file = "";
      file[idx].raw = "";
      multiple[idx].data = "";
      this.setState({files:file,pilihan:multiple});  
    }
    this.setState({pilihan:multiple}); 
  } 

  RemJawaban = (idx) => {        
    const multiple = [...this.state.pilihan];
    const jawaban = [...this.state.jawaban];    
    const files = [...this.state.files];  

    if(this.state.jawaban.includes(idx)){
      const index = jawaban.indexOf(idx);
      if (index > -1) {
        jawaban.splice(index, 1);
        this.setState({jawaban:jawaban});
      }     
    }

    multiple.splice(idx, 1);   
    files.splice(idx,1);
    this.setState({pilihan:multiple,files:files});
  }

  onChecked = (idx) => {
    const jawaban = [...this.state.jawaban];  
    if(!this.state.jawaban.includes(idx)){
      jawaban.unshift(idx);      
    }else{
      const index = jawaban.indexOf(idx);
      if (index > -1) {
        jawaban.splice(index, 1);
      }
    }
    this.setState({jawaban});
  }  

  /* --- end of utils jawaban pilihan ganda ---*/
  jawabanText = () => {      
    const multiple = [...this.state.pilihan, 
      {type:"text",data:""}
    ];
    const file = [...this.state.files,     
      {nama:"",file:"",raw:""}
    ];
    this.setState({pilihan:multiple,files:file});  
  }
  jawabanImages = () => {
    const multiple = [...this.state.pilihan, 
      {type:"image",data:""}
    ];
    const file = [...this.state.files,     
      {nama:"",file:"",raw:""}
    ];
    this.setState({pilihan:multiple,files:file}); 
  }
  jawabanAudio = () => {
    const multiple = [...this.state.pilihan, 
      {type:"audio",data:""}
    ];
    const file = [...this.state.files,     
      {nama:"",file:"",raw:""}
    ];
    this.setState({pilihan:multiple,files:file}); 
  }
  jawabanMath = () => {    
    const multiple = [...this.state.pilihan, 
      {type:"math",data:""}
    ];
    const file = [...this.state.files,     
      {nama:"",file:"",raw:""}
    ];
    this.setState({pilihan:multiple,files:file}); 
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
    const {croppedImageUrl,editorState,srcAudio,pilihan,files,jawaban,mathValue} = this.state;
    this.setState({uploadProgress:true,uploadDisable:true,errorPertanyaan:"",errorJawaban:false,errorPilihan:false,errorAudio:"",errorGambar:"",errorFiles:false});
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
    
    var jawabanJSON = jawaban.length === 0 ? "" : JSON.stringify(jawaban);       
    formData.append('jawaban',jawabanJSON);       
    /*--cek editorState variable --*/
    const content = editorState.getCurrentContent();
    const isEditorEmpty = !content.hasText();    
    const lengthOfTrimmedContent = content.getPlainText().trim().length;
    const isContainOnlySpaces = !isEditorEmpty && !lengthOfTrimmedContent;
    if(isEditorEmpty){      
      formData.append('pertanyaan_text',"");
    }else if(isContainOnlySpaces){
      formData.append('pertanyaan_text',"");
    }else{
      formData.append('pertanyaan_text',encode(convertToHTML(editorState.getCurrentContent())));
    }
    /*--check pilihan ganda is empty --*/
    if(pilihan.length === 0){
      this.setState({uploadProgress:false,uploadDisable:false},() => toast.error("Pilihan ganda kosong !"));          
      return false;
    }
    /*--loop pilihan ganda check if data empty --*/
    for (var key in pilihan) {
      if (pilihan.hasOwnProperty(key)) {
        if(pilihan[key].data === "" && pilihan[key].type === "text"){
          this.setState({uploadProgress:false,uploadDisable:false,errorPilihan:true},() => toast.error("Silahkan periksa kembali input text jawaban yang kosong !"));          
          return false;
        }     
        if(pilihan[key].data === "" && pilihan[key].type === "image"){
          this.setState({uploadProgress:false,uploadDisable:false,errorPilihan:true},() => toast.error("Silahkan periksa kembali input file gambar jawaban yang kosong !"));          
          return false;
        }
        if(pilihan[key].data === "" && pilihan[key].type === "math"){
          this.setState({uploadProgress:false,uploadDisable:false,errorPilihan:true},() => toast.error("Silahkan periksa kembali input math jawaban yang kosong !"));          
          return false;
        }
        if(pilihan[key].data === "" && pilihan[key].type === "audio"){
          this.setState({uploadProgress:false,uploadDisable:false,errorPilihan:true},() => toast.error("Silahkan periksa kembali input file audio jawaban yang kosong !"));          
          return false;
        }
      }
    }
    /*-- loop array pilihan --*/        
    for (var key in files) {
      if (files.hasOwnProperty(key)) { 
        if(files[key].nama != ""){
          formData.append("files[]",files[key].file,files[key].nama);  
        }             
      }
    }
    /*-- end loop array pilihan --*/
    /*-- Pilihan JSON --*/
    var pilihanJSON = pilihan.length === 0 ? "" : JSON.stringify(pilihan);
    formData.append('pilihan',pilihanJSON);
    /*-- End Pilihan JSON --*/
    axios({
      method: 'post',
      url: `/api/pendidik/aplikasi/quiz/pilihan/${this.tingkatID}/${this.mapelID}/${this.semesterID}/add`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(response => {                 
        if(response.data.status == true)
        {      
          toast.success("Data soal pilihan ganda berhasil ditambahkan");                                      
          this.navigate(-1); 
        }
    }).catch(error => {                   
      if(error.response.status == 400){                       
        this.setState({uploadProgress:false,uploadDisable:false},() => {
          if(error.response.data.message["pertanyaan"]){   
            this.setState({errorPertanyaan:error.response.data.message["pertanyaan"]}); 
          }
          if(error.response.data.message["jawaban"]){              
            this.setState({errorJawaban:true},() => toast.error(error.response.data.message["jawaban"])); 
          }
          if(error.response.data.message["pilihan"]){               
            this.setState({errorPilihan:true},() => toast.error(error.response.data.message["pilihan"])); 
          }
          if(error.response.data.message["gambar"]){   
            this.setState({errorGambar:error.response.data.message["gambar"]}); 
          }
          if(error.response.data.message["audio"]){   
            this.setState({errorAudio:error.response.data.message["audio"]}); 
          }
          if(error.response.data.message["files"]){   
            this.setState({errorFiles:true},() => toast.error(error.response.data.message["files"])); 
          }
        });
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

export default PageAplikasiQuizPilihanSoalAdd;