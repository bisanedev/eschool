<?php
namespace App\SiswaControllers;
use Bcrypt\Bcrypt;
use App\Utils\HeaderResponse;
use Valitron\Validator;
use Medoo\Medoo;
use Lcobucci\JWT\Configuration;
use DateTimeImmutable;
use stdClass;

class AuthController 
{
    private $database;
    private $response;    

    public function __construct(Medoo $database,HeaderResponse $response,Configuration $jwt)
    {
        $this->database = $database;
        $this->response = $response;        
        $this->jwt = $jwt;
    }

    public function login()
    {                                   
        $bcrypt = new Bcrypt();        
        $bcrypt_version = '2a';                       
        $v = new Validator($_POST);
        $v->rule('required', ['username', 'password']);
        if($v->validate()) {      
        $cekAuth = $this->database->select("sekolah_siswa",["[>]sekolah_kelasnama" => ["kelas_id" => "id"]],["sekolah_siswa.id","sekolah_siswa.nama","sekolah_siswa.username","sekolah_siswa.jenis","sekolah_siswa.no_absens","sekolah_siswa.foto[Bool]","sekolah_siswa.password","sekolah_kelasnama.nama(kelas)","sekolah_siswa.unique_token"],[
                "sekolah_siswa.username" => $_POST["username"]
        ]);        
        if(!empty($cekAuth)){            
            if($bcrypt->verify($_POST["password"], $cekAuth[0]['password'])){
                $objectUserData = new stdClass();                
                $objectUserData->nama = $cekAuth[0]["nama"];                 
                $objectUserData->username = $cekAuth[0]["username"];                
                $objectUserData->jenis = $cekAuth[0]["jenis"];
                $objectUserData->foto = $cekAuth[0]["foto"];
                $objectUserData->kelas = $cekAuth[0]["kelas"];
                $objectUserData->no_absens = $cekAuth[0]["no_absens"];                
                // create token                
                $now = new DateTimeImmutable(); 
                $uniqueToken = uniqid();                       
                //remember
                if($_POST['remember'] == 'Yes'){
                    //never expired
                    $token = $this->jwt->builder()
                    ->issuedBy($_SERVER['SERVER_NAME'])
                    ->permittedFor($_SERVER['SERVER_NAME']) 
                    ->identifiedBy('eSchool', true)      
                    ->issuedAt($now)                    
                    ->canOnlyBeUsedAfter($now)
                    ->expiresAt($now->modify('+1 year'))                    
                    ->withClaim('uid',$cekAuth[0]['id'])
                    ->withClaim('username',$cekAuth[0]['username'])                    
                    ->withClaim('jenis',$cekAuth[0]['jenis'])                    
                    ->withClaim('uniqueToken',$uniqueToken)                    
                    ->getToken($this->jwt->signer(), $this->jwt->signingKey());
                    $this->database->update("sekolah_siswa",["expired_token" => $now->modify('+1 year')->getTimestamp(),"unique_token" => $uniqueToken],["id" => $cekAuth[0]['id']]);                    
                    $data = array("user" => $objectUserData,"token" => $token->toString() );
                    echo $this->response->json_response(200,$data);
                }else{
                    // expired 24 jam
                    $token = $this->jwt->builder()
                    ->issuedBy($_SERVER['SERVER_NAME'])
                    ->permittedFor($_SERVER['SERVER_NAME']) 
                    ->identifiedBy('eSchool', true)      
                    ->issuedAt($now)
                    ->canOnlyBeUsedAfter($now)
                    ->expiresAt($now->modify('+1 day'))
                    ->withClaim('uid',$cekAuth[0]['id'])
                    ->withClaim('username',$cekAuth[0]['username'])                    
                    ->withClaim('jenis',$cekAuth[0]['jenis'])                    
                    ->withClaim('uniqueToken',$uniqueToken)      
                    ->getToken($this->jwt->signer(), $this->jwt->signingKey());
                    $this->database->update("sekolah_siswa",["expired_token" => $now->modify('+1 day')->getTimestamp(),"unique_token" => $uniqueToken],["id" => $cekAuth[0]['id']]);                    
                    $data = array("user" => $objectUserData,"token" => $token->toString() );
                    echo $this->response->json_response(200,$data);
                }                 
            }else{
                $data = array("password" => "Password Salah!" );
                echo $this->response->json_response(401, $data); 
            }
        }else{
            $data = array("username" => "Username tidak di temukan" );
            echo $this->response->json_response(401, $data); 
        }
        } else {
            // Errors  
            $data = array();
            if($v->errors('username')){
                $data['username'] = "Input username kosong";                
            }
            if($v->errors('password')){
                $data['password'] = "Input password kosong";                                
            }
            echo $this->response->json_response(401,$data);     
        }           
    }   
}