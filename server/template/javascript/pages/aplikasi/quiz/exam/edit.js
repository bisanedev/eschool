import React from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import { Helmet } from 'react-helmet';
import { Breadcrumb } from '../../../../components/menu';
import { Cards ,SwitchMini,InputText,InputNumber} from '../../../../components/forms';
import DatePicker from "react-datepicker";
import moment from "moment";
import PaketItem from "./paketItem";
import { ToastContainer, toast } from 'react-toastify';

class PageAplikasiQuizExamEdit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id:"",
      tingkatan:null,
      mapel:null,
      semester:null,      
      src: "",
      errorSelect:"",
      croppedImageUrl:"",
      nama:"",    
      nilai:"",
      kisi:"",
      paketSoal:[],
      paketData:[],
      mulai:new Date(),
      selesai:new Date().setHours(new Date().getHours() + 1),
      imageToggle:false,
      loading:true,
    }
    this.handleInputChange = this.handleInputChange.bind(this);  
    this.tingkatID = this.props.params.tingkatID;
    this.mapelID = this.props.params.mapelID;
    this.semesterID = this.props.params.semesterID;    
    this.examID = this.props.params.examID;  
    this.navigate = this.props.navigate; 
    this.cropper = React.createRef();    
  }

  componentDidMount() {   
    this.timer = setTimeout(() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID,this.examID),300); 
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {     
    const {tingkatan,mapel,semester,uploadProgress,uploadDisable,nama,mulai,kisi,selesai,nilai,paketSoal,paketData,loading} = this.state; 
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
            <li><a href="#"><span>Mengubah ujian</span></a></li>   
          </Breadcrumb>   
        </div>
        <div className="mw9 center cf ph3 flex">          
          <Cards title="Mengubah data ujian" custom="w-100" bodyClass="flex flex-column">
          <div className="flex">
          <div className="w-50 flex flex-column pa3">                                        
            <div className="w-100 flex mb3">
              <div className="w-50 mr1">
                <label className="f5 fw4 db mb2">Nama ujian</label>
                <InputText name="nama" value={nama} placeholder="ketik nama ujian disini" onChange={this.handleInputChange} />
              </div>
              <div className="w-50">
                <label className="f5 fw4 db mb2">Kriteria Ketuntasan Minimal</label>
                <InputNumber name="nilai" value={nilai} placeholder="ketik nilai angka minimum" onChange={this.handleChangeNilai} />
              </div>
            </div>
            <div className="w-100 flex mb3">
              <div className="w-50 mr1">
                <label className="f5 fw4 db mb2">Mulai ujian</label>
                <DatePicker showTimeSelect selected={mulai} onChange={(date) => this.setState({mulai:date})} dateFormat="dd/MM/yyyy HH:mm"/>
              </div>
              <div className="w-50">
                <label className="f5 fw4 db mb2">Selesai ujian</label>
                <DatePicker showTimeSelect selected={selesai} onChange={(date) => this.setState({selesai:date})} dateFormat="dd/MM/yyyy HH:mm"/>
              </div>            
            </div>             
            {kisi !="" ? (
            <div className="w-100 mb3">              
              <label className="f5 fw4 db mb2">Kisi-kisi Ujian (Opsional)</label>
              <div className="relative">
                <div className="link dim deleteFotoPertanyaan flex justify-center items-center" onClick={() => {this.setState({kisi:""})}}>Ganti foto<i className="material-icons-outlined" style={{fontSize: "14px"}}>close</i></div>
                    <img src={`data/quiz/exam/${this.examID}/${kisi}?nocache=`+Date.now()} style={{width:"100%",height:"100%"}}/>
              </div>              
            </div>
            ):(
              this.gambarRender()
            )}            
          </div>                                            
          <div className="w-50 flex flex-column pa3">
            <div className="w-100 mb3">
              <div className="flex mb2 justify-between items-center">
                <label className="f5 fw4">Paket soal yang dipilih</label> 
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
              {paketData.length === 0 && !loading &&
              <div className="flex justify-center items-center pa3 flex-column w-100" style={{border:"3px dashed rgba(0, 0, 0, 0.125)",height:200}}>
                <span className="f3 gray">Data paket soal kosong</span>         
              </div> 
              }
              {loading && (
              <div className="flex justify-center items-center pa3 w-100" style={{height:200}}>
                <div className="loader mb3"></div>      
              </div>                
              )}              
              </div>
            </div>
          </div>
          </div>
          <div className="flex items-center justify-center bg-near-white" style={{borderTop:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>            
            <button type="submit" className={`${uploadClass} dim pointer w-30 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary`} disabled={uploadDisable} onClick={this.updateExam}>Perbarui data ujian</button> 
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

  handleChangeNilai = (event) => { 
    const {nilai} = this.state;    
    const target = event.target;     
    const value = target.validity.valid ? target.value : nilai;    
    const name = target.name;    
    const numericRegex = /^(0|[1-9][0-9]?|100)$/;
    if(numericRegex.test(value) || value === "") {
      this.setState({ [name]: value });
    }     
  }
  /* --- Crop Foto Pertanyaan ---*/
  _crop = () => {         
    const foto = this.cropper.getCroppedCanvas({
      width: 935,
      height: 595,
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

   /*--- foto render --*/ 
   gambarRender = () => {
    const {src,errorSelect,imageToggle} = this.state;
    return (
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
    );
  }

  /* --- end of file select audio Pertanyaan ---*/
  fetchData = (tingkat,mapel,semester,exam) => {   
    axios.get(
      window.location.origin + `/api/pendidik/aplikasi/quiz/exam/${tingkat}/${mapel}/${semester}/exam/${exam}?&nocache=`+Date.now()
    ).then(response => {      
      this.setState({
        semester:response.data.message.semester,        
        tingkatan:response.data.message.tingkatan,
        mapel:response.data.message.mapel,
        paketData:response.data.message.paketdata,
        loading:false,
        id:response.data.message.data.id,
        nama:response.data.message.data.nama,
        mulai:moment(response.data.message.data.mulai).toDate(),
        selesai:moment(response.data.message.data.selesai).toDate(),
        nilai:response.data.message.data.nilai_minimal,
        kisi:response.data.message.data.kisi_exam,
        paketSoal:response.data.message.data.paket_soal
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /*--- post new ujian ----*/
  updateExam = async () => {
    const {croppedImageUrl,id,nama,nilai,mulai,selesai,paketSoal} = this.state;
    this.setState({uploadProgress:true,uploadDisable:true});
    var formData = new FormData();
    formData.append('id',id);
    formData.append('nama',nama);
    formData.append('nilai',nilai);
    formData.append('mulai',moment(mulai).format('YYYY-MM-DD HH:mm'));
    formData.append('selesai',moment(selesai).format('YYYY-MM-DD HH:mm'));
    if(paketSoal.length != 0){
      formData.append('paket_soal',JSON.stringify(paketSoal));
    }
    if(croppedImageUrl != ""){
      var blobFileImage = this.b64toBlobIMG(croppedImageUrl);       
      formData.append('kisi',blobFileImage);      
    }
    /*-- AXIOS POST --*/
    axios({
      method: 'post',
      url: `/api/pendidik/aplikasi/quiz/exam/${this.tingkatID}/${this.mapelID}/${this.semesterID}/update`,
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

export default PageAplikasiQuizExamEdit;