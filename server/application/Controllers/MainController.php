<?php 
namespace App\Controllers;
use App\Controllers\PageController;

class MainController extends PageController
{
    public function index()
    {
        echo $this->blade->run("app");
    }
}
