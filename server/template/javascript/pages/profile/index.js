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
        <div className="mw9 center">
        <div className="cf ph3 mb3 flex">
          <div className="profile bg-white mr2 br2">
              <div className="pa3 bg-primary white">
                <span className="f4">Profil anda</span>
              </div>
              <div className="pa3">
                <div className="profile-foto mb3 pa2">
                  {foto}
                </div>
                <div className="profile-button">                
                  <a href="#/profile/foto" className="w5 tc f7 link dim br2 ba ph3 pv2 dib black bg-light-gray mr1 ba b--light-silver" role="button">Ganti foto</a>
                  <a href="#/profile/password" className="w5 tc f7 link dim br2 ba ph3 pv2 dib black bg-light-gray ml1 ba b--light-silver" role="button">Ganti password</a>
                </div>
              </div>              
          </div>
          <div className="profile-analisis bg-white br2">
              <div className="pa3 bg-primary white">
                <span className="f4">Analisis belajar & kehadiran siswa didikan anda</span>
              </div>
              <div className="pa3">
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