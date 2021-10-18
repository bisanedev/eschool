<?php
namespace App\PendidikControllers;
use App\PendidikControllers\ApiController;
use Notihnio\RequestParser\RequestParser;
use App\Utils\HeaderResponse;
use Medoo\Medoo;
use Lcobucci\JWT\Configuration;
use Valitron\Validator;
use Bcrypt\Bcrypt;

class ProfileController extends ApiController
{                 
    public function __construct(HeaderResponse $response,Medoo $database,Configuration $jwt)
    {        
        parent::__construct($response,$database,$jwt);        
    }

    public function gantiPassword()
    {
        $id = $this->token->claims()->get('uid');
        $bcrypt = new Bcrypt();
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['curPassword','newPassword','rePassword']);        
        if($v->validate()) {
            $cekAuth = $this->database->select("users",["password"],["id" => $id]);
            if(!$bcrypt->verify($_PATCH["curPassword"],  $cekAuth[0]['password'])){
                echo $this->response->json_response(400, "Password saat ini tidak sesuai!");
                exit;
            }
            if($_PATCH["newPassword"] != $_PATCH["rePassword"]){
                echo $this->response->json_response(400, "Password baru dan password konfirmasi tidak sama!"); 
                exit;
            }            
            $ciphertext = $bcrypt->encrypt($_PATCH["rePassword"],"2a");
            $update = $this->database->update("users",["password" => $ciphertext],["id" => $id]);
            if($update->rowCount() == 0){
                echo $this->response->json_response(400, "Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200, "berhasil");
            }            
        }else{
            if($v->errors('curPassword')){
                echo $this->response->json_response(400,"Input password saat ini kosong"); 
            }elseif($v->errors('newPassword')){
                echo $this->response->json_response(400,"Input password baru kosong"); 
            }elseif($v->errors('rePassword')){
                echo $this->response->json_response(400,"Input ketik ulang password baru kosong");
            }            
        } 
    }

    public function uploadFoto()
    {                    
        $filename = $this->token->claims()->get('username');        
        if (empty($_FILES["file"])) {
            echo $this->response->json_response(400, "File gambar kosong !!");
            exit;
        }
        $fileinfo = getimagesize($_FILES["file"]["tmp_name"]);
        $width = $fileinfo[0];
        $height = $fileinfo[1];
        $file_type = $_FILES['file']['type'];
        $allowed = array("image/jpeg","image/png");
        $location = __DIR__ ."/../../public/data/users/".$filename.".jpg";
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
            echo $this->response->json_response(200,"berhasil");
        }else{                
            echo $this->response->json_response(400, "Maaf, terjadi kesalahan saat mengunggah file Anda");
        }
    }

}