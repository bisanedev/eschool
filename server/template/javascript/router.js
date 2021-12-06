import React from 'react';
import {HashRouter,Routes,Route,Navigate} from "react-router-dom";
import Modal from 'react-modal';
import PrivateRoute from './components/privateRouter';
/* pages */
import PageLogin from "./pages/login";
import Page404 from './pages/other/404';
//---- Aplikasi
import PageAplikasi from './pages/aplikasi';
import PageAplikasiQuiz from './pages/aplikasi/quiz';
import PageAplikasiQuizPilihan from './pages/aplikasi/quiz/pilihan';
import PageAplikasiQuizPilihanMapel from './pages/aplikasi/quiz/pilihan/mapel';
import PageAplikasiQuizPilihanSemester from './pages/aplikasi/quiz/pilihan/semester';
import PageAplikasiQuizPilihanSoal from './pages/aplikasi/quiz/pilihan/soal';
import PageAplikasiQuizPilihanSoalAdd from './pages/aplikasi/quiz/pilihan/add';
import PageAplikasiQuizPilihanSoalEdit from './pages/aplikasi/quiz/pilihan/edit';
import PageAplikasiQuizEssay from './pages/aplikasi/quiz/essay';
import PageAplikasiQuizEssayMapel from './pages/aplikasi/quiz/essay/mapel';
import PageAplikasiQuizEssaySemester from './pages/aplikasi/quiz/essay/semester';
import PageAplikasiQuizEssaySoal from './pages/aplikasi/quiz/essay/soal';
//---- Sekolah
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
import PageSekolahSiswaAdd from './pages/sekolah/siswa/add';
import PageSekolahSiswaEdit from './pages/sekolah/siswa/edit';
//----- profile
import PageProfile from './pages/profile';
import PageProfileFoto from './pages/profile/foto';
import PageProfilePassword from './pages/profile/password';
//----------- end
Modal.setAppElement('#root');

export default function RouterApp() {    
  return (
    <HashRouter>
        <Routes>
          <Route path="/login" element={<PageLogin />}/> 
          <Route path="/" element={<CheckAuth/>}/> 
          <Route path="/aplikasi" element={<PrivateRoute komponen={PageAplikasi}/>}/>
          <Route path="/aplikasi/quiz" element={<PrivateRoute komponen={PageAplikasiQuiz}/>}/> 
          <Route path="/aplikasi/quiz/pilihan" element={<PrivateRoute komponen={PageAplikasiQuizPilihan}/>}/>
          <Route path="/aplikasi/quiz/pilihan/:tingkatID" element={<PrivateRoute komponen={PageAplikasiQuizPilihanMapel}/>}/>
          <Route path="/aplikasi/quiz/pilihan/:tingkatID/:mapelID" element={<PrivateRoute komponen={PageAplikasiQuizPilihanSemester}/>}/>
          <Route path="/aplikasi/quiz/pilihan/:tingkatID/:mapelID/:semesterID" element={<PrivateRoute komponen={PageAplikasiQuizPilihanSoal}/>}/>          
          <Route path="/aplikasi/quiz/pilihan/:tingkatID/:mapelID/:semesterID/add" element={<PrivateRoute komponen={PageAplikasiQuizPilihanSoalAdd}/>}/>
          <Route path="/aplikasi/quiz/pilihan/:tingkatID/:mapelID/:semesterID/:soalID" element={<PrivateRoute komponen={PageAplikasiQuizPilihanSoalEdit}/>}/>
          <Route path="/aplikasi/quiz/essay" element={<PrivateRoute komponen={PageAplikasiQuizEssay}/>}/>
          <Route path="/aplikasi/quiz/essay/:tingkatID" element={<PrivateRoute komponen={PageAplikasiQuizEssayMapel}/>}/>
          <Route path="/aplikasi/quiz/essay/:tingkatID/:mapelID" element={<PrivateRoute komponen={PageAplikasiQuizEssaySemester}/>}/>
          <Route path="/aplikasi/quiz/essay/:tingkatID/:mapelID/:semesterID" element={<PrivateRoute komponen={PageAplikasiQuizEssaySoal}/>}/>
          
          <Route path="/sekolah" element={<PrivateRoute komponen={PageSekolah}/>}/>          
          <Route path="/sekolah/kelas" element={<PrivateRoute komponen={PageSekolahKelas}/>}/>          
          <Route path="/sekolah/kelas/:kelasID" element={<PrivateRoute komponen={PageSekolahKelasSub}/>}/> 
          <Route path="/sekolah/semester" element={<PrivateRoute komponen={PageSekolahSemester}/>} /> 
          <Route path="/sekolah/semester/:semesterID" element={<PrivateRoute komponen={PageSekolahSemesterSub}/>}/> 
          <Route path="/sekolah/mapel" element={<PrivateRoute komponen={PageSekolahMapel}/>} />
          <Route path="/sekolah/pendidik" element={<PrivateRoute komponen={PageSekolahPendidik}/>} />
          <Route path="/sekolah/pendidik/add" element={<PrivateRoute komponen={PageSekolahPendidikAdd}/>} />
          <Route path="/sekolah/pendidik/edit/:userID" element={<PrivateRoute komponen={PageSekolahPendidikEdit}/>} />
          <Route path="/sekolah/siswa" element={<PrivateRoute komponen={PageSekolahSiswa}/>} />
          <Route path="/sekolah/siswa/add" element={<PrivateRoute komponen={PageSekolahSiswaAdd}/>} />
          <Route path="/sekolah/siswa/edit/:userID" element={<PrivateRoute komponen={PageSekolahSiswaEdit}/>} />
          <Route path="/profile" element={<PrivateRoute komponen={PageProfile}/>} /> 
          <Route path="/profile/foto" element={<PrivateRoute komponen={PageProfileFoto}/>} />
          <Route path="/profile/password" element={<PrivateRoute komponen={PageProfilePassword}/>} />              
          <Route path="*" element={<Page404 />}/>                      
        </Routes>
    </HashRouter>
  );
}

function CheckAuth() {
  const authData = window.localStorage.getItem('userToken');
  return authData ? <Navigate to="/aplikasi" /> : <Navigate to="/login" />;
};
