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

    public function mapel($tingkatID)
    {                
        $tingkatan = $this->database->select("kelas_tingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("mapel",["id","nama","color"]);        
        $data = array("data" => $mapel,"tingkatan"=> $tingkatan[0] );
        echo $this->response->json_response(200, $data);
    }

    public function semester($tingkatID,$mapelID)
    {                
        $tingkatan = $this->database->select("kelas_tingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("semester_nama",["[>]semester_tahun" => ["semester_tahun_id" => "id"]],["semester_nama.id","semester_tahun.nama(tahun)","semester_nama.semester","semester_nama.semester_start","semester_nama.semester_end"]);        
        $data = array("data" => $semester,"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0] );
        echo $this->response->json_response(200, $data);
    }
  

}