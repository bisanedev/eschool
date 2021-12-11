import React from "react";
import axios from "axios";
import Cropper from "react-cropper";
import { Helmet } from "react-helmet";
import { Breadcrumb } from "../../../../components/menu";
import { Cards } from "../../../../components/forms";
import { ToastContainer, toast } from 'react-toastify';

class PageAplikasiQuizPaketSoalAdd extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
          data:[],
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
    const {uploadProgress,uploadDisable,tingkatan,mapel,semester} = this.state; 
    const uploadClass = uploadProgress ? "progress-active":"";     
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