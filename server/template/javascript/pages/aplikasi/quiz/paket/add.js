import React from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Breadcrumb } from "../../../../components/menu";
import { Cards,InputText,InputNumber } from "../../../../components/forms";
import { ToastContainer, toast } from 'react-toastify';

class PageAplikasiQuizPaketSoalAdd extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
          data:[],
          bobotPilihan:0,
          bobotEssay:0,           
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
    const {uploadProgress,uploadDisable,tingkatan,mapel,semester,bobotPilihan,bobotEssay} = this.state; 
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
        <div className="mw9 center cf ph3 flex">
        <div className="w-100">
        <Cards title="Menambahkan paket soal" bodyClass="flex">
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
        </Cards>
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