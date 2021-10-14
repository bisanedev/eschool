import React , {useState,useEffect} from 'react';
import axios from 'axios';
import {  
  HashRouter,
  Switch,
  Route, 
  useHistory, 
  Redirect,
} from "react-router-dom";
import Modal from 'react-modal';
import jwt_decode from "jwt-decode";
/* component */
import Sidebar from "./components/sidebar"; 
/* pages */
import PageLogin from "./pages/login";
import Page404 from './pages/other/404';
//----- Page
import PageAplikasi from './pages/aplikasi';
import PageSekolah from './pages/sekolah';
import PageProfile from './pages/profile';
import PageProfileFoto from './pages/profile/foto';
import PageProfilePassword from './pages/profile/password';

Modal.setAppElement('#root');

export default function RouterApp() {
    
  return (
    <HashRouter>
        <Switch>
          <Route exact path="/login">
            <PageLogin />
          </Route>
          <PrivateRoute exact path="/" comp={PageAplikasi} />
          <PrivateRoute exact path="/sekolah" comp={PageSekolah} />  
          <PrivateRoute exact path="/profile" comp={PageProfile} /> 
          <PrivateRoute exact path="/profile/foto" comp={PageProfileFoto} />
          <PrivateRoute exact path="/profile/password" comp={PageProfilePassword} />
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
    </HashRouter>
  );
}
// ----- privateRouter
function PrivateRoute({ comp: Component, ...rest }) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);    
  const authData = window.localStorage.getItem('userToken');
  const tokenData = authData ? jwt_decode(authData):false; 

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authData;    
  });

  const logOut = () => {
    setShow(false);    
    window.localStorage.removeItem('userToken');
    delete axios.defaults.headers.common['Authorization']; 
    useHistory().push('/');
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  return (    
    <Route
      {...rest}
      render={({ props={authData:authData,tokenData:tokenData} }) =>
      authData ? (            
            <div className="wrapper">
            <Modal isOpen={show} onAfterOpen={afterOpenModal} closeTimeoutMS={500}
              className={{base: 'dialog',afterOpen: 'dialog-base_after-open',beforeClose: 'dialog-base_before-close'}}
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