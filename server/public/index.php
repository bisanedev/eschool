<?php
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
use FastRoute\RouteCollector;

/* jika aplikasi ada di subdirectory  */
// $base  = dirname($_SERVER['PHP_SELF']);
// if(ltrim($base, '/')){ 
//     $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($base));
// }

/* http redirect to https  */
// if (empty($_SERVER['HTTPS']) || $_SERVER['HTTPS'] === "off") {
//     $location = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
//     header('HTTP/1.1 301 Moved Permanently');
//     header('Location: ' . $location);
//     exit;
// }

$container = require __DIR__ . '/../application/bootstrap.php';

$dispatcher = FastRoute\simpleDispatcher(function (RouteCollector $r) {
    //page
    $r->addRoute('GET', '/', ['App\PageControllers\BootBlade','index']);   
    // siswa Api
    $r->addGroup('/api/siswa', function (RouteCollector $r) {  
        //authentikasi
        $r->addRoute('POST', '/auth', ['App\SiswaControllers\AuthController','login']);
        $r->addRoute('GET', '/profile', ['App\SiswaControllers\ProfileController','index']);
        $r->addRoute('GET', '/test', ['App\SiswaControllers\ProtectController','index']);
    });
    // admin Api
    $r->addGroup('/api/pendidik', function (RouteCollector $r) {
        //authentikasi
        $r->addRoute('POST', '/auth', ['App\PendidikControllers\AuthController','login']);
        //quizPlatform
        $r->addRoute('GET', '/aplikasi/quiz/index', ['App\PendidikControllers\QuizController','IndexTingkatan']);
        $r->addRoute('GET', '/aplikasi/quiz/index/{tingkatID}', ['App\PendidikControllers\QuizController','IndexMapel']);
        $r->addRoute('GET', '/aplikasi/quiz/index/{tingkatID}/{mapelID}', ['App\PendidikControllers\QuizController','IndexSemester']);
        $r->addRoute('GET', '/aplikasi/quiz/pilihan/{tingkatID}/{mapelID}/{semesterID}', ['App\PendidikControllers\QuizController','SoalPilihan']);
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
    });       
});

$uri = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

$route = $dispatcher->dispatch($_SERVER['REQUEST_METHOD'],$uri);

switch ($route[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        //call controller 404 notfound
        $container->call(['App\PageControllers\Halaman','halaman404']);
        break;

    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        //call controller 405 method not allowed
        $container->call(['App\PageControllers\Halaman','halaman405']);
        break;

    case FastRoute\Dispatcher::FOUND:
        $controller = $route[1];
        $parameters = $route[2];
        // We could do $container->get($controller) but $container->call()
        // does that automatically
        $container->call($controller, $parameters);
        break;
}