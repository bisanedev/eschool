<?php
namespace App\PendidikControllers;
use App\PendidikControllers\ApiController;
use Notihnio\RequestParser\RequestParser;
use App\Utils\HeaderResponse;
use Medoo\Medoo;
use Valitron\Validator;
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

    public function tingkatanAdd()
    {        
        $v = new Validator($_POST);
        $v->rule('required', ['nama']);
        if($v->validate()) {            
            $this->database->insert("tingkatan",["nama" => $_POST["nama"]]);           
            echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama kosong"); 
            }            
        }
    }

    public function tingkatanUpdate()
    {                                            
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','nama']);
        if($v->validate()) {                      
            $update=$this->database->update("tingkatan",["nama" => $_PATCH["nama"]],["id" => $_PATCH["id"]]);
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama kosong"); 
            }
            if($v->errors('id')){
                echo $this->response->json_response(400,"id data kosong");
            }            
        }
    }

    public function tingkatanDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("tingkatan",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
            if($hapus->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{                
                echo $this->response->json_response(200,"berhasil");
            }            
        }else{
            if($v->errors('delete')){
                echo $this->response->json_response(400,"delete id kosong"); 
            }
        }
    }

    public function kelas($id)
    {                
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;        
        $totalRow = $this->database->count("kelas",["tingkatan_id" => $id]);
        $tingkatan = $this->database->select("tingkatan",["nama"],["id" => $id]);
        if(isset($_GET['cari'])){
            $kelas = $this->database->select("kelas",["id","nama"],["tingkatan_id" => $id,"nama[~]" => $cari]);
            $data = array("data" => $kelas,"totaldata"=>$totalRow ,"tingkatan" => $tingkatan[0]["nama"],"nextpage"=> false );
        }else{
            $kelas = $this->database->select("kelas",["id","nama"],["tingkatan_id" => $id,"LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $kelas,"totaldata"=>$totalRow,"tingkatan" => $tingkatan[0]["nama"],"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );
        }  
        echo $this->response->json_response(200, $data);   
    }
    
    public function kelasAdd($id)
    {        
        $v = new Validator($_POST);
        $v->rule('required', ['nama']);
        if($v->validate()) {            
            $this->database->insert("kelas",["tingkatan_id" => $id,"nama" => $_POST["nama"]]);           
            echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama kosong"); 
            }            
        }
    }

    public function kelasUpdate($id)
    {                                            
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','nama']);
        if($v->validate()) {
            $update=$this->database->update("kelas",["nama" => $_PATCH["nama"]],["AND" => ["id" => $_PATCH["id"],"tingkatan_id" => $id]]);
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama kosong"); 
            }
            if($v->errors('id')){
                echo $this->response->json_response(400,"id data kosong");
            }            
        }
    }

    public function kelasDelete($id)
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("kelas",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
            if($hapus->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{                
                echo $this->response->json_response(200,"berhasil");
            }            
        }else{
            if($v->errors('delete')){
                echo $this->response->json_response(400,"delete id kosong"); 
            }
        }
    }

//---- end
}