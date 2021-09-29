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
//$dispatcher = FastRoute\cachedDispatcher(function (RouteCollector $r) { 
    //page
    $r->addRoute('GET', '/', ['App\Controllers\MainController','index']);     
    // Siswa Api
    $r->addGroup('/api', function (RouteCollector $r) {
        //authentikasi
        $r->addRoute('POST', '/auth', ['App\ApiControllers\AuthController','login']);                      
        //protected page
        $r->addRoute('GET', '/protected', ['App\ApiControllers\ProtectController','index']); 
        $r->addRoute('POST', '/protected', ['App\ApiControllers\ProtectController','indexPost']); 
        $r->addRoute('PATCH', '/protected', ['App\ApiControllers\ProtectController','indexPatch']); 
        $r->addRoute('DELETE', '/protected', ['App\ApiControllers\ProtectController','indexDelete']);         
        //testMongoDB
        $r->addRoute('GET', '/mongodb', ['App\ApiControllers\MongodbController','index']);      
        $r->addRoute('GET', '/mongodb/insert', ['App\ApiControllers\MongodbController','insert']);    
        //-----
    });       
},[
    //'cacheFile' => __DIR__ . '/../storage/cache/route/route.cache', /* required */
    //'cacheDisabled' => IS_DEBUG_ENABLED,     /* optional, enabled by default */
]);

$uri = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

$route = $dispatcher->dispatch($_SERVER['REQUEST_METHOD'],$uri);

switch ($route[0]) {
    case FastRoute\Dispatcher::NOT_FOUND:
        //call controller 404 notfound
        $container->call(['App\Controllers\PageController','halaman404']);
        break;

    case FastRoute\Dispatcher::METHOD_NOT_ALLOWED:
        //call controller 405 method not allowed
        $container->call(['App\Controllers\PageController','halaman405']);
        break;

    case FastRoute\Dispatcher::FOUND:
        $controller = $route[1];
        $parameters = $route[2];
        // We could do $container->get($controller) but $container->call()
        // does that automatically
        $container->call($controller, $parameters);
        break;
}
