<?php
namespace App\AdminControllers;
use App\ApiControllers\ApiController;
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
        echo $this->response->json_response(200, "Halaman yang dilindungi, GET");
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