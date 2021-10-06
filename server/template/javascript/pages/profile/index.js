import React from 'react';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../components/breadcrumb';

class PageProfile extends React.Component{

  constructor(props) {
    super(props);
    this.state = {

    }    
  }

  componentDidMount() {     

  }

  render() {
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Profil - Nama Sekolah</title>
        </Helmet>   
        <div className="headings">
          <div className="title" style={{fontSize:"44px",textTransform:"capitalize",height:"55px"}}>Halo, {this.props.tokenData.username} !</div>
          <div className="subtitle">Selamat datang di halaman menu profil & analisis berdasarkan pengajar tiap kelas </div>
          <Breadcrumb homeUrl="/profile" homeIcon={<div className="material-icons-outlined">manage_accounts</div>} homeText="Profil">            
            <li className="breadcrumb-item active" aria-current="page">Beranda</li>
          </Breadcrumb>
        </div>
        <div className="container">
          <div className="row">          
          <div className="col-md-5">
            <div className="card p-3">
            <span className="cardTitle">Pengaturan profil</span>
            </div>
          </div>
          <div className="col-md-7">
            <div className="card p-3">
            <span className="cardTitle">Analisis belajar & kehadiran siswa didikan anda</span>
            </div>
          </div>  
        </div>        
        </div>                    
    </div>
    );
  }
  // ---------------------------- script 
  
  // ---------------------------- end of script
}

export default withRouter(PageProfile);