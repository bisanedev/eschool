import React from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Breadcrumb } from '../../components/menu';
import { Cards } from '../../components/forms';
import { DeleteDialog } from '../../components/dialog';
import { ToastContainer, toast } from 'react-toastify';

class PageProfile extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      showHapusFoto:false,
      foto:true,
    } 
    this.tokenData = this.props.tokenData;   
  }

  componentDidMount() {     

  }

  render() {    
    const {showHapusFoto,foto } = this.state;
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Profil - Nama Sekolah</title>
        </Helmet>   
        <div className="headings">
          <div className="title">Halo, {this.props.tokenData.username} !</div>
          <div className="subtitle">Selamat datang di halaman menu profil & analisis berdasarkan pendidik tiap kelas </div>
          <Breadcrumb homeUrl="/profile" homeText="Profil">            
            <li><a href="#"><span>Beranda</span></a></li> 
          </Breadcrumb>
        </div>
        <div className="mw9 center">
        <div className="cf ph3 mb3 flex">
          <Cards custom="profile" title="Profil anda" bodyClass="pa3">
            <div className="profile-foto mb3 pa2">
              {foto ? 
                <div className="relative">
                 <div className="link dim deleteFotoButton flex justify-center items-center" onClick={() => this.setState({showHapusFoto:true})}>
                  <i className="material-icons-outlined" style={{fontSize: "14px"}}>close</i>
                 </div>
                 <img src={"data/users/"+this.tokenData.username+".jpg?nocache="+Date.now()} onError={(e)=>{e.target.onerror = null;this.setState({foto:false})}}/>
                </div>
                :
                <img src={this.tokenData.jenis === "l" ? "assets/images/cowok.png":"assets/images/cewek.png"}/> 
              }
            </div>
            <div className="profile-button">                
              <a href="#/profile/foto" className="w-100 tc f7 link dim br2 ba ph3 pv2 dib black bg-light-gray mb1 ba b--light-silver" role="button">Ganti foto</a>
              <a href="#/profile/password" className="w-100 tc f7 link dim br2 ba ph3 pv2 dib black bg-light-gray ba b--light-silver" role="button">Ganti password</a>
            </div>
          </Cards>  
          <Cards custom="profile-analisis" title="Analisis belajar & kehadiran siswa didikan anda"> 
          </Cards>        
        </div>
        </div> 
        <DeleteDialog show={showHapusFoto} 
          title="Hapus" subtitle={"Yakin hapus foto profil ??"} 
          close={() => this.setState({showHapusFoto:false})}        
          onClick={() => this.profileFotoDelete()}
        /> 
        <ToastContainer />            
    </div>
    );
  }
  // ---------------------------- script 
  profileFotoDelete = () => {          
    var formData = new FormData();
    formData.append('id',this.tokenData.uid);
    formData.append('username',this.tokenData.username);
    axios({
      method: 'delete',
      url: window.location.origin +'/api/pendidik/profile/foto',
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {            
        this.setState({showHapusFoto:false});
      }
    }).catch(error => {
      if(error.response.status == 401){
        this.logout();
      }
      if(error.response.status == 400){       
        toast.warn(error.response.data.message);  
      }
    });
  }
  // ---------------------------- end of script
}

export default PageProfile;