import React from 'react';
import {  
  HashRouter,
  Switch,
  Route,  
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
  const authData = window.localStorage.getItem('userToken');
  var akses = jwt_decode(authData); 
  return (
    <Route
      {...rest}
      render={({ props }) =>
      authData ? (       
          <div className="wrapper">                                                     
            <Sidebar superuser={akses.superuser}/>          
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
