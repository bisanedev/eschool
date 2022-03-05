<?php
namespace App\PendidikControllers;
use App\PendidikControllers\ApiController;
use Notihnio\RequestParser\RequestParser;
use App\Utils\HeaderResponse;
use Medoo\Medoo;
use Valitron\Validator;
use Lcobucci\JWT\Configuration;
use Bcrypt\Bcrypt;
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
        $totalRow = $this->database->count("sekolah_kelastingkatan");
        if(isset($_GET['cari'])){
            $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["nama[~]" => $cari]);
            $data = array("data" => $tingkatan,"totaldata"=>$totalRow ,"nextpage"=> false );
        }else{
            $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["LIMIT" => [$mulai,$totalData],"ORDER" => ["nama" => "ASC"]]);            
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
            $this->database->insert("sekolah_kelastingkatan",["nama" => $_POST["nama"]]);           
            echo $this->response->json_response(200, "berhasil");
        }else{
            $data = array();       
            if($v->errors('nama')){
                $data['nama'] = "Input nama kosong";
            }
            echo $this->response->json_response(400,$data);     
        }
    }

    public function tingkatanUpdate()
    {                                            
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','nama']);
        if($v->validate()) {                      
            $update=$this->database->update("sekolah_kelastingkatan",["nama" => $_PATCH["nama"]],["id" => $_PATCH["id"]]);
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            $data = array();
            if($v->errors('nama')){
                $data['nama'] = "Input nama kosong";                
            }
            if($v->errors('id')){
                $data['nama'] = "id data kosong";                
            } 
            echo $this->response->json_response(400,$data);           
        }
    }

    public function tingkatanDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("sekolah_kelastingkatan",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
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
        $totalRow = $this->database->count("sekolah_kelasnama",["tingkatan_id" => $id]);
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["nama"],["id" => $id]);
        if(isset($_GET['cari'])){
            $kelas = $this->database->select("sekolah_kelasnama",["id","nama"],["tingkatan_id" => $id,"nama[~]" => $cari]);
            $data = array("data" => $kelas,"totaldata"=>$totalRow ,"tingkatan" => $tingkatan[0]["nama"],"nextpage"=> false );
        }else{
            $kelas = $this->database->select("sekolah_kelasnama",["id","nama"],["tingkatan_id" => $id,"LIMIT" => [$mulai,$totalData],"ORDER" => ["nama" => "ASC"]]);            
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
            $this->database->insert("sekolah_kelasnama",["tingkatan_id" => $id,"nama" => $_POST["nama"]]);           
            echo $this->response->json_response(200, "berhasil");
        }else{
            $data = array();
            if($v->errors("nama")){
                $data["nama"] = "Input nama kosong";                
            }
            echo $this->response->json_response(400,$data);             
        }
    }

    public function kelasUpdate($id)
    {                                            
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','nama']);
        if($v->validate()) {
            $update=$this->database->update("sekolah_kelasnama",["nama" => $_PATCH["nama"]],["AND" => ["id" => $_PATCH["id"],"tingkatan_id" => $id]]);
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            $data = array();
            if($v->errors("nama")){
                $data["nama"] = "Input nama kosong";                
            }
            if($v->errors('id')){
                $data["id"] = "id data kosong";          
            }
            echo $this->response->json_response(400,$data);        
        }
    }

    public function kelasDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("sekolah_kelasnama",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
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
        $totalRow = $this->database->count("sekolah_semestertahun");
        if(isset($_GET['cari'])){
            $tahun = $this->database->select("sekolah_semestertahun",["id","nama"],["nama[~]" => $cari]);
            $data = array("data" => $tahun,"totaldata"=>$totalRow ,"nextpage"=> false );
        }else{
            $tahun = $this->database->select("sekolah_semestertahun",["id","nama"],["LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
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
            $this->database->insert("sekolah_semestertahun",["nama" => $_POST["nama"]]);           
            echo $this->response->json_response(200, "berhasil");
        }else{
            $data = array();
            if($v->errors("nama")){
                $data["nama"] = "Input tahun ajaran kosong";                
            }
            echo $this->response->json_response(400,$data);                       
        }
    }

    public function tahunUpdate()
    {                                            
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','nama']);
        if($v->validate()) {                      
            $update=$this->database->update("sekolah_semestertahun",["nama" => $_PATCH["nama"]],["id" => $_PATCH["id"]]);
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            $data = array();
            if($v->errors("nama")){
                $data["nama"] = "Input tahun ajaran kosong";                
            }
            if($v->errors('id')){
                $data["id"] = "id data kosong";                
            }            
            echo $this->response->json_response(400, $data);         
        }
    }

    
    public function tahunDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("sekolah_semestertahun",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
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
        $totalRow = $this->database->count("sekolah_semesternama",["semester_tahun_id" => $id]);
        $tahun = $this->database->select("sekolah_semestertahun",["nama"],["id" => $id]);
        if(isset($_GET['cari'])){
            $semester = $this->database->select("sekolah_semesternama",["id","semester","semester_start","semester_end"],["semester_tahun_id" => $id,"semester[~]" => $cari]);
            $data = array("data" => $semester,"tahun"=> $tahun[0]["nama"],"totaldata"=>$totalRow ,"nextpage"=> false );
        }else{
            $semester = $this->database->select("sekolah_semesternama",["id","semester","semester_start","semester_end"],["semester_tahun_id" => $id,"LIMIT" => [$mulai,$totalData],"ORDER" => ["semester_start" => "DESC"]]);            
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
        $v->rule('date', ['semester_start','semester_end']);
        if($v->validate()) {            
            $this->database->insert("sekolah_semesternama",["semester_tahun_id" => $id,"semester" => $_POST["semester"],"semester_start" => $_POST["semester_start"],"semester_end" => $_POST["semester_end"]]);            
            echo $this->response->json_response(200, "berhasil");
        }else{
            $data = array();
            if($v->errors("semester")){
                $data["semester"] = "Input pilih semester kosong";                
            }
            if($v->errors('semester_end')){
                $data["semester_end"] = "Tanggal semester akhir, kosong atau tidak valid";                 
            }
            if($v->errors('semester_start')){
                $data["semester_start"] = "Tanggal semester awal, kosong atau tidak valid";                
            }          
            echo $this->response->json_response(400, $data);               
        }
    }

    public function semesterUpdate($id)
    {                                            
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','semester','semester_start','semester_end']);
        $v->rule('date', ['semester_start','semester_end']);
        if($v->validate()) {                      
            $update=$this->database->update("sekolah_semesternama",
                ["semester" => $_PATCH["semester"],"semester_start" => $_PATCH["semester_start"],"semester_end" => $_PATCH["semester_end"]],
                ["AND" => ["id" => $_PATCH["id"],"semester_tahun_id" => $id]]
            );            
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }
        }else{
            $data = array();
            if($v->errors("semester")){
                $data["semester"] = "Input pilih semester kosong";                
            }
            if($v->errors('semester_end')){
                $data["semester_end"] = "Tanggal semester akhir, kosong atau tidak valid";                 
            }
            if($v->errors('semester_start')){
                $data["semester_start"] = "Tanggal semester awal, kosong atau tidak valid";                
            } 
            if($v->errors('id')){
                $data["id"] = "id data kosong";                
            }            
            echo $this->response->json_response(400, $data);         
        }
    }

    
    public function semesterDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("sekolah_semesternama",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
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
        $totalRow = $this->database->count("sekolah_mapel");
        if(isset($_GET['cari'])){
            $mapel = $this->database->select("sekolah_mapel",["id","nama","color"],["nama[~]" => $cari]);
            $data = array("data" => $mapel,"totaldata"=>$totalRow ,"nextpage"=> false );
        }else{
            $mapel = $this->database->select("sekolah_mapel",["id","nama","color"],["LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
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
            $this->database->insert("sekolah_mapel",["nama" => $_POST["nama"],"color" => $_POST["color"]]);           
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
            $update=$this->database->update("sekolah_mapel",["nama" => $_PATCH["nama"],"color" => $_PATCH["color"]],["id" => $_PATCH["id"]]);
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
            $hapus=$this->database->delete("sekolah_mapel",["AND" => ["id" => json_decode($_DELETE['delete'])]]);           
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
        $totalRow = $this->database->count("sekolah_users");
        $mapel = $this->database->select("sekolah_mapel",["id","nama","color"]);
        $cari = $this->database->select("sekolah_users",["id","nama","jenis","username","mapel_id[JSON]","superuser"],["nama[~]" => $cari]);
        $pagi = $this->database->select("sekolah_users",["id","nama","jenis","username","mapel_id[JSON]","superuser"],["LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);
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

    public function pendidikView($id)
    {
        $data = $this->database->select("sekolah_users",["id","nama","jenis","foto[Bool]","username","mapel_id[JSON]","superuser[Bool]"],["id" => $id]);
        echo $this->response->json_response(200, $data[0]);
    }

    public function pendidikFotoDelete($username)
    {
        $_DELETE = RequestParser::parse()->params; 
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {
            unlink(__DIR__ ."/../../public/data/users/".$username.".jpg");
            $this->database->update("sekolah_users",["foto" => "0"],["id" => $_DELETE["delete"]]);
            echo $this->response->json_response(200,"berhasil");     
        }else{
            if($v->errors('delete')){
                echo $this->response->json_response(400,"id data kosong"); 
            }  
        }
    }

    public function pendidikAdd()
    {        
        $bcrypt = new Bcrypt();
        $v = new Validator($_POST);
        $v->rule('required', ['nama','jenis','username','password','rePassword','superuser']);
        if($v->validate()) { 
            if($_POST["password"] != $_POST["rePassword"]){
                echo $this->response->json_response(400,"Password konfirmasi tidak sama");
                exit;
            }
            
            $ciphertext = $bcrypt->encrypt($_POST["password"],"2a");
            // if ada foto            
            if (!empty($_FILES["file"])) {
                $fileinfo = getimagesize($_FILES["file"]["tmp_name"]);
                $width = $fileinfo[0];
                $height = $fileinfo[1];
                $file_type = $_FILES['file']['type'];
                $allowed = array("image/jpeg","image/png");
                $location = __DIR__ ."/../../public/data/users/".$_POST["username"].".jpg";
                if(!in_array($file_type, $allowed)) {
                    echo $this->response->json_response(400, "Hanya file png, jpeg dan jpg yang bisa di upload");
                    exit;
                }
                if ($_FILES["file"]["size"] > 2000000) {
                    echo $this->response->json_response(400, "Ukuran gambar melebihi 2MB");
                    exit;      
                }        
                if ($width < "260" || $height < "320") {
                    echo $this->response->json_response(400, "Gambar foto dimensi minimal 320x260");
                    exit; 
                }
                if ($this->compressImage($_FILES['file']['tmp_name'],$location,60)) {
                    // insert new users with foto to database       
                    $this->database->insert("sekolah_users",
                        ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"foto" => "1","password" => $ciphertext ,"mapel_id" => $_POST["mapel_id"],"superuser" => $_POST["superuser"]]
                    );
                    if($this->database->error){
                        echo $this->response->json_response(400,"Username sudah ada");
                        exit;
                    }
                    echo $this->response->json_response(200,"berhasil");
                }else{                
                    echo $this->response->json_response(400, "Maaf, terjadi kesalahan saat mengunggah file Anda");
                }
            }else{
                // insert new users to database       
                $this->database->insert("sekolah_users",
                    ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"password" => $ciphertext ,"mapel_id" => $_POST["mapel_id"],"superuser" => $_POST["superuser"]]
                );  
                if($this->database->error){
                    echo $this->response->json_response(400,"Username sudah ada");
                    exit;
                }      
                echo $this->response->json_response(200, "berhasil");
            }
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
            elseif($v->errors('rePassword')){
                echo $this->response->json_response(400,"Input rePassword kosong");
            }  
            elseif($v->errors('superuser')){
                echo $this->response->json_response(400,"Input superuser kosong");
            }           
        }
    }

    public function pendidikUpdate()
    {          
        $bcrypt = new Bcrypt();                                          
        $v = new Validator($_POST);
        $v->rule('required', ['id','nama','jenis','username','mapel_id','superuser']);
        if($v->validate()) {
            if( !empty($_POST["password"]) && $_POST["password"] != $_POST["rePassword"]){
                echo $this->response->json_response(400,"Password konfirmasi tidak sama");
                exit;
            }
            if($_POST["username"] != $_POST["lastUsername"]){
                unlink(__DIR__ ."/../../public/data/users/".$_POST["lastUsername"].".jpg");                
            }
            // if ada foto
            if (!empty($_FILES["file"])) {
                $fileinfo = getimagesize($_FILES["file"]["tmp_name"]);
                $width = $fileinfo[0];
                $height = $fileinfo[1];
                $file_type = $_FILES['file']['type'];
                $allowed = array("image/jpeg","image/png");
                $location = __DIR__ ."/../../public/data/users/".$_POST["username"].".jpg";
                if(!in_array($file_type, $allowed)) {
                    echo $this->response->json_response(400, "Hanya file png, jpeg dan jpg yang bisa di upload");
                    exit;
                }
                if ($_FILES["file"]["size"] > 2000000) {
                    echo $this->response->json_response(400, "Ukuran gambar melebihi 2MB");
                    exit;      
                }        
                if ($width < "260" || $height < "320") {
                    echo $this->response->json_response(400, "Gambar foto dimensi minimal 320x260");
                    exit; 
                }
                if ($this->compressImage($_FILES['file']['tmp_name'],$location,60)) {
                    // jika password kosong
                    if(empty($_POST["password"])){
                        $this->database->update("sekolah_users",
                            ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"foto" => "1","mapel_id" => $_POST["mapel_id"],"superuser" => $_POST["superuser"]],
                            ["id" => $_POST["id"]]
                        );
                        if($this->database->error){
                            echo $this->response->json_response(400,"Username sudah ada");
                            exit;
                        }
                        echo $this->response->json_response(200, "berhasil");
                    }else{
                        $ciphertext = $bcrypt->encrypt($_POST["password"],"2a");
                        $this->database->update("sekolah_users",
                            ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"foto" => "1","password" => $ciphertext,"mapel_id" => $_POST["mapel_id"],"superuser" => $_POST["superuser"]],
                            ["id" => $_POST["id"]]
                        );
                        if($this->database->error){
                            echo $this->response->json_response(400,"Username sudah ada");
                            exit;
                        }
                        echo $this->response->json_response(200, "berhasil");
                    }
                }else{                
                    echo $this->response->json_response(400, "Maaf, terjadi kesalahan saat mengunggah file Anda");
                }
            }else{
                // tanpa foto dan jika password kosong
                if(empty($_POST["password"])){
                    $this->database->update("sekolah_users",
                        ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"mapel_id" => $_POST["mapel_id"],"superuser" => $_POST["superuser"]],
                        ["id" => $_POST["id"]]
                    );
                    if($this->database->error){
                        echo $this->response->json_response(400,"Username sudah ada");
                        exit;
                    }
                    echo $this->response->json_response(200, "berhasil");
                }else{
                    $ciphertext = $bcrypt->encrypt($_POST["password"],"2a");
                    $this->database->update("sekolah_users",
                        ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"password" => $ciphertext,"mapel_id" => $_POST["mapel_id"],"superuser" => $_POST["superuser"]],
                        ["id" => $_POST["id"]]
                    );
                    if($this->database->error){
                        echo $this->response->json_response(400,"Username sudah ada");
                        exit;
                    }
                    echo $this->response->json_response(200, "berhasil");
                }
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
            elseif($v->errors('superuser')){
                echo $this->response->json_response(400,"Input superuser kosong");
            } 
                          
        }
    }

    public function pendidikDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete','metode']);
        if($v->validate()) {
            $data = json_decode($_DELETE["delete"],true);            
            if($_DELETE["metode"] === "single"){
                if($data["id"] === "1"){
                    echo $this->response->json_response(400, "Administrator Dilarang Di Hapus");
                    exit;
                }                
                $hapus = $this->database->delete("sekolah_users",["AND" => ["id" => $data["id"]]]); 
                if($this->database->error){
                    echo $this->response->json_response(400,"Pendidik tidak bisa dihapus, silahkan hapus data yang terkait");
                    exit;
                }
                unlink(__DIR__ ."/../../public/data/users/".$data["username"].".jpg");               
                if($hapus->rowCount() === 0){
                    echo $this->response->json_response(400,"Data tidak ditemukan ".$data["id"]);
                }else{                
                    echo $this->response->json_response(200,"berhasil");
                } 
            }
            if($_DELETE["metode"] === "multi"){
                $arrayData = $this->reMapToArrayIDuserName($data);
                if(in_array("1", $arrayData[0])){
                    echo $this->response->json_response(400, "Administrator Dilarang Di Hapus");
                    exit;
                }                 
                $hapus = $this->database->delete("sekolah_users",["AND" => ["id" => $arrayData[0]]]);
                if($this->database->error){
                    echo $this->response->json_response(400,"Pendidik tidak bisa dihapus, silahkan hapus data yang terkait");
                    exit;
                }
                foreach ($arrayData[1] as $username) {
                    unlink(__DIR__ ."/../../public/data/users/".$username.".jpg");
                } 
                if($hapus->rowCount() === 0){
                    echo $this->response->json_response(400,"Data tidak ditemukan");
                }else{                
                    echo $this->response->json_response(200,"berhasil");
                }
            }                                                                   
        }else{
            if($v->errors('delete')){
                echo $this->response->json_response(400,"delete id kosong"); 
            }
        }
    }

    public function siswa()
    {                
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $kelasID = isset($_GET['kelas'])? (int)$_GET["kelas"]:1;  
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;        
        $kelas = $this->database->select("sekolah_kelasnama",["id","nama"],["ORDER" => ["nama" => "ASC"]]); 
        $totalRow = $this->database->count("sekolah_siswa");        
        if(isset($_GET['cari'])){
            $siswa = $this->database->select("sekolah_siswa",["[>]sekolah_kelasnama" => ["kelas_id" => "id"]],["sekolah_siswa.id","sekolah_siswa.nama","sekolah_siswa.jenis","sekolah_siswa.username","sekolah_siswa.no_absens(absen)","sekolah_kelasnama.nama(kelas)"],["sekolah_siswa.nama[~]" => $cari]);
            $data = array("data" => $siswa,"kelas" => $kelas,"totaldata" => $totalRow ,"nextpage"=> false );
        }
        elseif(isset($_GET['kelas'])){
            $totalKelas = $this->database->count("sekolah_siswa",["kelas_id" => $kelasID]); 
            $siswa = $this->database->select("sekolah_siswa",["[>]sekolah_kelasnama" => ["kelas_id" => "id"]],["sekolah_siswa.id","sekolah_siswa.nama","sekolah_siswa.jenis","sekolah_siswa.username","sekolah_siswa.no_absens(absen)","sekolah_kelasnama.nama(kelas)"],["sekolah_siswa.kelas_id" => $kelasID ,"LIMIT" => [$mulai,$totalData],"ORDER" => ["sekolah_siswa.no_absens" => "ASC"]]);
            $pages = ceil($totalKelas/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $siswa,"kelas" => $kelas,"totaldata" => $totalKelas,"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );
        }else{
            $siswa = $this->database->select("sekolah_siswa",["[>]sekolah_kelasnama" => ["kelas_id" => "id"]],["sekolah_siswa.id","sekolah_siswa.nama","sekolah_siswa.jenis","sekolah_siswa.username","sekolah_siswa.no_absens(absen)","sekolah_kelasnama.nama(kelas)"],["LIMIT" => [$mulai,$totalData],"ORDER" => ["sekolah_siswa.id" => "DESC"]]); 
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;            
            $data = array("data" => $siswa,"kelas" => $kelas,"totaldata" => $totalRow,"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );
        }                                     
             
        echo $this->response->json_response(200, $data);   
    }

    public function siswaKelas()
    {
        $kelas = $this->database->select("sekolah_kelasnama",["id","nama"],["ORDER" => ["nama" => "ASC"]]); 
        echo $this->response->json_response(200, $kelas);
    }

    public function countSiswaKelas($id)
    {
        $totalSiswa = $this->database->count("sekolah_siswa",["kelas_id" => $id]);
        echo $this->response->json_response(200, $totalSiswa); 
    }

    public function siswaView($id)
    {
        $kelas = $this->database->select("sekolah_kelasnama",["id","nama"]);  
        $siswa = $this->database->select("sekolah_siswa",["id","nama","jenis","foto[Bool]","username","no_absens","kelas_id"],["id" => $id]);
        $data = array("data" => $siswa[0],"kelas"=>$kelas);
        echo $this->response->json_response(200, $data);
    }

    public function siswaFotoDelete($username)
    {
        $_DELETE = RequestParser::parse()->params; 
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {
            unlink(__DIR__ ."/../../public/data/siswa/".$username.".jpg");
            $this->database->update("sekolah_siswa",["foto" => "0"],["id" => $_DELETE["delete"]]);
            echo $this->response->json_response(200,"berhasil");     
        }else{
            if($v->errors('delete')){
                echo $this->response->json_response(400,"id data kosong"); 
            }  
        }
    }

    public function siswaAdd()
    {        
        $bcrypt = new Bcrypt();
        $v = new Validator($_POST);
        $v->rule('required', ['nama','jenis','kelas','absen','username','password','rePassword']);
        if($v->validate()) { 
            if($_POST["password"] != $_POST["rePassword"]){
                echo $this->response->json_response(400,"Password konfirmasi tidak sama");
                exit;
            }
            
            $ciphertext = $bcrypt->encrypt($_POST["password"],"2a");
            // if ada foto            
            if (!empty($_FILES["file"])) {
                $fileinfo = getimagesize($_FILES["file"]["tmp_name"]);
                $width = $fileinfo[0];
                $height = $fileinfo[1];
                $file_type = $_FILES['file']['type'];
                $allowed = array("image/jpeg","image/png");
                $location = __DIR__ ."/../../public/data/siswa/".$_POST["username"].".jpg";
                if(!in_array($file_type, $allowed)) {
                    echo $this->response->json_response(400, "Hanya file png, jpeg dan jpg yang bisa di upload");
                    exit;
                }
                if ($_FILES["file"]["size"] > 2000000) {
                    echo $this->response->json_response(400, "Ukuran gambar melebihi 2MB");
                    exit;      
                }        
                if ($width < "260" || $height < "320") {
                    echo $this->response->json_response(400, "Gambar foto dimensi minimal 320x260");
                    exit; 
                }
                if ($this->compressImage($_FILES['file']['tmp_name'],$location,60)) {
                    // insert new siswa with foto to database       
                    $this->database->insert("sekolah_siswa",
                        ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"foto" => "1","password" => $ciphertext ,"kelas_id" => $_POST["kelas"],"no_absens" => $_POST["absen"]]
                    );
                    if($this->database->error){
                        echo $this->response->json_response(400,"Username sudah ada");
                        exit;
                    }
                    echo $this->response->json_response(200,"berhasil");
                }else{                
                    echo $this->response->json_response(400, "Maaf, terjadi kesalahan saat mengunggah file Anda");
                }
            }else{
                // insert new siswa to database       
                $this->database->insert("sekolah_siswa",
                    ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"password" => $ciphertext ,"kelas_id" => $_POST["kelas"],"no_absens" => $_POST["absen"]]
                );  
                if($this->database->error){
                    echo $this->response->json_response(400,"Username sudah ada");
                    exit;
                }      
                echo $this->response->json_response(200, "berhasil");
            }
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
            elseif($v->errors('rePassword')){
                echo $this->response->json_response(400,"Input rePassword kosong");
            }  
            elseif($v->errors('kelas')){
                echo $this->response->json_response(400,"Input kelas kosong");
            } 
            elseif($v->errors('absen')){
                echo $this->response->json_response(400,"Input nomor absens kosong");
            }          
        }
    }

    public function siswaUpdate()
    {          
        $bcrypt = new Bcrypt();                                          
        $v = new Validator($_POST);
        $v->rule('required', ['id','nama','jenis','kelas','absen','username']);
        if($v->validate()) {
            if( !empty($_POST["password"]) && $_POST["password"] != $_POST["rePassword"]){
                echo $this->response->json_response(400,"Password konfirmasi tidak sama");
                exit;
            }
            if($_POST["username"] != $_POST["lastUsername"]){
                unlink(__DIR__ ."/../../public/data/siswa/".$_POST["lastUsername"].".jpg");                
            }
            // if ada foto
            if (!empty($_FILES["file"])) {
                $fileinfo = getimagesize($_FILES["file"]["tmp_name"]);
                $width = $fileinfo[0];
                $height = $fileinfo[1];
                $file_type = $_FILES['file']['type'];
                $allowed = array("image/jpeg","image/png");
                $location = __DIR__ ."/../../public/data/siswa/".$_POST["username"].".jpg";
                if(!in_array($file_type, $allowed)) {
                    echo $this->response->json_response(400, "Hanya file png, jpeg dan jpg yang bisa di upload");
                    exit;
                }
                if ($_FILES["file"]["size"] > 2000000) {
                    echo $this->response->json_response(400, "Ukuran gambar melebihi 2MB");
                    exit;      
                }        
                if ($width < "260" || $height < "320") {
                    echo $this->response->json_response(400, "Gambar foto dimensi minimal 320x260");
                    exit; 
                }
                if ($this->compressImage($_FILES['file']['tmp_name'],$location,60)) {
                    // jika password kosong
                    if(empty($_POST["password"])){
                        $this->database->update("sekolah_siswa",
                            ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"foto" => "1","kelas_id" => $_POST["kelas"],"no_absens" => $_POST["absen"]],
                            ["id" => $_POST["id"]]
                        );
                        if($this->database->error){
                            echo $this->response->json_response(400,"Username sudah ada");                            
                            exit;
                        }
                        echo $this->response->json_response(200, "berhasil");
                    }else{
                        $ciphertext = $bcrypt->encrypt($_POST["password"],"2a");
                        $this->database->update("sekolah_siswa",
                            ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"foto" => "1","password" => $ciphertext,"kelas_id" => $_POST["kelas"],"no_absens" => $_POST["absen"]],
                            ["id" => $_POST["id"]]
                        );
                        if($this->database->error){
                            echo $this->response->json_response(400,"Username sudah ada");
                            exit;
                        }
                        echo $this->response->json_response(200, "berhasil");
                    }
                }else{                
                    echo $this->response->json_response(400, "Maaf, terjadi kesalahan saat mengunggah file Anda");
                }
            }else{
                // tanpa foto dan jika password kosong
                if(empty($_POST["password"])){
                    $this->database->update("sekolah_siswa",
                        ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"kelas_id" => $_POST["kelas"],"no_absens" => $_POST["absen"]],
                        ["id" => $_POST["id"]]
                    );
                    if($this->database->error){
                        echo $this->response->json_response(400,"Username sudah ada");                        
                        exit;
                    }
                    echo $this->response->json_response(200, "berhasil");
                }else{
                    $ciphertext = $bcrypt->encrypt($_POST["password"],"2a");
                    $this->database->update("sekolah_siswa",
                        ["nama" => $_POST["nama"],"jenis" => $_POST["jenis"],"username" => strtolower($_POST["username"]),"password" => $ciphertext,"kelas_id" => $_POST["kelas"],"no_absens" => $_POST["absen"]],
                        ["id" => $_POST["id"]]
                    );
                    if($this->database->error){
                        echo $this->response->json_response(400,"Username sudah ada");
                        exit;
                    }
                    echo $this->response->json_response(200, "berhasil");
                }
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
            elseif($v->errors('kelas')){
                echo $this->response->json_response(400,"Input kelas kosong");
            } 
            elseif($v->errors('absen')){
                echo $this->response->json_response(400,"Input nomor absens kosong");
            } 
                          
        }
    }

    public function siswaDelete()
    {   
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete','metode']);
        if($v->validate()) {
            $data = json_decode($_DELETE["delete"],true);
            if($_DELETE["metode"] === "single"){
                unlink(__DIR__ ."/../../public/data/siswa/".$data["username"].".jpg");
                $hapus = $this->database->delete("sekolah_siswa",["AND" => ["id" => $data["id"]]]);                
                if($hapus->rowCount() === 0){
                    echo $this->response->json_response(400,"Data tidak ditemukan".$data["id"]);
                }else{                
                    echo $this->response->json_response(200,"berhasil");
                } 
            }
            if($_DELETE["metode"] === "multi"){
                $arrayData = $this->reMapToArrayIDuserName($data);
                foreach ($arrayData[1] as $username) {
                    unlink(__DIR__ ."/../../public/data/siswa/".$username.".jpg");
                }                
                $hapus = $this->database->delete("sekolah_siswa",["AND" => ["id" => $arrayData[0]]]);                
                if($hapus->rowCount() === 0){
                    echo $this->response->json_response(400,"Data tidak ditemukan");
                }else{                
                    echo $this->response->json_response(200,"berhasil");
                }
            }                                                                   
        }else{
            if($v->errors('delete')){
                echo $this->response->json_response(400,"delete id kosong"); 
            }
        }
    }

    public function siswaMultiUpdate()
    {
        $_PATCH = RequestParser::parse()->params;  
        $v = new Validator($_PATCH);
        $v->rule('required', ['update','kelas']);
        if($v->validate()) {
            $arrayData = $this->objectSiswaToArray(json_decode($_PATCH["update"],true));
            $update = $this->database->update("sekolah_siswa",["kelas_id" => $_PATCH["kelas"]],["id" => $arrayData]);                                
            if($update->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200,"berhasil");
            }                      
        }else{
            if($v->errors('update')){
                echo $this->response->json_response(400,"update data pilih kosong"); 
            }elseif($v->errors('kelas')){
                echo $this->response->json_response(400,"Pilih kelas kosong"); 
            }
        }           
        
    }

    // utils
    function objectSiswaToArray($obj)
    {
        $userID = array(); 
        foreach ($obj as $val) {            
            $userID[] = $val['id'];            
        }        
        return $userID;
    }

    function reMapToArrayIDuserName($obj)
    {
        $userID = array();        
        $userName = array();   
        foreach ($obj as $val) {            
            $userID[] = $val['id'];
            $userName[] = $val['username'];
        }        
        return [$userID,$userName];
    }

    function reMapwithMapel($data,$mapel)
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