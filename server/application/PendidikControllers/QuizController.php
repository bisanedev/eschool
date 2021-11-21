<?php
namespace App\PendidikControllers;
use App\PendidikControllers\ApiController;
use Notihnio\RequestParser\RequestParser;
use App\Utils\HeaderResponse;
use Medoo\Medoo;
use Lcobucci\JWT\Configuration;

class QuizController extends ApiController
{                 
    public function __construct(HeaderResponse $response,Medoo $database,Configuration $jwt)
    {        
        parent::__construct($response,$database,$jwt);        
    }

    public function tingkatan()
    {                
        $data = $this->database->select("kelas_tingkatan",["id","nama"]);        
        echo $this->response->json_response(200, $data);
    }

    public function mapel($id)
    {                
        $tingkatan = $this->database->select("kelas_tingkatan",["id","nama"],["id" => $id]); 
        $mapel = $this->database->select("mapel",["id","nama","color"]);        
        $data = array("data" => $mapel,"tingkatan"=> $tingkatan[0] );
        echo $this->response->json_response(200, $data);
    }
  

}