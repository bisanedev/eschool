import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../../components/breadcrumb';
import { Alert } from 'react-bootstrap';


class PageProfilePassword extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      curPassword:"",
      curPasswordT:false,
      newPassword:"",
      newPasswordT:false,
      rePassword:"",
      rePasswordT:false,
      alertMsg:"",
    }
    this.handleInputChange = this.handleInputChange.bind(this);    
  }

  componentDidMount() {     

  }

  render() {
    const {alertMsg,curPasswordT,newPasswordT,rePasswordT} = this.state;    
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
        <div className="container profile">
          <div className="row">          
          <div className="col-md-6">
            <div className="card p-3 mb-3">
              <span className="cardTitle mb-3">Masukan password baru anda</span>              
              <div className="p-1">
                <label className="form-label">Password saat ini</label>
                <div className="input-group">
                <input type={curPasswordT ? "text" : "password"}  name="curPassword" className="form-control" onChange={this.handleInputChange} required/>
                <div className="input-group-text" style={{cursor:"pointer"}} onClick={() =>  this.toggleShowCur()}>
                  {curPasswordT ? <div className="material-icons-outlined">visibility_off</div>:<div className="material-icons-outlined">visibility</div>}              
                </div>
                </div>
              </div>
              <div className="p-1">
                <label className="form-label">Password baru</label>
                <div className="input-group">
                <input type={newPasswordT ? "text" : "password"} name="newPassword" className="form-control" onChange={this.handleInputChange} required/>
                <div className="input-group-text" style={{cursor:"pointer"}} onClick={() =>  this.toggleShowNew()}>
                  {newPasswordT ? <div className="material-icons-outlined">visibility_off</div>:<div className="material-icons-outlined">visibility</div>}              
                </div>
                </div>                
              </div>
              <div className="p-1 mb-3">
                <label className="form-label">Ketik ulang password baru </label>
                <div className="input-group">
                <input type={rePasswordT ? "text" : "password"} name="rePassword" className="form-control" onChange={this.handleInputChange} required/>
                <div className="input-group-text" style={{cursor:"pointer"}} onClick={() => this.toggleShowRe()}>
                  {rePasswordT ? <div className="material-icons-outlined">visibility_off</div>:<div className="material-icons-outlined">visibility</div>}              
                </div>
                </div>                            
              </div>
              <div className="p-1 mb-3">
                <button type="submit" className="btn btn-primary" onClick={() => this.changePassword()}>Ganti password</button>
              </div>
              {alertMsg != "" &&                
                <Alert variant="warning" onClose={() => this.setState({alertMsg:""})} dismissible>
                  {alertMsg}
                </Alert>                
              }                         
            </div>
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

  changePassword = () => {   
    const {curPassword,newPassword,rePassword} = this.state;     
    this.setState({alertMsg:""});
    if(newPassword != rePassword){
      this.setState({alertMsg:"Password baru dan password konfirmasi tidak sama !"});
      return false;
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
          this.setState({curPassword:"",newPassword:"",rePassword:"",alertMsg:""},() => this.props.history.push('/profile'));
        }
    }).catch(error => {
      this.setState({alertMsg: error.response.data.message}); 
      if(error.response.status == 401){
        this.logout();
      }                    
      if(error.message === "Network Error"){          
        this.setState({alertMsg: "Jaringan internet tidak tersambung"});
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