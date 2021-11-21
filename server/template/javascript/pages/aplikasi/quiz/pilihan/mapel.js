import React from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";
import {Breadcrumb,MenuText,MenuLoading} from '../../../../components/menu';

class PageAplikasiQuizPilihanMapel extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        data:[],
        isLoading:true,
        tingkatan:""
    }    
    this.navigate = this.props.navigate;
    this.tingkatID = this.props.params.tingkatID;
  }

  componentDidMount() {     
    this.timer = setTimeout(() => this.fetchData(this.tingkatID),300);  
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {data,tingkatan,isLoading} = this.state;    
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Kuis platform - Nama Sekolah</title>
        </Helmet>
        <div className="headings">
          <div className="title">Kuis platform</div>
          <div className="subtitle">Halaman informasi untuk bank soal pilihan ganda</div>
          <Breadcrumb homeUrl="/aplikasi" homeText="Aplikasi">                                            
            <li><a href="#/aplikasi/quiz"><span>Kuis platform</span></a></li>   
            <li><a href="#/aplikasi/quiz/pilihan"><span>Pilihan ganda</span></a></li>               
            <li><a href={"#/aplikasi/quiz/pilihan/"+this.tingkatID}><span>{tingkatan !="" ? tingkatan.nama:"memuat..."}</span></a></li>  
            <li><a href="#"><span>Mata pelajaran</span></a></li>         
          </Breadcrumb>
        </div>        
        <div className="mw9 center">
        <div className="cf ph3 mb3 flex flex-wrap">
        {data.length > 0 && !isLoading && data.map((value,k) => (                   
          <MenuText key={k} url={"/aplikasi/quiz/pilihan/"+ this.tingkatID +"/"+value.id} title={value.nama} style={{backgroundColor:value.color}} color="#fff"/>        
        ))}
        {isLoading && <MenuLoading/> } 
        </div>
        </div>
    </div>
    );
  }
  // ---------------------------- script     
  fetchData = (id) => {     
    this.setState({isLoading:true});
    axios.get(
      window.location.origin + `/api/pendidik/aplikasi/quiz/mapel/${id}?&nocache=`+Date.now()
    ).then(response => {      
      this.setState({
        data:response.data.message.data,        
        tingkatan:response.data.message.tingkatan,
        isLoading:false
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

export default PageAplikasiQuizPilihanMapel;