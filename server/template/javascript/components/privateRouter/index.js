import React , {useState,useEffect} from 'react';
import { Route,Redirect} from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Sidebar from "../sidebar";
import {LogoutDialog} from "../dialog";

function PrivateRoute({ component: Component, ...rest }) {

    const [show, setShow] = useState(false); 
    const authData = window.localStorage.getItem('userToken');
    const tokenData = authData ? jwt_decode(authData):false;      
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);   

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + authData;
    });

    const logOut = () => {
        setShow(false);
        window.localStorage.removeItem('userToken');
        delete axios.defaults.headers.common['Authorization'];          
    }
  
    return (    
      <Route
        {...rest}
        render={({ props={authData:authData,tokenData:tokenData} }) =>
        authData ? (            
              <div className="wrapper">
              <LogoutDialog show={show} close={handleClose} onClick={logOut}/>
              <Sidebar superuser={tokenData.superuser} username={tokenData.username} jenis={tokenData.jenis} modalShow={handleShow}/>          
              <div id="main" className="main">              
                <Component {...props}/>
              </div>                   
              </div>
          ):(
            <Redirect to={{pathname: "/login"}}/>
          )        
        }
      />
    );  
}

export default PrivateRoute;