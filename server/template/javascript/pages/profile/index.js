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
    let foto = <img src={"data/users/"+this.props.tokenData.username+".jpg?nocache="+Date.now()} onError={(e)=>{e.target.onerror = null; e.target.src=this.props.tokenData.jenis==="pria" ? "assets/images/cowok.png":"assets/images/cewek.png"}} />;
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Profil - Nama Sekolah</title>
        </Helmet>   
        <div className="headings">
          <div className="title">Halo, {this.props.tokenData.username} !</div>
          <div className="subtitle">Selamat datang di halaman menu profil & analisis berdasarkan pengajar tiap kelas </div>
          <Breadcrumb homeUrl="/profile" homeText="Profil">            
            <li><a href="#"><span>Beranda</span></a></li> 
          </Breadcrumb>
        </div>
        <div className="container profile">
          <div className="row">          
          <div className="col-md-3">
            <div className="card p-3">
              <span className="cardTitle mb-1">Pengaturan profil</span>
              <div className="profile-foto mt-2 mb-3">
                {foto}
              </div>
              <div className="profile-button">
                <a href="#/profile/foto" className="btn btn-primary btn-sm me-2" role="button">Ganti foto</a>
                <a href="#/profile/password" className="btn btn-secondary btn-sm " role="button">Ganti password</a>
              </div>                    
            </div>
          </div>
          <div className="col-md-9">
            <div className="card p-3">
            <span className="cardTitle mb-3">Analisis belajar & kehadiran siswa didikan anda</span>
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