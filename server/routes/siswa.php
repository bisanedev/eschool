<?php
/*--- siswa Route Api ---*/
//authentikasi
$r->addRoute('POST', '/auth', ['App\SiswaControllers\AuthController','login']);
$r->addRoute('GET', '/profile', ['App\SiswaControllers\ProfileController','index']);
$r->addRoute('GET', '/test', ['App\SiswaControllers\ProtectController','index']);
//profile
$r->addRoute('PATCH', '/profile/password', ['App\SiswaControllers\ProfileController','gantiPassword']);