import React from 'react';
import axios from 'axios';
import {  
  HashRouter,
  Switch,
  Route, 
  useHistory, 
  Redirect,
} from "react-router-dom";
import jwt_decode from "jwt-decode";

/* component */
 import Sidebar from "./components/sidebar"; 
// import Navbar from "./components/navbar";
/* pages */
import PageLogin from "./pages/login";
import Page404 from './pages/other/404';
//----- Page
import PageAplikasi from './pages/aplikasi';
import PageTest from './pages/test';

export default function RouterApp() {
    
  return (  
    <HashRouter>
        <Switch>
          <Route exact path="/login">
            <PageLogin />
          </Route>
          <PrivateRoute exact path="/" comp={PageAplikasi} />          
          <PrivateRoute exact path="/test" comp={PageTest} /> 
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
    </HashRouter>
  );
}
// ----- privateRouter
function PrivateRoute({ comp: Component, ...rest }) {
  let history = useHistory();
  const authData = window.localStorage.getItem('userToken');  
  var akses = authData ? jwt_decode(authData):false;   
  function logOut(){    
    window.localStorage.removeItem('userToken');
    delete axios.defaults.headers.common['Authorization']; 
    history.push('/');
  }
  return (
    <Route
      {...rest}
      render={({ props }) =>
      authData ? (       
            <div className="wrapper">
            <div className="modal fade" id="logoutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-dialog-centered modal-sm">
                <div className="modal-content">
                <div className="modal-header" style={{padding:"5px 10px 5px 10px"}}>
                    <h5 className="modal-title" id="staticBackdropLabel">Konfirmasi</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <h5>Apakah Anda Yakin Logout ??</h5>
                </div>
                <div className="modal-footer" style={{padding:"0px 5px 0px 5px"}}>
                    <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Batal</button>
                    <button type="button" className="btn btn-danger btn-sm" data-bs-dismiss="modal" onClick={logOut}>Logout</button>
                </div>
                </div>
              </div>
            </div>
            <Sidebar superuser={akses.superuser} username={akses.username}/>          
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