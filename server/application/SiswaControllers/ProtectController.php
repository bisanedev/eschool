<?php
namespace App\SiswaControllers;
use App\SiswaControllers\ApiController;
use Notihnio\RequestParser\RequestParser;
use App\Utils\HeaderResponse;
use Medoo\Medoo;
use Lcobucci\JWT\Configuration;

class ProtectController extends ApiController
{                 
    public function __construct(HeaderResponse $response,Medoo $database,Configuration $jwt)
    {        
        parent::__construct($response,$database,$jwt);        
    }

    public function index()
    {        
        $data = $this->database->select("siswa",["id","nama","username"]);
        echo $this->response->json_response(200, $data );
    }

    public function indexPost()
    {
        echo $this->response->json_response(200, "Halaman yang dilindungi, POST DATA = ".$_POST["data"]);
    }

    public function indexPatch()
    {
        $_PATCH = RequestParser::parse()->params;
        echo $this->response->json_response(200, "Halaman yang dilindungi, PATCH DATA = ".$_PATCH["data"]);
    }

    public function indexDelete()
    {
        $_DELETE = RequestParser::parse()->params;        
        echo $this->response->json_response(200, "Halaman yang dilindungi, DELETE DATA = ".$_DELETE["data"]);
    }

}