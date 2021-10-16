import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import Breadcrumb from '../../../components/breadcrumb';
import { ToastContainer, toast } from 'react-toastify';

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
    const {curPasswordT,newPasswordT,rePasswordT} = this.state;    
    return (
    <>  
    <div className="konten"> 
        <Helmet>
          <title>Ganti Password - Nama Sekolah</title>
        </Helmet>   
        <div className="headings">
          <div className="title">Ganti password</div>
          <div className="subtitle">Silahkan untuk mengubah kata sandi Anda </div>          
          <Breadcrumb homeUrl="/profile" homeText="Profil"> 
            <li><a href="#/profile/password"><span>Password</span></a></li>            
            <li><a href="#"><span>Ganti password</span></a></li> 
          </Breadcrumb>   
        </div>
        <div className="mw9 center cf ph3 mb3 profile-password">
          <div className="bg-white mr2 br2 mb2" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
            <div className="pa3 white bg-primary">
                <span className="f4">Masukan password baru anda</span>
            </div>
            <div className="pa3">
              <div className="w-30 pr3 mb3">
                <label className="f5 fw4 db mb2">Password saat ini</label>
                <div className="input-password">
                  <input name="curPassword" className="input-reset ba b--black-20 pa2 db w-100"  type={curPasswordT ? "text" : "password"} onChange={this.handleInputChange} />           
                  <div className="view-password" onClick={this.toggleShowCur}>
                    {curPasswordT ? <i className="far fa-eye"/>:<i className="far fa-eye-slash"/>}              
                  </div> 
                </div>
              </div>
              <div className="w-30 pr3 mb3">
                <label className="f5 fw4 db mb2">Password baru</label>
                <div className="input-password ba b--black-20">
                  <input name="newPassword" className="input-reset pa2 db w-100"  type={newPasswordT ? "text" : "password"} onChange={this.handleInputChange} />           
                  <div className="view-password" onClick={this.toggleShowNew}>
                    {newPasswordT ? <i className="far fa-eye"/>:<i className="far fa-eye-slash"/>}              
                  </div>
                </div> 
              </div>
              <div className="w-30 pr3 mb3">
                <label className="f5 fw4 db mb2">Ketik ulang password baru</label>
                <div className="input-password">
                  <input name="rePassword" className="input-reset ba b--black-20 pa2 db w-100"  type={rePasswordT ? "text" : "password"} onChange={this.handleInputChange} />           
                  <div className="view-password" onClick={this.toggleShowRe}>
                    {rePasswordT  ? <i className="far fa-eye"/>:<i className="far fa-eye-slash"/>}              
                  </div>
                </div>
              </div>
              <button type="submit" style={{cursor: "pointer"}} className="w-20 tc f6 link dim br2 ba ph3 pv2 mb2 mt2 dib white bg-primary" onClick={this.changePassword}>Ganti Password</button>
            </div>
          </div>
        </div>                          
    </div>
    <ToastContainer />
    </>
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

    this.setState({curPasswordE:"",newPasswordE:"",rePasswordE:""});        

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
        toast.warn(error.response.data.message);               
      }  
      if(error.response.status == 401){
        this.logout();
      }                    
      if(error.message === "Network Error"){ 
        toast.error("Jaringan internet tidak tersambung");                    
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