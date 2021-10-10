import React , {useState,useEffect} from 'react';
import axios from 'axios';
import {  
  HashRouter,
  Switch,
  Route, 
  useHistory, 
  Redirect,
} from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Modal,Button } from 'react-bootstrap';
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

  return (    
    <Route
      {...rest}
      render={({ props={authData:authData,tokenData:tokenData} }) =>
      authData ? (            
            <div className="wrapper">
            <Modal show={show} onHide={handleClose} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton>
                <Modal.Title>Konfirmasi</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h5 style={{textAlign:"center"}}>Apakah Anda Yakin Logout ??</h5>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Batal</Button>
                <Button variant="danger" onClick={logOut}>Logout</Button>
              </Modal.Footer>
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