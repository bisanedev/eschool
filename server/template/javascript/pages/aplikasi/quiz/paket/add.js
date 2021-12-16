import React from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Breadcrumb } from "../../../../components/menu";
import { SwitchMini,InputText,InputNumber } from "../../../../components/forms";
import Tabs from "../../../../components/tabs";
import { ToastContainer, toast } from 'react-toastify';

class PageAplikasiQuizPaketSoalAdd extends React.Component{

    constructor(props) {
      super(props);
      this.state = {  
          nama:"",
          bobotPilihan:0,
          bobotEssay:0,
          paketPilihan:[],
          paketEssay:[],
          dataPilihan:[],
          dataEssay:[],
          acak:false,         
          isLoading:true, 
          semesterPickPilihan:null,
          semesterPickEssay:null,
          semesterData:[] 
      } 

      this.handleInputChange = this.handleInputChange.bind(this);   
      this.tingkatID = this.props.params.tingkatID;
      this.mapelID = this.props.params.mapelID;
      this.semesterID = this.props.params.semesterID;
      this.navigate = this.props.navigate;
    }
  
    componentDidMount() {     
      this.timer = setTimeout(() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID),300);   
    }
  
    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    
  render() {     
    const {uploadProgress,uploadDisable,tingkatan,mapel,semester,bobotPilihan,bobotEssay,acak,paketPilihan,paketEssay,dataPilihan,dataEssay,semesterPickPilihan,semesterPickEssay,semesterData} = this.state; 
    const uploadClass = uploadProgress ? "progress-active":""; 
    const totalBobot = parseInt(bobotPilihan)+parseInt(bobotEssay);    
    return (  
    <div className="konten"> 
        <Helmet>
            <title>Paket soal - Nama Sekolah</title>
        </Helmet> 
        <div className="headings">    
          <div className="title">Paket soal</div>
          <div className="subtitle">Data Paket soal untuk tingkatan {tingkatan != null ? tingkatan.nama:"memuat..."}, mata pelajaran {mapel != null ? mapel.nama:"memuat..."} dan {semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</div>
          <Breadcrumb homeUrl="/aplikasi" homeText="Aplikasi"> 
            <li><a href="#/aplikasi/quiz"><span>Kuis platform</span></a></li>   
            <li><a href="#/aplikasi/quiz/paket"><span>Paket soal</span></a></li>               
            <li><a href={"#/aplikasi/quiz/paket/"+this.tingkatID}><span>{tingkatan != null ? tingkatan.nama:"memuat..."}</span></a></li>  
            <li><a href={"#/aplikasi/quiz/paket/"+this.tingkatID+"/"+this.mapelID}><span>{mapel != null ? mapel.nama:"memuat..."}</span></a></li>
            <li><a href={"#/aplikasi/quiz/paket/"+this.tingkatID+"/"+this.mapelID+"/"+this.semesterID}><span>{semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</span></a></li>            
            <li><a href="#"><span>Menambahkan paket soal</span></a></li>   
          </Breadcrumb>   
        </div>
        <div className="mw9 center cf ph3 flex flex-column">
        <div className="w-100">
        <div className="bg-white br2 mb1" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
        <div className="flex">
            <span className="pa3 f4 bg-primary white flex items-center" style={{width:"88%"}}>Menambahkan paket soal</span>
            <div className="w-20 flex justify-center items-center" style={{width:"12%",borderBottom:"1px solid rgba(0, 0, 0, 0.125)"}}>
              <div className="flex flex-column items-center">
                <label className="f7 fw4 db mb1">Acak urutan soal</label>
                <SwitchMini name="acak" onChange={this.handleInputChange}/>
              </div>
            </div>
        </div>      
        <div className="flex">
        <div className="w-50 pa3">
          <div className="w-100 mb3">
            <label className="f5 fw4 db mb2">Nama paket soal</label>
            <InputText name="nama" placeholder="ketik nama paket soal disini" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="w-50 pa3">
          <div className="w-100 mb3">
            <label className="f5 fw4 db mb2">Bobot nilai (total bobot nilai pilihan ganda + essay = wajib 100)</label>
            <div className="flex">
            <div className="w-30">
              <InputNumber name="bobotPilihan" value={bobotPilihan} placeholder="pilihan ganda" onChange={this.handleChangePilihan} />
            </div>
            <div className="w-10 f3 flex items-center justify-center">+</div>
            <div className="w-30">
              <InputNumber name="bobotEssay" value={bobotEssay} placeholder="essay" onChange={this.handleChangeEssay} />
            </div> 
            <div className="w-10 f3 flex items-center justify-center">=</div>
            <div className="w-20">
              <InputText value={isNaN(totalBobot) ? 0:totalBobot } readonly={true} />
            </div>
            </div>      
          </div>
        </div>
        </div>
        </div>
        </div>
        <div className="w-100 flex mb1">
          <div className="w-40 mr1">
            <div className="flex bg-white justify-between items-center ph2" style={{height:"50px",border:"1px solid rgba(0, 0, 0, 0.125)"}}>
              <span className="f5 b">Soal yang dipilih</span>
              <span className="f5">20 terpilih</span>
            </div>
            <div className="bg-white paket-container">
              {paketPilihan.length > 0 && (<span className="f6 b pv1 bb b--primary mb2 primary bw1">Pilihan ganda</span>)}

              {paketEssay.length > 0 && (<span className="f6 b pv1 bb b--primary mb2 primary bw1">Essay</span>)}

            </div>
          </div>
          <div className="w-60">
          <Tabs>
            <div label="Pilihan ganda">
                            
              <div className="flex justify-center items-center pa3 flex-column w-100" style={{border:"3px dashed rgba(0, 0, 0, 0.125)",height:200}}>
                <span className="f4 gray">Soal pilihan ganda kosong</span>
                <span className="f7 gray i">Silahkan pilih semester pada tombol dropdown diatas</span>
              </div>
              
            </div>
            <div label="Essay">
                            
              <div className="flex justify-center items-center pa3 flex-column w-100" style={{border:"3px dashed rgba(0, 0, 0, 0.125)",height:200}}>
                <span className="f4 gray">Soal essay kosong</span>
                <span className="f7 gray i">Silahkan pilih semester pada tombol dropdown diatas</span>
              </div>
                               
            </div>  
          </Tabs>
          </div>
        </div>
        <div className="flex items-center justify-center bg-near-white mb3" style={{border:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>            
            <button type="submit" className={`${uploadClass} dim pointer w-30 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary`} disabled={uploadDisable} onClick={this.newPaket}>Tambahkan paket soal</button> 
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

  handleChangePilihan = (event) => { 
    const {bobotPilihan} = this.state;    
    const target = event.target;     
    const value = target.validity.valid ? target.value : bobotPilihan;    
    const name = target.name;    
    const numericRegex = /^(0|[1-9][0-9]?|100)$/;
    if(numericRegex.test(value) || value === "") {
      this.setState({ [name]: value });
    }     
  }

  handleChangeEssay = (event) => {
    const {bobotEssay} = this.state;    
    const target = event.target;    
    const value = target.validity.valid ? target.value : bobotEssay;    
    const name = target.name;
    const numericRegex = /^(0|[1-9][0-9]?|100)$/;
    if(numericRegex.test(value) || value === "") {
      this.setState({ [name]: value });
    }      
  }

  handleSelectPilihan = (value) => {
    this.setState({semesterPickPilihan:value},() => this.fetchPilihanSoal(value));
  }

  handleSelectEssay = (value) => {
    this.setState({semesterPickEssay:value},() => this.fetchEssaySoal(value));
  }

  fetchPilihanSoal = (value) => {  
    if(value === "disable"){
      return false;
    }
    console.log(value);
  }

  fetchEssaySoal = (value) => {
    if(value === "disable"){
      return false;
    }
    console.log(value);
  }
  /*--- fetch data ---*/
   fetchData = (tingkat,mapel,semester) => {   
    axios.get(
      window.location.origin + `/api/pendidik/aplikasi/quiz/index/${tingkat}/${mapel}/${semester}?&nocache=`+Date.now()
    ).then(response => {      
      this.setState({
        semester:response.data.message.semester,        
        tingkatan:response.data.message.tingkatan,
        mapel:response.data.message.mapel,
        semesterData:response.data.message.semesterdata
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /*--- post data ---*/
  newPaket = () => {
    console.log("new paket soal");
  }
  /*--- Logout ---*/
  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];  
    this.navigate("/", { replace: true });    
  }
  // ---------------------------- end of script
}

export default PageAplikasiQuizPaketSoalAdd;