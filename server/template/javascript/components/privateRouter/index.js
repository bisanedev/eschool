import React , {useState,useEffect} from 'react';
import {Navigate,useParams,useNavigate  } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import Sidebar from "../sidebar";
import {LogoutDialog} from "../dialog";

function PrivateRoute(props) {
    const [show, setShow] = useState(false); 
    const authData = window.localStorage.getItem('userToken');
    const tokenData = authData ? jwt_decode(authData):false;      
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);  
    const params = useParams();   
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + authData;
    });
  
    const logOut = () => {
      setShow(false);
      window.localStorage.removeItem('userToken');
      delete axios.defaults.headers.common['Authorization'];          
    }
  
    return authData ? (
      <div className="wrapper">
        <LogoutDialog show={show} close={handleClose} onClick={logOut}/>
        <Sidebar superuser={tokenData.superuser} username={tokenData.username} jenis={tokenData.jenis} modalShow={handleShow}/>
        <div id="main" className="main"> 
          <props.komponen authData={authData} tokenData={tokenData} params={params} navigate={navigate} />
        </div>
      </div>          
    ):(
      <Navigate to="/login" />
    )  
}

export default PrivateRoute;