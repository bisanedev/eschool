import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../../components/breadcrumb';

class PageProfilePassword extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      curPassword:"",
      curPasswordT:false,
      curPasswordE:"",
      newPassword:"",
      newPasswordT:false,
      newPasswordE:"",
      rePassword:"",
      rePasswordT:false,
      rePasswordE:"",
      validated:false
    }
    this.handleInputChange = this.handleInputChange.bind(this);    
  }

  componentDidMount() {     

  }

  render() {
    const {validated,curPassword,curPasswordT,curPasswordE,newPassword,newPasswordT,newPasswordE,rePassword,rePasswordT,rePasswordE} = this.state;    
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Ganti Password - Nama Sekolah</title>
        </Helmet>   
        <div className="headings">
          <div className="title">Ganti password</div>
          <div className="subtitle">Silahkan untuk mengubah kata sandi Anda </div>
          <Breadcrumb homeUrl="/profile" homeIcon={<div className="material-icons-outlined">manage_accounts</div>} homeText="Profil">            
            <li className="breadcrumb-item" aria-current="page"><a href="#/profile/password">Password</a></li>
            <li className="breadcrumb-item active" aria-current="page">Ganti password</li>
          </Breadcrumb>
        </div>
        <div className="container">          
          <div className="col-md-6">
            <div className="card p-3 mb-3">
              <span className="cardTitle mb-3">Masukan password baru anda</span>              
              
            </div>
          </div>                          
        </div>                    
    </div>
    );
  }
  // ---------------------------- script 
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  toggleShowCur = () => {
    const {curPasswordT} = this.state; 
    this.setState({curPasswordT:  !curPasswordT });
  };

  toggleShowNew = () => {
    const {newPasswordT} = this.state; 
    this.setState({newPasswordT:  !newPasswordT });
  };

  toggleShowRe = () => {
    const {rePasswordT} = this.state; 
    this.setState({rePasswordT:  !rePasswordT });
  };

  changePassword = (event) => {   
    const {curPassword,newPassword,rePassword} = this.state;    
    const form = event.currentTarget;    
    event.preventDefault();
    event.stopPropagation();

    this.setState({curPasswordE:"",newPasswordE:"",rePasswordE:"",validated:true});
    console.log(form.checkValidity());    

    if (form.checkValidity() === true) {
      console.log("berhasil")
    }

    var formData = new FormData();
    formData.append('curPassword', curPassword);
    formData.append('newPassword', newPassword);    
    formData.append('rePassword', rePassword);  
    //submit login siswa
    axios({
        method: 'patch',
        url: '/api/pengajar/profile/password',
        data: formData
    }).then(response => {                 
        if(response.data.status == true)
        {                                
          this.props.history.push('/profile');
        }
    }).catch(error => {      
      if(error.response.status == 400){
        console.log(error.response.data.message);
        console.log(form.checkValidity());
        // if(typeof error.response.data.message === 'object'){                
        //   this.setState({          
        //     curPasswordE: error.response.data.message.curPassword,
        //     newPasswordE: error.response.data.message.newPassword,
        //     rePasswordE: error.response.data.message.rePassword          
        //   });
        // }else{
        //   console.log(error.response.data.message);
        // }
      }  
      if(error.response.status == 401){
        this.logout();
      }                    
      if(error.message === "Network Error"){          
        this.setState({validated:false,rePasswordE: "Jaringan internet tidak tersambung"});
      }       
    });
  }

  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization']; 
    this.props.history.push('/');
  }
  // ---------------------------- end of script
}

export default withRouter(PageProfilePassword);