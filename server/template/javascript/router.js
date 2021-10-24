import React from 'react';
import {HashRouter,Switch,Route } from "react-router-dom";
import Modal from 'react-modal';
import PrivateRoute from "./components/privateRouter"; 
/* pages */
import PageLogin from "./pages/login";
import Page404 from './pages/other/404';
//----- Page
import PageAplikasi from './pages/aplikasi';
//---- sekolah
import PageSekolah from './pages/sekolah';
import PageSekolahKelas from './pages/sekolah/kelas';
import PageSekolahKelasSub from './pages/sekolah/kelas/subkelas';
//----- profile
import PageProfile from './pages/profile';
import PageProfileFoto from './pages/profile/foto';
import PageProfilePassword from './pages/profile/password';
//----------- end
Modal.setAppElement('#root');

export default function RouterApp() {    
  return (
    <HashRouter>
        <Switch>
          <Route exact path="/login">
            <PageLogin />
          </Route>
          <PrivateRoute exact path="/" component={PageAplikasi} />
          <PrivateRoute exact path="/sekolah" component={PageSekolah} />  
          <PrivateRoute exact path="/sekolah/kelas" component={PageSekolahKelas} /> 
          <PrivateRoute exact path="/sekolah/kelas/:kelasID" component={PageSekolahKelasSub} /> 
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