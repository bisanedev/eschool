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
        $cekAuth = $this->database->select("siswa",["id","username","jenis","password","unique_token"],[
                "username" => $_POST["username"]
        ]);        
        if(!empty($cekAuth)){            
            if($bcrypt->verify($_POST["password"], $cekAuth[0]['password'])){
                $objectUserData = new stdClass();                
                $objectUserData->id = $cekAuth[0]["id"];               
                $objectUserData->username = $cekAuth[0]["username"];                
                $objectUserData->jenis = $cekAuth[0]["jenis"]; 
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
                    $this->database->update("siswa",["expired_token" => $now->modify('+1 year')->getTimestamp(),"unique_token" => $uniqueToken],["id" => $cekAuth[0]['id']]);                    
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
                    $this->database->update("siswa",["expired_token" => $now->modify('+1 day')->getTimestamp(),"unique_token" => $uniqueToken],["id" => $cekAuth[0]['id']]);                    
                    $data = array("user" => $objectUserData,"token" => $token->toString() );
                    echo $this->response->json_response(200,$data);
                }                 
            }else{
                echo $this->response->json_response(401, "Password Salah!"); 
            }
        }else{
            echo $this->response->json_response(401, "User tidak di temukan"); 
        }
        } else {
            // Errors  
            if($v->errors('username')){
                echo $this->response->json_response(401,"Input username kosong"); 
            }elseif($v->errors('password')){
                echo $this->response->json_response(401,"Input password kosong"); 
            }       
        }           
    }   
}