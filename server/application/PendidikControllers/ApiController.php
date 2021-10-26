<?php
namespace App\PendidikControllers;
use DateTimeZone;
use Lcobucci\Clock\SystemClock;
use Lcobucci\JWT\Validation\Constraint\IdentifiedBy;
use Lcobucci\JWT\Validation\Constraint\ValidAt;
use Lcobucci\JWT\Validation\Constraint\PermittedFor;
use Lcobucci\JWT\Validation\Constraint\SignedWith;

class ApiController
{    
	public function __construct($response,$database,$jwt)
    {        
        $this->response = $response;
        $this->database = $database;        
        $this->jwt = $jwt;          
        
        $headers=array_change_key_case(apache_request_headers(),CASE_LOWER);
    	if (empty($headers['authorization'])){
            echo $this->response->json_response(400, "Header Kosong");            
            exit;
        }                
        $clock = new SystemClock(new DateTimeZone('Asia/Jakarta'));
        $auth = $headers['authorization'];
        //cek token jwt	                	                 
        if (preg_match('/Bearer\s(\S+)/', $auth, $matches)) {
            $token = $this->jwt->parser()->parse($matches[1]);
            $this->token = $token;
            $constraints = [
                new ValidAt($clock),
                new IdentifiedBy('eSchool'),
                new PermittedFor($_SERVER['SERVER_NAME']),              
                new SignedWith($this->jwt->signer(), $this->jwt->signingKey())
            ];

            if (!$this->jwt->validator()->validate($token, ...$constraints )){
                echo $this->response->json_response(401,"token tidak ter-validasi");
                exit;
            }                        
                      
            //-------- cek user
            $cekUser = $this->database->select("users",["username"],[
                "unique_token" => $token->claims()->get('uniqueToken'),
                "expired_token" => $token->claims()->get('exp')->getTimestamp(),
                "id" => $token->claims()->get('uid')
            ]); 
            
            if(empty($cekUser)){                
                echo $this->response->json_response(401, "Token user tidak ditemukan, Silahkan logout dan login kembali");                
                exit; 
            }           
        }else{
        	echo $this->response->json_response(400, "Header Tidak benar");
        	exit;
        }

    }
    
    public function compressImage($source, $destination, $quality) {    
      $info = getimagesize($source);

      if ($info['mime'] == 'image/jpeg') {
        $image = imagecreatefromjpeg($source);
      } elseif ($info['mime'] == 'image/png') {
        $image = imagecreatefrompng($source);
      } else {
        return 0;
      }      
    
      imagejpeg($image, $destination, $quality);
      imagedestroy($image);
      return 1;
    }

    public function hasSuperuser()
    {
        if($this->token->claims()->get('superuser') != true){        
            echo $this->response->json_response(401, "Akses Superuser Dibutuhkan");
            exit;
        }
    }   
//--- end
}