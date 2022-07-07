import React from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";
import {Breadcrumb,MenuText,MenuLoading} from '../../../../components/menu';
import { Link } from "react-router-dom";

class PageAplikasiQuizExam extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        data:[],
        isLoading:true,
    }    
    this.navigate = this.props.navigate;
  }

  componentDidMount() {     
    this.timer = setTimeout(() => this.fetchData(),300);  
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {data,isLoading} = this.state;    
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Kuis platform - Nama Sekolah</title>
        </Helmet>
        <div className="headings">
          <div className="title">Kuis platform</div>
          <div className="subtitle">Halaman informasi ujian</div>
          <Breadcrumb homeUrl="/aplikasi" homeText="Aplikasi">                                            
            <li><Link to="/aplikasi/quiz"><span>Kuis platform</span></Link></li>
            <li><Link to="/aplikasi/quiz/exam"><span>Ujian</span></Link></li>                 
          </Breadcrumb>
        </div>        
        <div className="mw9 center">
        <div className="cf ph3 mb3 flex flex-wrap">
        {data.length > 0 && !isLoading && data.map((value,k) => (                   
          <MenuText key={k} url={"/aplikasi/quiz/exam/"+value.id} jumlah={"Jumlah ujian "+value.jumlah} title={value.nama} color="#333"/>        
        ))}
        {isLoading && <MenuLoading/> } 
        </div>
        </div>
    </div>
    );
  }
  // ---------------------------- script     
  fetchData = () => {     
    this.setState({isLoading:true});
    axios.get(
      window.location.origin + "/api/pendidik/aplikasi/quiz/index/exam?&nocache="+Date.now()
    ).then(response => {      
      this.setState({
        data:response.data.message,        
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

export default PageAplikasiQuizExam;