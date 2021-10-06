import React from 'react';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../../components/breadcrumb';

class PageProfileFoto extends React.Component{

  constructor(props) {
    super(props);
    this.state = {

    }    
  }

  componentDidMount() {     

  }

  render() {
    let foto = <img src={"data/users/"+this.props.tokenData.username+".jpg"} onError={(e)=>{e.target.onerror = null; e.target.src=this.props.tokenData.jenis==="pria" ? "assets/images/cowok.png":"assets/images/cewek.png"}} />;
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Ganti foto - Nama Sekolah</title>
        </Helmet>   
        <div className="headings">
          <div className="title" style={{fontSize:"44px",textTransform:"capitalize",height:"55px"}}>Ganti foto</div>
          <div className="subtitle">Silahkan untuk mengganti foto profil anda</div>
          <Breadcrumb homeUrl="/profile" homeIcon={<div className="material-icons-outlined">manage_accounts</div>} homeText="Profil">            
            <li className="breadcrumb-item active" aria-current="page">Ganti foto</li>
          </Breadcrumb>
        </div>
        <div className="container">
          <div className="row">          
          <div className="col-md-12">
            <div className="card p-2">
              <span className="cardTitle mb-3">Masukan foto baru anda</span>
                   
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

export default withRouter(PageProfileFoto);