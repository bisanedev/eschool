import React from 'react';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../../components/breadcrumb';

class PageProfilePassword extends React.Component{

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
          <title>Ganti Password - Nama Sekolah</title>
        </Helmet>   
        <div className="headings">
          <div className="title" style={{fontSize:"44px",textTransform:"capitalize",height:"55px"}}>Ganti password</div>
          <div className="subtitle">Silahkan untuk mengubah kata sandi Anda </div>
          <Breadcrumb homeUrl="/profile" homeIcon={<div className="material-icons-outlined">manage_accounts</div>} homeText="Profil">            
            <li className="breadcrumb-item active" aria-current="page">Ganti password</li>
          </Breadcrumb>
        </div>
        <div className="container profile">
          <div className="row">          
          <div className="col-md-12">
            <div className="card p-2">
              <span className="cardTitle mb-3">Masukan password baru anda</span>
                  
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

export default withRouter(PageProfilePassword);