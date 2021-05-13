<?php
namespace App\AdminControllers;
use Bcrypt\Bcrypt;
use App\Utils\HeaderResponse;
use Valitron\Validator;
use Medoo\Medoo;
use Lcobucci\JWT\Configuration;
use DateTimeImmutable;

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
        $cekAuth = $this->database->select("user_admin",["id","username","password","nama","jenis","foto"],[
            "username" => $_POST["username"]
        ]);        
        if(!empty($cekAuth)){            
            if($bcrypt->verify($_POST["password"], $cekAuth[0]['password'])){
                // create token                
                $now = new DateTimeImmutable();                       
                //remember
                if($_POST['remember'] == 'Yes'){
                    //never expired
                    $token = $this->jwt->builder()
                    ->issuedBy($_SERVER['SERVER_NAME'])
                    ->permittedFor($_SERVER['SERVER_NAME']) 
                    ->identifiedBy('EschoolLoh', true)      
                    ->issuedAt($now)                    
                    ->canOnlyBeUsedAfter($now)
                    ->expiresAt($now->modify('+1 year'))                    
                    ->withClaim('uid',$cekAuth[0]['id'])                                   
                    ->getToken($this->jwt->signer(), $this->jwt->signingKey());
                    $this->database->update("user_admin",["expired_token" => $now->modify('+1 year')->getTimestamp()],["id" => $cekAuth[0]['id']]);
                    $data = array("token" => $token->toString(),"nama" => $cekAuth[0]['nama'],"jenis" => $cekAuth[0]['jenis'] === "0" ? "Laki-Laki":"Perempuan","foto" => $cekAuth[0]['foto'] , "username" => $cekAuth[0]['username']);                    
                    echo $this->response->json_response(200,$data);
                }else{
                    // expired 24 jam
                    $token = $this->jwt->builder()
                    ->issuedBy($_SERVER['SERVER_NAME'])
                    ->permittedFor($_SERVER['SERVER_NAME']) 
                    ->identifiedBy('EschoolLoh', true)      
                    ->issuedAt($now)
                    ->canOnlyBeUsedAfter($now)
                    ->expiresAt($now->modify('+1 day'))
                    ->withClaim('uid',$cekAuth[0]['id'])                      
                    ->getToken($this->jwt->signer(), $this->jwt->signingKey());
                    $this->database->update("users",["expired_token" => $now->modify('+1 day')->getTimestamp()],["id" => $cekAuth[0]['id']]);                    
                    $data = array("token" => $token->toString(),"nama" => $cekAuth[0]['nama'],"jenis" => $cekAuth[0]['jenis'] === "0" ? "Laki-Laki":"Perempuan","foto" => $cekAuth[0]['foto'] , "username" => $cekAuth[0]['username']);
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
            echo $this->response->json_response(400,$v->errors());            
        }           
    }   
}