<?php
namespace App\PendidikControllers;
use App\PendidikControllers\ApiController;
use Notihnio\RequestParser\RequestParser;
use App\Utils\HeaderResponse;
use Medoo\Medoo;
use Lcobucci\JWT\Configuration;

class SekolahController extends ApiController
{
    public function __construct(HeaderResponse $response,Medoo $database,Configuration $jwt)
    {        
        parent::__construct($response,$database,$jwt); 
        $this->hasSuperuser();       
    }
    
    public function tingkatan()
    {                
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;
        //$order = isset($_GET['order'])? (string)$_GET["order"]:"DESC";
        $totalRow = $this->database->count("tingkatan");
        if(isset($_GET['cari'])){
            $tingkatan = $this->database->select("tingkatan",["id","nama"],["nama[~]" => $cari]);
            $data = array("data" => $tingkatan,"totaldata"=>$totalRow ,"nextpage"=> false );
        }else{
            $tingkatan = $this->database->select("tingkatan",["id","nama"],["LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $tingkatan,"totaldata"=>$totalRow,"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );
        }  
        echo $this->response->json_response(200, $data);   
    }
}