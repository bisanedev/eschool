<?php
/*--- Pendidik Route Api ---*/
//authentikasi
$r->addRoute('POST', '/auth', ['App\PendidikControllers\AuthController','login']);
//quizPlatform
$r->addRoute('GET', '/aplikasi/quiz/index/pilihan', ['App\PendidikControllers\QuizController','IndexTingkatanPilihan']);
$r->addRoute('GET', '/aplikasi/quiz/index/pilihan/{tingkatID}', ['App\PendidikControllers\QuizController','IndexMapelPilihan']);
$r->addRoute('GET', '/aplikasi/quiz/index/pilihan/{tingkatID}/{mapelID}', ['App\PendidikControllers\QuizController','IndexSemesterPilihan']);
$r->addRoute('GET', '/aplikasi/quiz/index/essay', ['App\PendidikControllers\QuizController','IndexTingkatanEssay']);
$r->addRoute('GET', '/aplikasi/quiz/index/essay/{tingkatID}', ['App\PendidikControllers\QuizController','IndexMapelEssay']);
$r->addRoute('GET', '/aplikasi/quiz/index/essay/{tingkatID}/{mapelID}', ['App\PendidikControllers\QuizController','IndexSemesterEssay']);
$r->addRoute('GET', '/aplikasi/quiz/index/paket', ['App\PendidikControllers\QuizController','IndexTingkatanPaket']);
$r->addRoute('GET', '/aplikasi/quiz/index/paket/{tingkatID}', ['App\PendidikControllers\QuizController','IndexMapelPaket']);
$r->addRoute('GET', '/aplikasi/quiz/index/paket/{tingkatID}/{mapelID}', ['App\PendidikControllers\QuizController','IndexSemesterPaket']);
$r->addRoute('GET', '/aplikasi/quiz/index/exam', ['App\PendidikControllers\QuizController','IndexTingkatanExam']);
$r->addRoute('GET', '/aplikasi/quiz/index/exam/{tingkatID}', ['App\PendidikControllers\QuizController','IndexMapelExam']);
$r->addRoute('GET', '/aplikasi/quiz/index/exam/{tingkatID}/{mapelID}', ['App\PendidikControllers\QuizController','IndexSemesterExam']);
$r->addRoute('GET', '/aplikasi/quiz/index/{tingkatID}/{mapelID}/{semesterID}', ['App\PendidikControllers\QuizController','IndexForms']);
$r->addRoute('GET', '/aplikasi/quiz/pilihan/{tingkatID}/{mapelID}/{semesterID}', ['App\PendidikControllers\QuizController','SoalPilihan']);       
$r->addRoute('POST', '/aplikasi/quiz/pilihan/{tingkatID}/{mapelID}/{semesterID}/add', ['App\PendidikControllers\QuizController','SoalPilihanAdd']);
$r->addRoute('GET', '/aplikasi/quiz/index/pilihan/{tingkatID}/{mapelID}/{semesterID}/{soalID}', ['App\PendidikControllers\QuizController','SoalPilihanEdit']);
$r->addRoute('POST', '/aplikasi/quiz/pilihan/{tingkatID}/{mapelID}/{semesterID}/update', ['App\PendidikControllers\QuizController','SoalPilihanUpdate']);
$r->addRoute('DELETE', '/aplikasi/quiz/pilihan', ['App\PendidikControllers\QuizController','SoalPilihanDelete']);
$r->addRoute('GET', '/aplikasi/quiz/essay/{tingkatID}/{mapelID}/{semesterID}', ['App\PendidikControllers\QuizController','SoalEssay']);
$r->addRoute('POST', '/aplikasi/quiz/essay/{tingkatID}/{mapelID}/{semesterID}/add', ['App\PendidikControllers\QuizController','SoalEssayAdd']);
$r->addRoute('GET', '/aplikasi/quiz/index/essay/{tingkatID}/{mapelID}/{semesterID}/{soalID}', ['App\PendidikControllers\QuizController','SoalEssayEdit']);
$r->addRoute('POST', '/aplikasi/quiz/essay/{tingkatID}/{mapelID}/{semesterID}/update', ['App\PendidikControllers\QuizController','SoalEssayUpdate']);
$r->addRoute('DELETE', '/aplikasi/quiz/essay', ['App\PendidikControllers\QuizController','SoalEssayDelete']);
$r->addRoute('GET', '/aplikasi/quiz/paket/{tingkatID}/{mapelID}/{semesterID}', ['App\PendidikControllers\QuizController','PaketSoal']);
$r->addRoute('POST', '/aplikasi/quiz/paket/{tingkatID}/{mapelID}/{semesterID}/add', ['App\PendidikControllers\QuizController','PaketSoalAdd']);
$r->addRoute('GET', '/aplikasi/quiz/paket/{tingkatID}/{mapelID}/{semesterID}/paket/{paketID}', ['App\PendidikControllers\QuizController','PaketSoalEdit']);
$r->addRoute('PATCH', '/aplikasi/quiz/paket/{tingkatID}/{mapelID}/{semesterID}/update', ['App\PendidikControllers\QuizController','PaketSoalUpdate']);
$r->addRoute('DELETE', '/aplikasi/quiz/paket', ['App\PendidikControllers\QuizController','PaketSoalDelete']);        
$r->addRoute('GET', '/aplikasi/quiz/paket/{tingkatID}/{mapelID}/{semesterID}/pilihan', ['App\PendidikControllers\QuizController','PaketGetSoalPilihan']);
$r->addRoute('GET', '/aplikasi/quiz/paket/{tingkatID}/{mapelID}/{semesterID}/essay', ['App\PendidikControllers\QuizController','PaketGetSoalEssay']);
$r->addRoute('GET', '/aplikasi/quiz/exam/{tingkatID}/{mapelID}/{semesterID}', ['App\PendidikControllers\QuizController','Exam']);
$r->addRoute('GET', '/aplikasi/quiz/index/exam/{tingkatID}/{mapelID}/{semesterID}', ['App\PendidikControllers\QuizController','ExamAddInfo']);
$r->addRoute('POST', '/aplikasi/quiz/exam/{tingkatID}/{mapelID}/{semesterID}/add', ['App\PendidikControllers\QuizController','ExamAdd']);
$r->addRoute('GET', '/aplikasi/quiz/exam/{tingkatID}/{mapelID}/{semesterID}/exam/{examID}', ['App\PendidikControllers\QuizController','ExamEdit']);
$r->addRoute('POST', '/aplikasi/quiz/exam/{tingkatID}/{mapelID}/{semesterID}/update', ['App\PendidikControllers\QuizController','ExamUpdate']);
$r->addRoute('DELETE', '/aplikasi/quiz/exam', ['App\PendidikControllers\QuizController','ExamDelete']);        
//profile
$r->addRoute('POST', '/profile/upload', ['App\PendidikControllers\ProfileController','uploadFoto']);
$r->addRoute('PATCH', '/profile/password', ['App\PendidikControllers\ProfileController','gantiPassword']);
$r->addRoute('DELETE', '/profile/foto', ['App\PendidikControllers\ProfileController','fotoProfileDelete']);        
//sekolah
$r->addRoute('GET', '/sekolah/tingkatan', ['App\PendidikControllers\SekolahController','tingkatan']); 
$r->addRoute('POST', '/sekolah/tingkatan', ['App\PendidikControllers\SekolahController','tingkatanAdd']);
$r->addRoute('PATCH', '/sekolah/tingkatan', ['App\PendidikControllers\SekolahController','tingkatanUpdate']);
$r->addRoute('DELETE', '/sekolah/tingkatan', ['App\PendidikControllers\SekolahController','tingkatanDelete']); 
$r->addRoute('GET', '/sekolah/tingkatan/kelas/{id}', ['App\PendidikControllers\SekolahController','kelas']); 
$r->addRoute('POST', '/sekolah/tingkatan/kelas/{id}', ['App\PendidikControllers\SekolahController','kelasAdd']);
$r->addRoute('PATCH', '/sekolah/tingkatan/kelas/{id}', ['App\PendidikControllers\SekolahController','kelasUpdate']);
$r->addRoute('DELETE', '/sekolah/tingkatan/kelas/{id}', ['App\PendidikControllers\SekolahController','kelasDelete']); 
$r->addRoute('GET', '/sekolah/tahun', ['App\PendidikControllers\SekolahController','tahun']); 
$r->addRoute('POST', '/sekolah/tahun', ['App\PendidikControllers\SekolahController','tahunAdd']);
$r->addRoute('PATCH', '/sekolah/tahun', ['App\PendidikControllers\SekolahController','tahunUpdate']);
$r->addRoute('DELETE', '/sekolah/tahun', ['App\PendidikControllers\SekolahController','tahunDelete']); 
$r->addRoute('GET', '/sekolah/tahun/semester/{id}', ['App\PendidikControllers\SekolahController','semester']); 
$r->addRoute('POST', '/sekolah/tahun/semester/{id}', ['App\PendidikControllers\SekolahController','semesterAdd']);
$r->addRoute('PATCH', '/sekolah/tahun/semester/{id}', ['App\PendidikControllers\SekolahController','semesterUpdate']);
$r->addRoute('DELETE', '/sekolah/tahun/semester/{id}', ['App\PendidikControllers\SekolahController','semesterDelete']); 
$r->addRoute('GET', '/sekolah/mapel', ['App\PendidikControllers\SekolahController','mapel']); 
$r->addRoute('POST', '/sekolah/mapel', ['App\PendidikControllers\SekolahController','mapelAdd']);
$r->addRoute('PATCH', '/sekolah/mapel', ['App\PendidikControllers\SekolahController','mapelUpdate']);
$r->addRoute('DELETE', '/sekolah/mapel', ['App\PendidikControllers\SekolahController','mapelDelete']);
//-----pendidik usermanager
$r->addRoute('GET', '/sekolah/users', ['App\PendidikControllers\SekolahController','pendidik']); 
$r->addRoute('POST', '/sekolah/users', ['App\PendidikControllers\SekolahController','pendidikAdd']);
$r->addRoute('POST', '/sekolah/users/edit/{id}', ['App\PendidikControllers\SekolahController','pendidikUpdate']);
$r->addRoute('GET', '/sekolah/users/view/{id}', ['App\PendidikControllers\SekolahController','pendidikView']);                
$r->addRoute('DELETE', '/sekolah/users/foto/{username}', ['App\PendidikControllers\SekolahController','pendidikFotoDelete']);
$r->addRoute('DELETE', '/sekolah/users', ['App\PendidikControllers\SekolahController','pendidikDelete']);        
//-----siswa usermanager
$r->addRoute('GET', '/sekolah/siswa', ['App\PendidikControllers\SekolahController','siswa']); 
$r->addRoute('POST', '/sekolah/siswa', ['App\PendidikControllers\SekolahController','siswaAdd']);
$r->addRoute('PATCH', '/sekolah/siswa/multi', ['App\PendidikControllers\SekolahController','siswaMultiUpdate']);
$r->addRoute('GET', '/sekolah/siswa/kelas', ['App\PendidikControllers\SekolahController','siswaKelas']);
$r->addRoute('GET', '/sekolah/siswa/countkelas/{id}', ['App\PendidikControllers\SekolahController','countSiswaKelas']);
$r->addRoute('POST', '/sekolah/siswa/edit/{id}', ['App\PendidikControllers\SekolahController','siswaUpdate']);
$r->addRoute('GET', '/sekolah/siswa/view/{id}', ['App\PendidikControllers\SekolahController','siswaView']);                
$r->addRoute('DELETE', '/sekolah/siswa/foto/{username}', ['App\PendidikControllers\SekolahController','siswaFotoDelete']);
$r->addRoute('DELETE', '/sekolah/siswa', ['App\PendidikControllers\SekolahController','siswaDelete']); 