<?php
namespace App\PageControllers;
use App\Utils\HeaderResponse;
Use eftec\bladeone\BladeOne;

class Halaman
{
    public function __construct(HeaderResponse $response)
    {      
        $views = __DIR__ . '/../../template/views';
        $cache = __DIR__ . '/../../storage/blade_cache';  
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