import React from 'react';
import {  
  HashRouter,
  Switch,
  Route,  
  Redirect,
} from "react-router-dom";

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
//-----------
const Auth = {
  isAuthenticated(tipe){
    const data = window.localStorage.getItem('userToken');    
    if (data){
    var akses = jwt_decode(data);    
      if( akses.type === tipe){
        return true;
      }
    }else{
      return false;
    }
  },
  isAuth(){
    //const data = true;
    const data = window.localStorage.getItem('userToken');      
    if(data){
      return true;
    }else{
      return false;
    }
  }
}
//privateRouter
function PrivateRoute({ comp: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ props }) =>
        Auth.isAuth() ? (         
          <div className="wrapper">                                                     
            <Sidebar/>          
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
