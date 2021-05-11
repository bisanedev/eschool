<?php
namespace App\Controllers;
use App\Utils\HeaderResponse;
Use eftec\bladeone\BladeOne;

class PageController
{
    public function __construct(HeaderResponse $response)
    {      
        $views = __DIR__ . '/../../resources/views';
        $cache = __DIR__ . '/../../storage/cache';  
        $this->response = $response;
        $this->blade = new BladeOne($views,$cache,BladeOne::MODE_AUTO);             
    }
   
	public function halaman404()
    {
        //echo "404 notfound";
        echo $this->response->json_response(404, "Halaman Tidak Ditemukan");
    }

   	public function halaman405()
    {
        //echo "405 method not allowed";
        echo $this->response->json_response(405, "Metode Tidak Di perbolehkan");
    }

}