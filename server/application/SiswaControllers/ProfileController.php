<?php
namespace App\SiswaControllers;
use App\SiswaControllers\ApiController;
use Notihnio\RequestParser\RequestParser;
use App\Utils\HeaderResponse;
use Medoo\Medoo;
use Lcobucci\JWT\Configuration;
use Bcrypt\Bcrypt;
use Valitron\Validator;

class ProfileController extends ApiController
{                 
    public function __construct(HeaderResponse $response,Medoo $database,Configuration $jwt)
    {        
        parent::__construct($response,$database,$jwt);        
    }

    public function index()
    {        
        $id = $this->token->claims()->get('uid');
        $data = $this->database->select("siswa",["[>]kelas_nama" => ["kelas_id" => "id"]],["siswa.nama","siswa.jenis","siswa.username","siswa.foto[Bool]","siswa.no_absens","kelas_nama.nama(kelas)"],["siswa.id" => $id]);
        echo $this->response->json_response(200, $data[0] );
    }
    
    public function gantiPassword()
    {
        $id = $this->token->claims()->get('uid');
        $bcrypt = new Bcrypt();
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['curPassword','newPassword','rePassword']);        
        if($v->validate()) {
            $cekAuth = $this->database->select("sekolah_siswa",["password"],["id" => $id]);
            if(!$bcrypt->verify($_PATCH["curPassword"],  $cekAuth[0]['password'])){                
                $data = array("curpassword" => "Password saat ini tidak sesuai!");                
                echo $this->response->json_response(400,$data); 
                exit;
            }
            if($_PATCH["newPassword"] != $_PATCH["rePassword"]){                
                $data = array();
                $data['newpassword'] = "Password baru dan password konfirmasi tidak sama!";
                $data['rePassword'] = "Password baru dan password konfirmasi tidak sama!"; 
                echo $this->response->json_response(400,$data);  
                exit;
            }            
            $ciphertext = $bcrypt->encrypt($_PATCH["rePassword"],"2a");
            $update = $this->database->update("sekolah_siswa",["password" => $ciphertext],["id" => $id]);
            if($update->rowCount() == 0){
                echo $this->response->json_response(400, "Data tidak ditemukan");
            }else{
                echo $this->response->json_response(200, "berhasil");
            }            
        }else{
            $data = array();
            if($v->errors('curPassword')){
                $data['curpassword'] = "Input password saat ini kosong";                         
            }
            if($v->errors('newPassword')){
                $data['newpassword'] = "Input password baru kosong";                             
            }
            if($v->errors('rePassword')){
                $data['repassword'] = "Input ketik ulang password baru kosong";                                     
            } 
            echo $this->response->json_response(400,$data);   
        } 
    }

}