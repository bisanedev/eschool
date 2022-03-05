import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { Breadcrumb } from '../../../components/menu';
import { InputPassword,Cards } from '../../../components/forms';
import { toast } from 'react-toastify';

class PageProfilePassword extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      curPassword:"",            
      newPassword:"",      
      rePassword:"",
      curPasswordError:"",
      newPasswordError:"",
      rePasswordError:""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.navigate = this.props.navigate;     
  }

  componentDidMount() {     

  }
    
  componentWillUnmount() {

  }

  render() {
    const {curPasswordError,newPasswordError,rePasswordError} = this.state;       
    return (    
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
                <InputPassword name="curPassword" onChange={this.handleInputChange} errorMessage={curPasswordError}/>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Password baru</label>
                <InputPassword name="newPassword" onChange={this.handleInputChange} errorMessage={newPasswordError}/>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Ketik ulang password baru</label>
                <InputPassword name="rePassword" onChange={this.handleInputChange} errorMessage={rePasswordError}/>                
              </div>
              <div className="w-100 flex justify-end">
                <button type="submit" style={{cursor: "pointer"}} className="w-30 tc f6 link dim br2 ba ph3 pv2 mb2 mt2 dib white bg-primary b--primary" onClick={this.changePassword}>Perbarui password</button>
              </div>
          </Cards>
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

  changePassword = () => {   
    const {curPassword,newPassword,rePassword} = this.state;           
    this.setState({curPasswordError:"",newPasswordError:"",rePasswordError:""}); 
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
          toast.success("Password berhasil di perbarui");
          this.navigate('/profile');                          
        }
    }).catch(error => {                   
      if(error.response.status == 400){
        if(error.response.data.message["curpassword"]){            
          this.setState({curPasswordError:error.response.data.message["curpassword"]});
        }
        if(error.response.data.message["newpassword"]){
          this.setState({newPasswordError:error.response.data.message["newpassword"]});
        }    
        if(error.response.data.message["repassword"]){
          this.setState({rePasswordError:error.response.data.message["repassword"]});
        }                                            
      }  
      if(error.response.status == 401){
        this.logout();
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