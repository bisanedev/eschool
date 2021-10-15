import React , {useState,useEffect} from 'react';
import { Route,Redirect} from "react-router-dom";
import axios from 'axios';
import Modal from 'react-modal';
import jwt_decode from "jwt-decode";
import Sidebar from "../sidebar";

Modal.setAppElement('#root');

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
              <Modal isOpen={show} closeTimeoutMS={500}
                className={{base: 'dialog shadow-3',afterOpen: 'dialog-base_after-open',beforeClose: 'dialog-base_before-close'}}
                overlayClassName={{base: 'overlay-base',afterOpen: 'overlay-base_after-open',beforeClose: 'overlay-base_before-close'}}
              >
                <i className="fas fa-power-off dialog-icon bg-dark-red"/>
                <div className="dialog-close dim" onClick={handleClose}><i className="fas fa-times"/></div>
                <div className="dialog-data fr">
                    <div className="dialog-body">
                      <span className="dialog-title pb2">Logout</span>
                      <span className="dialog-subtitle">Apakah anda yakin logout ??</span>                    
                    </div>                  
                    <div className="dialog-button">
                      <button type="button" style={{cursor: "pointer"}} className="w3 tc f7 link dim br2 ba ph3 pv2 dib bg-grey" onClick={handleClose}>BATAL</button>
                      <button type="button" style={{cursor: "pointer"}} className="w4 tc b ml2 f7 link dim br2 ba ph3 pv2 dib white bg-dark-red" onClick={logOut}>LOGOUT</button>
                    </div>
                </div>
              </Modal>
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