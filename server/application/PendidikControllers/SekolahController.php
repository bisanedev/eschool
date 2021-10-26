<?php
namespace App\PendidikControllers;
use App\PendidikControllers\ApiController;
use Notihnio\RequestParser\RequestParser;
use App\Utils\HeaderResponse;
use Medoo\Medoo;
use Valitron\Validator;
use Lcobucci\JWT\Configuration;
use stdClass;

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
        $totalRow = $this->database->count("kelas_tingkatan");
        if(isset($_GET['cari'])){
            $tingkatan = $this->database->select("kelas_tingkatan",["id","nama"],["nama[~]" => $cari]);
            $data = array("data" => $tingkatan,"totaldata"=>$totalRow ,"nextpage"=> false );
        }else{
            $tingkatan = $this->database->select("kelas_tingkatan",["id","nama"],["LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
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
            $this->database->insert("kelas_tingkatan",["nama" => $_POST["nama"]]);           
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
            $update=$this->database->update("kelas_tingkatan",["nama" => $_PATCH["nama"]],["id" => $_PATCH["id"]]);
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama kosong"); 
            }
            elseif($v->errors('id')){
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
            $hapus=$this->database->delete("kelas_tingkatan",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
            if($this->database->error){
                echo $this->response->json_response(400,"Dilarang dihapus masih ada data");
                exit;
            }
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
        $totalRow = $this->database->count("kelas_nama",["tingkatan_id" => $id]);
        $tingkatan = $this->database->select("kelas_tingkatan",["nama"],["id" => $id]);
        if(isset($_GET['cari'])){
            $kelas = $this->database->select("kelas_nama",["id","nama"],["tingkatan_id" => $id,"nama[~]" => $cari]);
            $data = array("data" => $kelas,"totaldata"=>$totalRow ,"tingkatan" => $tingkatan[0]["nama"],"nextpage"=> false );
        }else{
            $kelas = $this->database->select("kelas_nama",["id","nama"],["tingkatan_id" => $id,"LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
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
            $this->database->insert("kelas_nama",["tingkatan_id" => $id,"nama" => $_POST["nama"]]);           
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
            $update=$this->database->update("kelas_nama",["nama" => $_PATCH["nama"]],["AND" => ["id" => $_PATCH["id"],"tingkatan_id" => $id]]);
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama kosong"); 
            }
            elseif($v->errors('id')){
                echo $this->response->json_response(400,"id data kosong");
            }            
        }
    }

    public function kelasDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("kelas_nama",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
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

    public function tahun()
    {                
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;        
        $totalRow = $this->database->count("semester_tahun");
        if(isset($_GET['cari'])){
            $tahun = $this->database->select("semester_tahun",["id","nama"],["nama[~]" => $cari]);
            $data = array("data" => $tahun,"totaldata"=>$totalRow ,"nextpage"=> false );
        }else{
            $tahun = $this->database->select("semester_tahun",["id","nama"],["LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $tahun,"totaldata"=>$totalRow,"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function tahunAdd()
    {        
        $v = new Validator($_POST);
        $v->rule('required', ['nama']);
        if($v->validate()) {            
            $this->database->insert("semester_tahun",["nama" => $_POST["nama"]]);           
            echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input tahun ajaran kosong"); 
            }               
        }
    }

    public function tahunUpdate()
    {                                            
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','nama']);
        if($v->validate()) {                      
            $update=$this->database->update("semester_tahun",["nama" => $_PATCH["nama"]],["id" => $_PATCH["id"]]);
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input tahun ajaran kosong"); 
            }                                        
            elseif($v->errors('id')){
                echo $this->response->json_response(400,"id data kosong");
            }            
        }
    }

    
    public function tahunDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("semester_tahun",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
            if($this->database->error){
                echo $this->response->json_response(400,"Dilarang dihapus masih ada data");
                exit;
            }
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

    public function semester($id)
    {                
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;                
        $totalRow = $this->database->count("semester_nama",["semester_tahun_id" => $id]);
        $tahun = $this->database->select("semester_tahun",["nama"],["id" => $id]);
        if(isset($_GET['cari'])){
            $semester = $this->database->select("semester_nama",["id","semester","semester_start","semester_end"],["semester_tahun_id" => $id,"nama[~]" => $cari]);
            $data = array("data" => $semester,"tahun"=> $tahun[0]["nama"],"totaldata"=>$totalRow ,"nextpage"=> false );
        }else{
            $semester = $this->database->select("semester_nama",["id","semester","semester_start","semester_end"],["semester_tahun_id" => $id,"LIMIT" => [$mulai,$totalData],"ORDER" => ["semester_start" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $semester,"tahun"=> $tahun[0]["nama"],"totaldata"=>$totalRow,"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function semesterAdd($id)
    {        
        $v = new Validator($_POST);
        $v->rule('required', ['semester','semester_start','semester_end']);
        if($v->validate()) {            
            $this->database->insert("semester_nama",["semester_tahun_id" => $id,"semester" => $_POST["semester"],"semester_start" => $_POST["semester_start"],"semester_end" => $_POST["semester_end"]]);            
            echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('semester')){
                echo $this->response->json_response(400,"pilih semester kosong"); 
            }elseif($v->errors('semester_end')){
                echo $this->response->json_response(400,"Tanggal semester awal kosong"); 
            }elseif($v->errors('semester_start')){
                echo $this->response->json_response(400,"Tanggal semester akhir kosong"); 
            }            
        }
    }

    public function semesterUpdate($id)
    {                                            
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','semester','semester_start','semester_end']);
        if($v->validate()) {                      
            $update=$this->database->update("semester_nama",
                ["semester" => $_PATCH["semester"],"semester_start" => $_PATCH["semester_start"],"semester_end" => $_PATCH["semester_end"]],
                ["AND" => ["id" => $_PATCH["id"],"semester_tahun_id" => $id]]
            );            
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            if($v->errors('semester')){
                echo $this->response->json_response(400,"pilih semester kosong"); 
            }elseif($v->errors('semester_start')){
                echo $this->response->json_response(400,"Tanggal semester awal kosong"); 
            }elseif($v->errors('semester_end')){
                echo $this->response->json_response(400,"Tanggal semester akhir kosong");
            }elseif($v->errors('id')){
                echo $this->response->json_response(400,"id data kosong");
            }            
        }
    }

    
    public function semesterDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("semester_nama",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
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

    public function mapel()
    {                
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;        
        $totalRow = $this->database->count("mapel");
        if(isset($_GET['cari'])){
            $mapel = $this->database->select("mapel",["id","nama","color"],["nama[~]" => $cari]);
            $data = array("data" => $mapel,"totaldata"=>$totalRow ,"nextpage"=> false );
        }else{
            $mapel = $this->database->select("mapel",["id","nama","color"],["LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $mapel,"totaldata"=>$totalRow,"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function mapelAdd()
    {        
        $v = new Validator($_POST);
        $v->rule('required', ['nama','color']);
        if($v->validate()) {            
            $this->database->insert("mapel",["nama" => $_POST["nama"],"color" => $_POST["color"]]);           
            echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama kosong"); 
            }elseif($v->errors('color')){
                echo $this->response->json_response(400,"Input color kosong");
            }              
        }
    }

    public function mapelUpdate()
    {                                            
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','nama','color']);
        if($v->validate()) {                      
            $update=$this->database->update("mapel",["nama" => $_PATCH["nama"],"color" => $_PATCH["color"]],["id" => $_PATCH["id"]]);
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama kosong"); 
            }elseif($v->errors('color')){
                echo $this->response->json_response(400,"Input color kosong");
            }elseif($v->errors('id')){
                echo $this->response->json_response(400,"id data kosong");
            }            
        }
    }

    public function mapelDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("mapel",["AND" => ["id" => json_decode($_DELETE['delete'])]]);           
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

    public function pendidik()
    {                
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;        
        $totalRow = $this->database->count("users");
        $mapel = $this->database->select("mapel",["id","nama","color"]);
        $cari = $this->database->select("users",["id","nama","jenis","username","mapel_id[JSON]","superuser"],["nama[~]" => $cari]);
        $pagi = $this->database->select("users",["id","nama","jenis","username","mapel_id[JSON]","superuser"],["LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);
        if(isset($_GET['cari'])){
            $users = $this->reMapwithMapel($cari,$mapel);
            $data = array("data" => $users,"totaldata"=>$totalRow ,"nextpage"=> false );
        }else{
            $users = $this->reMapwithMapel($pagi,$mapel);
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $users,"totaldata"=>$totalRow,"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function pendidikAdd()
    {        
        $v = new Validator($_POST);
        $v->rule('required', ['nama','jenis','username','password','mapel_id','superuser']);
        if($v->validate()) {            
            $this->database->insert("users",
                ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => $_POST["username"],"password" => $_POST["password"],"mapel_id" => $_POST["mapel_id"],"superuser" => $_POST["superuser"]]
            );           
            echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama kosong"); 
            }  
            elseif($v->errors('jenis')){
                echo $this->response->json_response(400,"Input jenis kosong");
            } 
            elseif($v->errors('username')){
                echo $this->response->json_response(400,"Input username kosong");
            }
            elseif($v->errors('password')){
                echo $this->response->json_response(400,"Input password kosong");
            }  
            elseif($v->errors('mapel_id')){
                echo $this->response->json_response(400,"Input mapel_id kosong");
            } 
            elseif($v->errors('superuser')){
                echo $this->response->json_response(400,"Input superuser kosong");
            }           
        }
    }

    public function pendidikUpdate()
    {                                            
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','nama','jenis','username','password','mapel_id','superuser']);
        if($v->validate()) {                      
            $update=$this->database->update("users",
                ["nama" => $_PATCH["nama"],"jenis" => $_PATCH["jenis"],"username" => $_PATCH["username"],"password" => $_PATCH["password"],"mapel_id" => $_PATCH["mapel_id"],"superuser" => $_PATCH["superuser"]],
                ["id" => $_PATCH["id"]]
            );
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama kosong"); 
            }
            elseif($v->errors('id')){
                echo $this->response->json_response(400,"id data kosong");
            }
            elseif($v->errors('jenis')){
                echo $this->response->json_response(400,"Input jenis kosong");
            } 
            elseif($v->errors('username')){
                echo $this->response->json_response(400,"Input username kosong");
            }
            elseif($v->errors('password')){
                echo $this->response->json_response(400,"Input password kosong");
            }  
            elseif($v->errors('mapel_id')){
                echo $this->response->json_response(400,"Input mapel_id kosong");
            } 
            elseif($v->errors('superuser')){
                echo $this->response->json_response(400,"Input superuser kosong");
            } 
                          
        }
    }

    public function pendidikDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {  
            if(in_array("1",json_decode($_DELETE['delete']))){
                echo $this->response->json_response(400,"Administrator tidak bisa dihapus");
                exit;
            }                                       
            $hapus=$this->database->delete("users",["AND" => ["id" => json_decode($_DELETE['delete'])]]);           
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

    public function reMapwithMapel($data,$mapel)
    {
        if ((is_array($data) && is_array($mapel)) || (is_object($data) && is_object($mapel))){
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();                
                $object->id = $val["id"];               
                $object->nama = $val["nama"];                
                $object->jenis = $val["jenis"];                                        
                $object->username = $val["username"]; 
                $object->superuser = $val["superuser"] === "1" ? true:false;
                if($val["mapel_id"] != null){
                    $mapelCollect = array();
                    foreach($mapel as $mapelval){
                        $subObject = new stdClass(); 
                        if( in_array($mapelval["id"], $val["mapel_id"]) ){   
                            $subObject->id = $mapelval["id"];
                            $subObject->nama = $mapelval["nama"];
                            $subObject->color = $mapelval["color"];
                            $mapelCollect[] = $subObject;               
                        }                   
                    }
                    $object->mapel = $mapelCollect;
                }else{
                    $object->mapel = "";
                }                
              
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }
    }
//---- end
}