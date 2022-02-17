<?php
namespace App\SiswaControllers;
use App\SiswaControllers\ApiController;
use Notihnio\RequestParser\RequestParser;
use App\Utils\HeaderResponse;
use Medoo\Medoo;
use Lcobucci\JWT\Configuration;

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
                echo $this->response->json_response(400, "Password saat ini tidak sesuai!");
                exit;
            }
            if($_PATCH["newPassword"] != $_PATCH["rePassword"]){
                echo $this->response->json_response(400, "Password baru dan password konfirmasi tidak sama!"); 
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
            if($v->errors('curPassword')){
                echo $this->response->json_response(400,"Input password saat ini kosong"); 
            }elseif($v->errors('newPassword')){
                echo $this->response->json_response(400,"Input password baru kosong"); 
            }elseif($v->errors('rePassword')){
                echo $this->response->json_response(400,"Input ketik ulang password baru kosong");
            }            
        } 
    }

}