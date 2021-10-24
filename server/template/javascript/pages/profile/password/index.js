import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import { Breadcrumb } from '../../../components/menu';
import { InputPassword,Cards } from '../../../components/forms';
import { ToastContainer, toast } from 'react-toastify';

class PageProfilePassword extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      curPassword:"",            
      newPassword:"",      
      rePassword:"",      
      validated:false
    }
    this.handleInputChange = this.handleInputChange.bind(this);    
  }

  componentDidMount() {     

  }

  render() {       
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
        <div className="mw9 center cf ph3 mb3">
          <Cards title="Masukan password baru anda">
              <div className="w-40 pr3 mb3">
                <label className="f5 fw4 db mb2">Password saat ini</label>
                <InputPassword name="curPassword" onChange={this.handleInputChange}/>
              </div>
              <div className="w-40 pr3 mb3">
                <label className="f5 fw4 db mb2">Password baru</label>
                <InputPassword name="newPassword" onChange={this.handleInputChange}/>
              </div>
              <div className="w-40 pr3 mb3">
                <label className="f5 fw4 db mb2">Ketik ulang password baru</label>
                <InputPassword name="rePassword" onChange={this.handleInputChange}/>                
              </div>
              <button type="submit" style={{cursor: "pointer"}} className="w-20 tc f6 link dim br2 ba ph3 pv2 mb2 mt2 dib white bg-primary b--primary" onClick={this.changePassword}>Ganti Password</button>
          </Cards>
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
        url: '/api/pendidik/profile/password',
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