import React from 'react';
import axios from 'axios';
import {Redirect,withRouter} from "react-router";
import { Helmet } from 'react-helmet';

class PageLogin extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLogin:false,
      passwordShown:false,
      rememberMe:false,
      username:"",
      password:""
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
    <div className="login-alert">
    <div className="alert alert-warning alert-dismissible fade show" role="alert">
      <strong>Holy guacamole!</strong> You should check in on some of those fields below.
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    </div>
    <div className="login-page">
        <Helmet>
          <title>Halaman - Login</title>
        </Helmet>
        <div className="logo">
          <img src="assets/images/logo.png" alt="Logo Sekolah"/> 
        </div>
        <div className="form">
          <h4 className="mb-3">Pengajar Login</h4>
          <div className="form-floating mb-2" style={{width:"90%"}}>
            <input name="username" type="username" className="form-control" onChange={this.handleInputChange} id="floatingInput" placeholder="username"/>
            <label htmlFor="floatingInput">Username</label>
          </div>
          <div className="form-floating mb-3" style={{width:"90%"}}>
            <input name="password" type={passwordShown ? "text" : "password"} className="form-control" onChange={this.handleInputChange} id="floatingPassword" placeholder="Password"/>
            <label htmlFor="floatingPassword">Password</label>
            <div className="viewPassword" onClick={this.togglePasswordVisiblity}>
              {passwordShown ? <div className="material-icons-outlined" style={{fontSize:"32px"}}>visibility_off</div>:<div className="material-icons-outlined" style={{fontSize:"32px"}}>visibility</div>}              
            </div>            
          </div>
          <div className="rowButton">
          <div className="form-check">
            <input name="rememberMe" className="form-check-input" type="checkbox" checked={rememberMe} onChange={this.handleInputChange} id="flexCheckDefault"/>
            <label className="form-check-label" htmlFor="flexCheckDefault">Ingat saya</label>
          </div>
          <button type="button" className="btn btn-primary" style={{width:"90%"}}>Login</button>
          </div>
        </div>
    </div>
    </> 
    );
  }
  // ---------------------------- script 
  handleInputChange(event) {
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
  SubmitLogin() {
    this.setState({inputError:""});     
    var formData = new FormData();
    formData.append('username', this.state.Username);
    formData.append('password', this.state.Password);    
    formData.append('remember', this.state.Remember ? 'Yes' : 'No');  
    //submit login siswa
    axios({
        method: 'post',
        url: '/api/auth',
        data: formData
    }).then(response => {                 
        if(response.data.status == true)
        {           
          window.localStorage.setItem("userToken", response.data.message.data);            
          axios.defaults.headers.common['Authorization'] = "Bearer "+response.data.message.data;  
          this.props.history.push('/');
        }
    }).catch(error => {        
        if(error.message === "Network Error"){          
          alert("Jaringan Mati");
        }
        if(error.response.status == 401){                             
          alert(error.response.data.message);
        }
        if(error.response.status == 400){
          alert(error.response.data.message);
        }
    });
  }  
  // ---------------------------- end of script
}

export default withRouter(PageLogin);