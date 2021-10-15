import React from 'react';
import {HashRouter,Switch,Route } from "react-router-dom";
import PrivateRoute from "./components/privateRouter"; 
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
          <PrivateRoute exact path="/" component={PageAplikasi} />
          <PrivateRoute exact path="/sekolah" component={PageSekolah} />  
          <PrivateRoute exact path="/profile" component={PageProfile} /> 
          <PrivateRoute exact path="/profile/foto" component={PageProfileFoto} />
          <PrivateRoute exact path="/profile/password" component={PageProfilePassword} />          
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
    </HashRouter>
  );
}