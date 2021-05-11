import React from 'react';
import axios from 'axios';
import {Redirect,withRouter} from "react-router";

class PageLogin extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLogin:false
    }    
  }

  componentDidMount() {     
    const data = window.localStorage.getItem('userToken');
    if (data){
      this.setState({isLogin:true})
    }
  }

  render() {
    const {isLogin} = this.state;
    if(isLogin){return <Redirect to={"/"} />;} 
    return (
    <div className="page-login">    
        <h1>Halaman Login</h1>
    </div>
    );
  }
  // ---------------------------- script 
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