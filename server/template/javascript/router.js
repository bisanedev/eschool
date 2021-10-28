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
import PageSekolahSemester from './pages/sekolah/semester';
import PageSekolahSemesterSub from './pages/sekolah/semester/subsemester';
import PageSekolahMapel from './pages/sekolah/mapel';
import PageSekolahPendidik from './pages/sekolah/pendidik';
import PageSekolahPendidikAdd from './pages/sekolah/pendidik/add';
import PageSekolahPendidikEdit from './pages/sekolah/pendidik/edit';
import PageSekolahSiswa from './pages/sekolah/siswa';
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
          <PrivateRoute exact path="/sekolah/semester" component={PageSekolahSemester} /> 
          <PrivateRoute exact path="/sekolah/semester/:semesterID" component={PageSekolahSemesterSub} /> 
          <PrivateRoute exact path="/sekolah/mapel" component={PageSekolahMapel} />
          <PrivateRoute exact path="/sekolah/pendidik" component={PageSekolahPendidik} />
          <PrivateRoute exact path="/sekolah/pendidik/add" component={PageSekolahPendidikAdd} />
          <PrivateRoute exact path="/sekolah/pendidik/edit/:userID" component={PageSekolahPendidikEdit} />
          <PrivateRoute exact path="/sekolah/siswa" component={PageSekolahSiswa} />
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