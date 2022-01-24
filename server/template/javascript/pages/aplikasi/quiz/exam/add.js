import React from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import { Helmet } from 'react-helmet';
import { Breadcrumb } from '../../../../components/menu';
import { Cards ,SwitchMini,InputText} from '../../../../components/forms';
import DatePicker from "react-datepicker";
import PaketItem from "./paketItem";
import { ToastContainer, toast } from 'react-toastify';

class PageAplikasiQuizExamAdd extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      tingkatan:null,
      mapel:null,
      semester:null,      
      src: "",
      errorSelect:"",
      croppedImageUrl:"",
      nama:"",     
      mulai:"",
      selesai:"",
      paketSoal:[],
      paketData:[],
      mulai:new Date(),
      selesai:new Date().setHours(new Date().getHours() + 1),
      imageToggle:false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);  
    this.tingkatID = this.props.params.tingkatID;
    this.mapelID = this.props.params.mapelID;
    this.semesterID = this.props.params.semesterID;    
    this.navigate = this.props.navigate; 
    this.cropper = React.createRef();    
  }

  componentDidMount() {   
    this.timer = setTimeout(() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID),300); 
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {     
    const {tingkatan,mapel,semester,src,errorSelect,uploadProgress,uploadDisable,mulai,selesai,paketSoal,paketData,imageToggle} = this.state; 
    const uploadClass = uploadProgress ? "progress-active":"";    
    return (    
    <div className="konten"> 
        <Helmet>
            <title>Ujian - Nama Sekolah</title>
        </Helmet> 
        <div className="headings">    
          <div className="title">Ujian</div>
          <div className="subtitle">Data ujian untuk tingkatan {tingkatan != null ? tingkatan.nama:"memuat..."}, mata pelajaran {mapel != null ? mapel.nama:"memuat..."} dan {semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</div>
          <Breadcrumb homeUrl="/aplikasi" homeText="Aplikasi"> 
            <li><a href="#/aplikasi/quiz"><span>Kuis platform</span></a></li>   
            <li><a href="#/aplikasi/quiz/exam"><span>Ujian</span></a></li>               
            <li><a href={"#/aplikasi/quiz/exam/"+this.tingkatID}><span>{tingkatan != null ? tingkatan.nama:"memuat..."}</span></a></li>  
            <li><a href={"#/aplikasi/quiz/exam/"+this.tingkatID+"/"+this.mapelID}><span>{mapel != null ? mapel.nama:"memuat..."}</span></a></li>
            <li><a href={"#/aplikasi/quiz/exam/"+this.tingkatID+"/"+this.mapelID+"/"+this.semesterID}><span>{semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</span></a></li>            
            <li><a href="#"><span>Menambahkan ujian</span></a></li>   
          </Breadcrumb>   
        </div>
        <div className="mw9 center cf ph3 flex">          
          <Cards title="Menambahkan ujian" custom="w-100" bodyClass="flex flex-column">
          <div className="flex">
          <div className="w-50 flex flex-column pa3">                                        
            <div className="w-100 mb3">
              <label className="f5 fw4 db mb2">Nama ujian</label>
              <InputText name="nama" placeholder="ketik nama ujian disini" onChange={this.handleInputChange} />
            </div>
            <div className="w-100 flex mb3">
              <div className="w-50 mr1">
                <label className="f5 fw4 db mb2">Mulai ujian</label>
                <DatePicker showTimeSelect selected={mulai} onChange={(date) => this.setState({mulai:date})} dateFormat="dd/MM/yyyy HH:mm"/>
              </div>
              <div className="w-50">
                <label className="f5 fw4 db mb2">Akhir ujian</label>
                <DatePicker showTimeSelect selected={selesai} onChange={(date) => this.setState({selesai:date})} dateFormat="dd/MM/yyyy HH:mm"/>
              </div>            
            </div>            
            <div className="w-100 mb3">                                  
                <div className="db mb2 flex justify-between">
                  <label className="f5 fw4">Kisi-kisi Ujian (Opsional)</label>
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
            </div> 
          </div>                                            
          <div className="w-50 flex flex-column pa3">
            <div className="w-100 mb3">
              <div className="flex mb2 justify-between items-center">
                <label className="f5 fw4">Paket yang dipilih</label> 
                <label className="f5 fw4">{paketSoal.length} Terpilih</label>
              </div>              
              <div className="flex flex-wrap">
              {paketData.length > 0 && paketData.map((value,k) => (
                <PaketItem key={k} nama={value.nama}
                  countPilihan={value.pilihan_terpilih.length}
                  countEssay={value.essay_terpilih.length}
                  bobotPilihan={value.bobot_pilihan}                
                  bobotEssay={value.bobot_essay}
                  acak={value.acak_soal}
                  checked={paketSoal.includes(value.id)}
                  onChecked={() => this.onChecked(value.id)}
                />                
              ))}
              </div>
            </div>
          </div>
          </div>
          <div className="flex items-center justify-center bg-near-white" style={{borderTop:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>            
            <button type="submit" className={`${uploadClass} dim pointer w-30 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary`} disabled={uploadDisable} onClick={this.newExam}>Tambahkan ujian</button> 
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

  onChecked = (id) => {
    const {paketSoal} =  this.state;    
    var index = paketSoal.indexOf(id);             
    if (index !== -1) {      
      paketSoal.splice(index, 1);
      this.setState({paketSoal});
    }else{      
      paketSoal.push(id);
      this.setState({paketSoal});      
    }  
  };

  /* --- end of file select audio Pertanyaan ---*/
  fetchData = (tingkat,mapel,semester) => {   
    axios.get(
      window.location.origin + `/api/pendidik/aplikasi/quiz/index/exam/${tingkat}/${mapel}/${semester}?&nocache=`+Date.now()
    ).then(response => {      
      this.setState({
        semester:response.data.message.semester,        
        tingkatan:response.data.message.tingkatan,
        mapel:response.data.message.mapel,
        paketData:response.data.message.paketdata
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /*--- post new ujian ----*/
  newExam = async () => {
    const {croppedImageUrl,editorState,srcAudio,pilihan,files,jawaban,mathValue} = this.state;
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
    
    var jawabanJSON = jawaban.length === 0 ? "" : JSON.stringify(jawaban);       
    formData.append('jawaban',jawabanJSON);
   
    formData.append('pertanyaan_text',encode(convertToHTML(editorState.getCurrentContent())));
    /*--loop check if empty --*/
    for (var key in pilihan) {
      if (pilihan.hasOwnProperty(key)) {        
        if(pilihan[key].data === ""){
          this.setState({uploadProgress:false,uploadDisable:false},() => toast.warn("Periksa file jawaban ada yang kosong !!"));          
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

export default PageAplikasiQuizExamAdd;