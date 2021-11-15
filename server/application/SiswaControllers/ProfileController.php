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

}