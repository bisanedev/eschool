import React from 'react';
import axios from 'axios';
import {Redirect,withRouter} from "react-router";
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';

class PageLogin extends React.Component{

  constructor(props) {
    super(props);
    this.state = {            
      isLogin:false,
      passwordShown:false,
      rememberMe:false,
      username:"",
      password:"",                 
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {     
    const data = window.localStorage.getItem('userToken');
    if (data){
      this.setState({isLogin:true})
    }
  }

  render() {
    const {isLogin,passwordShown,rememberMe} = this.state;
    if(isLogin){return <Redirect to={"/"} />;} 
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
          <h4 className="fw4" style={{fontSize:"22px",lineHeight:0}}>Pengajar Login</h4>
          <div className="w-100 ph3 mb2">
            <label className="f5 fw4 db mb2">Username</label>
            <input name="username" className="input-reset ba b--black-20 pa2 db w-100" type="text" onChange={this.handleInputChange}/>           
          </div>
          <div className="w-100 ph3 pr3 mb3" style={{position:"relative"}}>
            <label className="f5 fw4 db mb2">Password</label>
            <input name="password" className="input-reset ba b--black-20 pa2 db w-100"  type={passwordShown ? "text" : "password"} onChange={this.handleInputChange} />           
            <div className="viewPassword" onClick={this.togglePasswordVisiblity}>
              {passwordShown ? <i className="far fa-eye" style={{fontSize:"20px"}}/>:<i className="far fa-eye-slash" style={{fontSize:"20px"}}/>}              
            </div> 
          </div>
          <div className="rowButton w-100 ph3">
            <label className="pa0 ma0 lh-copy f6 pointer"><input name="rememberMe" type="checkbox" checked={rememberMe} onChange={this.handleInputChange}/> Ingat saya</label>    
            <button type="submit" style={{cursor: "pointer"}} className="w4 tc ml4 f6 link dim br2 ba ph3 pv2 mb2 dib white bg-primary" onClick={this.SubmitLogin}>Login</button>
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
  togglePasswordVisiblity = () => {  
    const {passwordShown} = this.state;  
    this.setState({passwordShown:  !passwordShown  });    
  };
  //submit
  SubmitLogin = () => {
    const {username,password,rememberMe} = this.state    
    /* ---- validation ---- */
    if(username == "" && password == "") {
      toast.warn("Input username dan password kosong");
      //return false;
    }
    else if(username == "" ) {
      toast.warn("Input username kosong");
      //return false;
    }
    else if(password == "" ) {
      toast.warn("Input password kosong");
      //return false;
    }

    /* ---- end validation ---- */
    var formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);    
    formData.append('remember', rememberMe ? 'Yes' : 'No');  
    //submit login siswa
    axios({
        method: 'post',
        url: '/api/pengajar/auth',
        data: formData
    }).then(response => {                 
        if(response.data.status == true)
        {           
          window.localStorage.setItem("userToken", response.data.message.data);
          this.props.history.push('/');
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

export default withRouter(PageLogin);