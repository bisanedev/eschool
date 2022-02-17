import React from 'react';
import axios from 'axios';
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
      rePassword:""      
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.navigate = this.props.navigate;    
  }

  componentDidMount() {     

  }

  render() {       
    return (
    <>  
    <div className="konten"> 
        <Helmet>
          <title>Ganti password - Nama Sekolah</title>
        </Helmet>   
        <div className="headings">
          <div className="title">Ganti password</div>
          <div className="subtitle">Silahkan untuk menganti kata sandi anda </div>          
          <Breadcrumb homeUrl="/profile" homeText="Profil"> 
            <li><a href="#/profile/password"><span>Password</span></a></li>                        
          </Breadcrumb>   
        </div>
        <div className="mw9 center cf ph3 mb3">
          <Cards title="Masukan password baru anda" custom="w-60" bodyClass="pa3">
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Password saat ini</label>
                <InputPassword name="curPassword" onChange={this.handleInputChange}/>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Password baru</label>
                <InputPassword name="newPassword" onChange={this.handleInputChange}/>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Ketik ulang password baru</label>
                <InputPassword name="rePassword" onChange={this.handleInputChange}/>                
              </div>
              <div className="w-100 mb3 flex justify-end">
                <button type="submit" style={{cursor: "pointer"}} className="w-30 tc f6 link dim br2 ba ph3 pv2 mb2 mt2 dib white bg-primary b--primary" onClick={this.changePassword}>Perbarui password</button>
              </div>
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
          this.navigate('/profile');
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
    this.navigate("/", { replace: true });
  }
  // ---------------------------- end of script
}

export default PageProfilePassword;