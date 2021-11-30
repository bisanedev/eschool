import React from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import { Helmet } from 'react-helmet';
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from 'draft-js';
import { Breadcrumb } from '../../../../components/menu';
import { InputMath,Cards } from '../../../../components/forms';
import { ToastContainer, toast } from 'react-toastify';
import { toJpeg } from 'html-to-image';
import { convertToHTML } from 'draft-convert';
import {encode} from 'html-entities';
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
      toggleMath:false,
      mathValue:"x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}",
      jawaban:[],
      pilihan:[],          
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
    const {tingkatan,mapel,semester,src,srcAudio,editorState,errorSelect,uploadProgress,uploadDisable,toggleMath,mathValue,jawaban,pilihan} = this.state; 
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
              editorClassName="wysiwyg-editor"
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
                <span className="f4 gray">Jawaban Pilihan Ganda Kosong</span>
              </div> 
            }                
            {pilihan.length > 0 && pilihan.map((row, idx) => {
            if(row.type === "text"){
              return <PilihanText 
                key={idx} 
                value={row.text}
                disRem={pilihan.length === idx+1 ? false:true}
                checked={jawaban.includes(idx) ? true:false}
                onChange={(value) => this.updateValueText(value, idx)} 
                onChecked={() => this.onChecked(idx)}
                onRemove={() => this.RemJawaban(idx)}           
              />
            }           
            else if(row.type === "image"){
              return <PilihanImage 
                key={idx} 
                value={row.image}
                disRem={pilihan.length === idx+1 ? false:true}
                checked={jawaban.includes(idx) ? true:false}
                onChange={(value) => this.updateValueImage(value, idx)} 
                onChecked={() => this.onChecked(idx)}
                onRemove={() => this.RemJawaban(idx)}
              />
            }
            else if(row.type === "audio"){
              return <PilihanAudio 
                key={idx} 
                value={row.audio}
                disRem={pilihan.length === idx+1 ? false:true}
                checked={jawaban.includes(idx) ? true:false}      
                onChange={(value) => this.updateValueAudio(value, idx)}           
                onChecked={() => this.onChecked(idx)}
                onRemove={() => this.RemJawaban(idx)}   
              />
            }
            else if(row.type === "math"){
              return <PilihanMath 
                key={idx} 
                value={row.math}
                disRem={pilihan.length === idx+1 ? false:true}
                checked={jawaban.includes(idx) ? true:false}
                onChange={(value) => this.updateValueMath(value, idx)}                       
                onChecked={() => this.onChecked(idx)}
                onRemove={() => this.RemJawaban(idx)}   
              />
            }
            })}
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
  updateValueText = (value, idx) => {
    const multiple = [...this.state.pilihan];
    multiple[idx].text = value;
    this.setState({pilihan:multiple});
  }

  updateValueImage = (value, idx) => {    
    const multiple = [...this.state.pilihan];            
    multiple[idx].image = value;    
    this.setState({pilihan:multiple});            
  }

  updateValueAudio = (value , idx) => {
    const multiple = [...this.state.pilihan];            
    multiple[idx].audio = value;    
    this.setState({pilihan:multiple});  
  }

  updateValueMath = (value , idx) => {
    const multiple = [...this.state.pilihan];            
    multiple[idx].math = value;    
    this.setState({pilihan:multiple});  
  }

  RemJawaban = (idx) => {        
    const multiple = [...this.state.pilihan];
    const jawaban = [...this.state.jawaban];    

    if(this.state.jawaban.includes(idx)){
      const index = jawaban.indexOf(idx);
      if (index > -1) {
        jawaban.splice(index, 1);
        this.setState({jawaban:jawaban});
      }     
    }

    multiple.splice(idx, 1);   
    this.setState({pilihan:multiple});
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
  pilihanNum = () => {
    if(this.state.pilihan.length===0){
      return 0;
    }else{
      var last_element = this.state.pilihan[this.state.pilihan.length - 1];    
      return (last_element.pilihan + 1) ;
    }
  } 
  jawabanText = () => {      
    const multiple = [...this.state.pilihan, 
      {type:"text",text:"&lt;p&gt;ketik disini&lt;/p&gt;"}
    ];
    this.setState({pilihan:multiple});  
  }
  jawabanImages = () => {
    const multiple = [...this.state.pilihan, 
      {type:"image",image:""}
    ];
    this.setState({pilihan:multiple}); 
  }
  jawabanAudio = () => {
    const multiple = [...this.state.pilihan, 
      {type:"audio",audio:""}
    ];
    this.setState({pilihan:multiple}); 
  }
  jawabanMath = () => {    
    const multiple = [...this.state.pilihan, 
      {type:"math",math:""}
    ];
    this.setState({pilihan:multiple}); 
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
    const {toggleMath,croppedImageUrl,editorState,srcAudio} = this.state;
    this.setState({uploadProgress:true,uploadDisable:true});
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
      var blobFileImage = this.b64toBlobIMG(pertanyaaan_images);       
      formData.append('pertanyaan_images',blobFileImage);
      console.log(blobFileImage);
    }

    if(srcAudio != ""){
      var blobFileMp3 = this.b64toBlobMP3(srcAudio);       
      formData.append('pertanyaan_audio',blobFileMp3);
      console.log(blobFileMp3);
    }

    formData.append('pertanyaan_text',encode(convertToHTML(editorState.getCurrentContent())));

    axios({
      method: 'post',
      url: `/api/pendidik/aplikasi/quiz/pilihan/${this.tingkatID}/${this.mapelID}/${this.semesterID}/add`,
      data: formData
    }).then(response => {                 
        if(response.data.status == true)
        {                                          
          this.navigate("#/aplikasi/quiz/pilihan/"+this.tingkatID+"/"+this.mapelID+"/"+this.semesterID); 
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

export default PageAplikasiQuizPilihanSoalAdd;