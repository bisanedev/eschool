import React from 'react';
import axios from 'axios';
import {Navigate,useNavigate } from "react-router-dom";
import { InputText,InputPassword,Checkbox } from '../../components/forms';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';

class Login extends React.Component{

  constructor(props) {
    super(props);
    this.state = {            
      isLogin:false,      
      rememberMe:false,
      username:"",
      password:"",                 
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.navigate = this.props.navigate;
  }

  componentDidMount() {     
    const data = window.localStorage.getItem('userToken');
    if (data){
      this.setState({isLogin:true})
    }
  }

  render() {
    const {isLogin,rememberMe} = this.state;
    if(isLogin){return <Navigate to={"/aplikasi"} />;} 
    return (
    <>
    <div className="login-page">
        <Helmet>
          <title>Login - Nama Sekolah</title>
        </Helmet>
        <div className="logo">
          <img src="assets/images/logo.png" alt="Logo Sekolah"/> 
        </div>
        <div className="form">
          <h4 className="fw4" style={{fontSize:"22px",lineHeight:0}}>User & Pendidik Login</h4>
          <div className="w-100 ph3 mb2">
            <label className="f5 fw4 db mb2">Username</label>
            <InputText name="username" onChange={this.handleInputChange} />                      
          </div>
          <div className="w-100 ph3 pr3 mb3">
            <label className="f5 fw4 db mb2">Password</label>
            <InputPassword name="password" onChange={this.handleInputChange}/>           
          </div>
          <div className="rowButton w-100 ph3">            
            <Checkbox name="rememberMe" text="Ingat saya" checked={rememberMe} onChange={this.handleInputChange} />
            <button type="submit" style={{cursor: "pointer"}} className="w4 tc ml4 f6 link dim br2 ba ph3 pv2 dib white bg-primary b--primary" onClick={this.SubmitLogin}>Login</button>
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
    if(name === "username"){
      this.setState({ [name]: value.split(" ").join("")});
    }else{
      this.setState({ [name]: value});
    } 
  } 
  //submit
  SubmitLogin = () => {
    const {username,password,rememberMe} = this.state;       
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);    
    formData.append('remember', rememberMe ? 'Yes' : 'No');  
    //submit login siswa
    axios({
        method: 'post',
        url: '/api/pendidik/auth',
        data: formData
    }).then(response => {                 
        if(response.data.status == true)
        {           
          window.localStorage.setItem("userToken", response.data.message);          
          this.navigate("/aplikasi");
        }
    }).catch(error => {
        if(error.response.status == 401){
          toast.warn(error.response.data.message);         
        }        
        if(error.message === "Network Error"){ 
          toast.error("Jaringan internet tidak tersambung");                    
        }       
    });
  }  
  // ---------------------------- end of script
}
function PageLogin(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />
}

export default PageLogin;