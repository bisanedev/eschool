<?php 
namespace App\PageControllers;
use App\PageControllers\Halaman;

class BootBlade extends Halaman
{
    public function index()
    {
        echo $this->blade->run("app");
    }
}
