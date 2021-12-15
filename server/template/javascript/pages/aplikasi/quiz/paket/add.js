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
          pilihan:[],
          essay:[],
          acak:false,         
          isLoading:true,      
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
    const {uploadProgress,uploadDisable,tingkatan,mapel,semester,bobotPilihan,bobotEssay,acak} = this.state; 
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
        <div className="w-100 flex mb3">
          <div className="w-40 mr1">
            <div className="flex bg-white justify-between items-center ph2" style={{height:"49px",border:"1px solid rgba(0, 0, 0, 0.125)"}}>
              <span className="f5 b">Soal yang dipilih</span>
              <span className="f5">20 terpilih</span>
            </div>
            <div className="bg-white paket-container">
              
            </div>
          </div>
          <div className="w-60">
          <Tabs>
            <div label="Pilihan ganda">
              Pilih soal Pilihan ganda
            </div>
            <div label="Essay">
              pilih soal Essay
            </div>  
          </Tabs>
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

  /*--- fetch data ---*/
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
  /*--- Logout ---*/
  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];  
    this.navigate("/", { replace: true });    
  }
  // ---------------------------- end of script
}

export default PageAplikasiQuizPaketSoalAdd;