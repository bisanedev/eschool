<?php
namespace App\PendidikControllers;
use App\PendidikControllers\ApiController;
use Notihnio\RequestParser\RequestParser;
use App\Utils\HeaderResponse;
use Medoo\Medoo;
use Valitron\Validator;
use Lcobucci\JWT\Configuration;
use stdClass;

class QuizController extends ApiController
{                 
    public function __construct(HeaderResponse $response,Medoo $database,Configuration $jwt)
    {        
        parent::__construct($response,$database,$jwt);        
    }

    public function IndexTingkatan()
    {                
        $data = $this->database->select("sekolah_kelastingkatan",["id","nama"]);        
        echo $this->response->json_response(200, $data);
    }

    public function IndexMapel($tingkatID)
    {                
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama","color"]);        
        $data = array("data" => $mapel,"tingkatan"=> $tingkatan[0] );
        echo $this->response->json_response(200, $data);
    }

    public function IndexSemester($tingkatID,$mapelID)
    {                
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"]);        
        $data = array("data" => $semester,"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0] );
        echo $this->response->json_response(200, $data);
    }
    
    public function IndexForms($tingkatID,$mapelID,$semesterID)
    {
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);
        $data = array("semester" => $semester[0],"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0] );
        echo $this->response->json_response(200, $data);
    }

    public function SoalPilihan($tingkatID,$mapelID,$semesterID)
    {
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;

        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]);
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);
        $totalRow = $this->database->count("quiz_banksoal_pilihan",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID]]);

        if(isset($_GET['cari'])){
            $soal = $this->database->select("quiz_banksoal_pilihan",["id","pertanyaan_text","pertanyaan_images","pertanyaan_audio","pilihan[JSON]","jawaban"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"pertanyaan_text[~]" => $cari]);
            $data = array("data" => $soal,"totaldata"=>$totalRow ,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0] ,"nextpage"=> false );
        }else{
            $soal = $this->database->select("quiz_banksoal_pilihan",["id","pertanyaan_text","pertanyaan_images","pertanyaan_audio","pilihan[JSON]","jawaban"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $soal,"totaldata"=>$totalRow,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0],"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );            
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function SoalPilihanAdd($tingkatID,$mapelID,$semesterID)
    {
        $v = new Validator($_POST);
        $v->rule('required', ['pertanyaan_text','jawaban']);
        if($v->validate()) {            
            $this->database->insert("quiz_banksoal_pilihan",["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID,"pertanyaan_text" => $_POST["pertanyaan_text"],"jawaban" => $_POST["jawaban"]]);           
            $lastID = $this->database->id();
            if (!file_exists(__DIR__ ."/../../public/data/soal/pilihan/".$lastID)) {
                mkdir(__DIR__ ."/../../public/data/soal/pilihan/".$lastID, 0777, true);
            }else{
                echo $this->response->json_response(400,"File upload terkendala");  
            }
            //echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('pertanyaan_text')){
                echo $this->response->json_response(400,"Input pertanyaan text kosong"); 
            } 
            elseif($v->errors('jawaban')){
                echo $this->response->json_response(400,"Input jawaban kosong"); 
            }             
        }        
    }

    public function SoalPilihanUpdate($tingkatID,$mapelID,$semesterID,$soalID)
    {

    }

    public function SoalPilihanDelete()
    {
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("quiz_banksoal_pilihan",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
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

    public function SoalEssay($tingkatID,$mapelID,$semesterID)
    {
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;

        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]);
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);
        $totalRow = $this->database->count("quiz_banksoal_essay",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID]]);

        if(isset($_GET['cari'])){
            $soal = $this->database->select("quiz_banksoal_essay",["id","pertanyaan_text"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"pertanyaan_text[~]" => $cari]);
            $data = array("data" => $soal,"totaldata"=>$totalRow ,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0] ,"nextpage"=> false );
        }else{
            $soal = $this->database->select("quiz_banksoal_essay",["id","pertanyaan_text"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $soal,"totaldata"=>$totalRow,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0],"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function SoalEssayDelete()
    {
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                                         
            $hapus=$this->database->delete("quiz_banksoal_essay",["AND" => ["id" => json_decode($_DELETE['delete'])]]);
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


}