<?php
use Medoo\Medoo;

return [     
    //database    
    Medoo::class => function() {    	
    	return new Medoo([
	        'database_type' => 'mysql', // type database
	        'database_name' => 'eschool', // nama database
	        'server' => 'localhost', // host database
	        'username' => 'root', // username db
	        'password' => '' // password db
    	]);
	}
    // end
];