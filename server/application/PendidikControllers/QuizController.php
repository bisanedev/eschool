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

    public function IndexTingkatanPilihan()
    {                
        $data = $this->database->select("sekolah_kelastingkatan",["id","nama"]); 
        $newData = $this->reMapPilihanTingkatanJumlah($data);        
        echo $this->response->json_response(200, $newData);
    }

    public function IndexMapelPilihan($tingkatID)
    {                
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama","color"]);      
        $newData = $this->reMapPilihanMapelJumlah($mapel,$tingkatID);
        $data = array("data" => $newData,"tingkatan" => $tingkatan[0]);
        echo $this->response->json_response(200, $data);
    }

    public function IndexSemesterPilihan($tingkatID,$mapelID)
    {                
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"]);        
        $newData = $this->reMapPilihanSemesterJumlah($semester,$tingkatID,$mapelID);
        $data = array("data" => $newData,"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0] );
        echo $this->response->json_response(200, $data);
    }

    public function IndexTingkatanEssay()
    {                
        $data = $this->database->select("sekolah_kelastingkatan",["id","nama"]); 
        $newData = $this->reMapEssayTingkatanJumlah($data);        
        echo $this->response->json_response(200, $newData);
    }

    public function IndexMapelEssay($tingkatID)
    {                
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama","color"]);      
        $newData = $this->reMapEssayMapelJumlah($mapel,$tingkatID);
        $data = array("data" => $newData,"tingkatan" => $tingkatan[0]);
        echo $this->response->json_response(200, $data);
    }

    public function IndexSemesterEssay($tingkatID,$mapelID)
    {                
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"]);        
        $newData = $this->reMapEssaySemesterJumlah($semester,$tingkatID,$mapelID);
        $data = array("data" => $newData,"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0] );
        echo $this->response->json_response(200, $data);
    }

    public function IndexTingkatanPaket()
    {                
        $data = $this->database->select("sekolah_kelastingkatan",["id","nama"]); 
        $newData = $this->reMapPaketTingkatanJumlah($data);        
        echo $this->response->json_response(200, $newData);
    }

    public function IndexMapelPaket($tingkatID)
    {                
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama","color"]);      
        $newData = $this->reMapPaketMapelJumlah($mapel,$tingkatID);
        $data = array("data" => $newData,"tingkatan" => $tingkatan[0]);
        echo $this->response->json_response(200, $data);
    }

    public function IndexSemesterPaket($tingkatID,$mapelID)
    {                
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"]);        
        $newData = $this->reMapPaketSemesterJumlah($semester,$tingkatID,$mapelID);
        $data = array("data" => $newData,"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0] );
        echo $this->response->json_response(200, $data);
    }
    
    public function IndexForms($tingkatID,$mapelID,$semesterID)
    {
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);
        $semesterData = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","label" => Medoo::raw("CONCAT(sekolah_semestertahun.nama,' (Semester ',sekolah_semesternama.semester,')')")],["ORDER" => ["id" => "DESC"]]);
        $data = array("semester" => $semester[0],"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0] , "semesterdata" => $semesterData );
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
            $soal = $this->database->select("quiz_banksoal_pilihan",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"pertanyaan_text[~]" => $cari]);
            $data = array("data" => $soal,"totaldata"=>$totalRow ,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0] ,"nextpage"=> false );
        }else{
            $soal = $this->database->select("quiz_banksoal_pilihan",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $soal,"totaldata"=>$totalRow,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0],"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );            
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function SoalPilihanAdd($tingkatID,$mapelID,$semesterID)
    {
        $v = new Validator($_POST);
        $v->rule('required', ['pertanyaan_text','jawaban','pilihan']);
        if($v->validate()) { 
            // filter file size
            if (isset($_FILES["pertanyaan_audio"]) && $_FILES["pertanyaan_audio"]["size"] > 2000000) {
                echo $this->response->json_response(400, "Ukuran pertanyaan audio melebihi 2MB");
                exit;      
            } 
            $allowedAudio = array("audio/mp3","audio/mpeg");            
            if(isset($_FILES["pertanyaan_audio"]) && !in_array($_FILES['pertanyaan_audio']['type'],$allowedAudio)) {
                echo $this->response->json_response(400,"Pertanyaan audio hanya file audio/mp3 yang bisa di upload");
                exit;
            }
            if (isset($_FILES["pertanyaan_images"]) && $_FILES["pertanyaan_images"]["size"] > 2000000) {
                echo $this->response->json_response(400, "Ukuran pertanyaan gambar melebihi 2MB");
                exit;      
            }
            $allowedImages = array("image/jpeg","image/png");
            if(isset($_FILES["pertanyaan_images"]) && !in_array($_FILES['pertanyaan_images']['type'],$allowedImages )) {
                echo $this->response->json_response(400, "Pertanyaan gambar hanya file png, jpeg dan jpg yang bisa di upload");
                exit;
            }
            
            //jawaban file filter              
            if (isset($_FILES["files"])){     
                $isMulti    = is_array($_FILES["files"]);                
                $countfiles = $isMulti?count($_FILES["files"]):1;                                                           
                for($i=0;$i<$countfiles;$i++){                                     
                    if ($_FILES["files"]["size"][$i] > 2000000) {
                        echo $this->response->json_response(400,"Ukuran data jawaban melebihi 2MB");
                        exit;      
                    }       
                }
            }
            //insert database     
            $tex = isset($_POST["pertanyaan_tex"]) ? $_POST["pertanyaan_tex"]:"";       
            $this->database->insert("quiz_banksoal_pilihan",["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID,"pertanyaan_text" => $_POST["pertanyaan_text"],"pertanyaan_tex" => $tex,"jawaban" => $_POST["jawaban"],"pilihan" => $_POST["pilihan"]]);           
            $lastID = $this->database->id();
            //make folder
            if (isset($_FILES["pertanyaan_images"]) || isset($_FILES["pertanyaan_audio"]) || isset($_FILES["files"])){ 
                if (!file_exists(__DIR__ ."/../../public/data/soal/pilihan/".$lastID)) {
                    mkdir(__DIR__ ."/../../public/data/soal/pilihan/".$lastID, 0777, true);
                }
            }
            //upload pertanyaan gambar jika ada
            if (isset($_FILES["pertanyaan_images"])){        
                $location = __DIR__ ."/../../public/data/soal/pilihan/".$lastID."/pertanyaan.jpg";                              
                move_uploaded_file($_FILES["pertanyaan_images"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_pilihan",["pertanyaan_images" => "pertanyaan.jpg"],["id" => $lastID]);                       
            }
            //upload pertanyaan audio jika ada
            if (isset($_FILES["pertanyaan_audio"])){        
                $location = __DIR__ ."/../../public/data/soal/pilihan/".$lastID."/pertanyaan.mp3";                              
                move_uploaded_file($_FILES["pertanyaan_audio"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_pilihan",["pertanyaan_audio" => "pertanyaan.mp3"],["id" => $lastID]);                       
            }
            //upload pilihan files jika ada
            if (isset($_FILES["files"])){
                $isMulti    = is_array($_FILES["files"]);                
                $countfiles = $isMulti?count($_FILES["files"]):1;               
                $location = __DIR__ ."/../../public/data/soal/pilihan/".$lastID;                  
                // Looping all files
                for($i=0;$i<$countfiles;$i++){
                    $filename = $_FILES['files']['name'][$i];  
                    $fileType = $_FILES["files"]["type"][$i];
                    if($fileType === "image/jpeg" || $fileType === "image/png" || $fileType === "audio/mp3"){
                        move_uploaded_file($_FILES['files']['tmp_name'][$i],$location."/".$filename);  
                    }                  
                                      
                }
            }
            //berhasil
            echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('pertanyaan_text')){
                echo $this->response->json_response(400,"Input pertanyaan text kosong"); 
            } 
            elseif($v->errors('jawaban')){
                echo $this->response->json_response(400,"Input jawaban kosong"); 
            }  
            elseif($v->errors('pilihan')){
                echo $this->response->json_response(400,"Input pilihan kosong"); 
            }                        
        }        
    }

    public function SoalPilihanEdit($tingkatID,$mapelID,$semesterID,$soalID)
    {
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);        
        $soal = $this->database->select("quiz_banksoal_pilihan",["id","pertanyaan_text","pertanyaan_images","pertanyaan_tex","pertanyaan_audio","pilihan[JSON]","jawaban[JSON]"],["id" => $soalID]);            
        $data = array("data" => $soal[0] ,"semester" => $semester[0],"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0] );
        echo $this->response->json_response(200, $data);
    }

    public function SoalPilihanUpdate($tingkatID,$mapelID,$semesterID)
    {
        $v = new Validator($_POST);
        $v->rule('required', ['id','pertanyaan_text','jawaban','pilihan']);
        if($v->validate()) {
            // filter file size
            if (isset($_FILES["pertanyaan_audio"]) && $_FILES["pertanyaan_audio"]["size"] > 2000000) {
                echo $this->response->json_response(400, "Ukuran pertanyaan audio melebihi 2MB");
                exit;      
            } 
            $allowedAudio = array("audio/mp3","audio/mpeg");            
            if(isset($_FILES["pertanyaan_audio"]) && !in_array($_FILES['pertanyaan_audio']['type'],$allowedAudio)) {
                echo $this->response->json_response(400,"Pertanyaan audio hanya file audio/mp3 yang bisa di upload");
                exit;
            }
            if (isset($_FILES["pertanyaan_images"]) && $_FILES["pertanyaan_images"]["size"] > 2000000) {
                echo $this->response->json_response(400, "Ukuran pertanyaan gambar melebihi 2MB");
                exit;      
            }
            $allowedImages = array("image/jpeg","image/png");
            if(isset($_FILES["pertanyaan_images"]) && !in_array($_FILES['pertanyaan_images']['type'],$allowedImages )) {
                echo $this->response->json_response(400, "Pertanyaan gambar hanya file png, jpeg dan jpg yang bisa di upload");
                exit;
            }
            
            //jawaban file filter              
            if (isset($_FILES["files"])){     
                $isMulti    = is_array($_FILES["files"]);                
                $countfiles = $isMulti?count($_FILES["files"]):1;                                                           
                for($i=0;$i<$countfiles;$i++){                                     
                    if ($_FILES["files"]["size"][$i] > 2000000) {
                        echo $this->response->json_response(400,"Ukuran data jawaban melebihi 2MB");
                        exit;      
                    }       
                }
            }
            //update database   
            $tex = isset($_POST["pertanyaan_tex"]) ? $_POST["pertanyaan_tex"]:"";
            $this->database->update("quiz_banksoal_pilihan",["pertanyaan_text" => $_POST["pertanyaan_text"],"pertanyaan_tex" => $tex,"jawaban" => $_POST["jawaban"],"pilihan" => $_POST["pilihan"]],["AND" =>["id" => $_POST["id"],"tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID]]);            
            //make folder
            if (isset($_FILES["pertanyaan_images"]) || isset($_FILES["pertanyaan_audio"]) || isset($_FILES["files"])){ 
                if (!file_exists(__DIR__ ."/../../public/data/soal/pilihan/".$_POST["id"])) {
                    mkdir(__DIR__ ."/../../public/data/soal/pilihan/".$_POST["id"], 0777, true);
                }
            }
            //upload pertanyaan gambar jika ada
            if (isset($_FILES["pertanyaan_images"])){        
                $location = __DIR__ ."/../../public/data/soal/pilihan/".$_POST["id"]."/pertanyaan.jpg";                              
                move_uploaded_file($_FILES["pertanyaan_images"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_pilihan",["pertanyaan_images" => "pertanyaan.jpg"],["id" => $_POST["id"]]);                       
            }
            //upload pertanyaan audio jika ada
            if (isset($_FILES["pertanyaan_audio"])){        
                $location = __DIR__ ."/../../public/data/soal/pilihan/".$_POST["id"]."/pertanyaan.mp3";                              
                move_uploaded_file($_FILES["pertanyaan_audio"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_pilihan",["pertanyaan_audio" => "pertanyaan.mp3"],["id" => $_POST["id"]]);                       
            }
            //upload pilihan files jika ada
            if (isset($_FILES["files"])){
                $isMulti    = is_array($_FILES["files"]);                
                $countfiles = $isMulti?count($_FILES["files"]):1;               
                $location = __DIR__ ."/../../public/data/soal/pilihan/".$_POST["id"];                  
                // Looping all files
                for($i=0;$i<$countfiles;$i++){
                    $filename = $_FILES['files']['name'][$i];  
                    $fileType = $_FILES["files"]["type"][$i];
                    if($fileType === "image/jpeg" || $fileType === "image/png" || $fileType === "audio/mp3"){
                        move_uploaded_file($_FILES['files']['tmp_name'][$i],$location."/".$filename);  
                    }                  
                                      
                }
            }
            //berhasil
            echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('pertanyaan_text')){
                echo $this->response->json_response(400,"Input pertanyaan text kosong"); 
            } 
            elseif($v->errors('jawaban')){
                echo $this->response->json_response(400,"Input jawaban kosong"); 
            }  
            elseif($v->errors('id')){
                echo $this->response->json_response(400,"Input id kosong"); 
            }  
            elseif($v->errors('pilihan')){
                echo $this->response->json_response(400,"Input pilihan kosong"); 
            }   
        }
    }

    public function SoalPilihanDelete()
    {
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {    
            $deleteID = json_decode($_DELETE['delete']);                                     
            $hapus=$this->database->delete("quiz_banksoal_pilihan",["AND" => ["id" => $deleteID]]);
            if($hapus->rowCount() === 0){
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                if(is_array($deleteID)){
                    foreach ($deleteID as $value) {
                        $location = __DIR__ ."/../../public/data/soal/pilihan/".$value;  
                        $this->rrmdir($location);               
                    }
                }else{
                    $location = __DIR__ ."/../../public/data/soal/pilihan/".$deleteID;  
                    $this->rrmdir($location);  
                }                                                                           
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
            $soal = $this->database->select("quiz_banksoal_essay",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"pertanyaan_text[~]" => $cari]);
            $data = array("data" => $soal,"totaldata"=>$totalRow ,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0] ,"nextpage"=> false );
        }else{
            $soal = $this->database->select("quiz_banksoal_essay",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $soal,"totaldata"=>$totalRow,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0],"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function SoalEssayAdd($tingkatID,$mapelID,$semesterID)
    {
        $v = new Validator($_POST);
        $v->rule('required', ['pertanyaan_text']);
        if($v->validate()) { 
            // filter file size
            if (isset($_FILES["pertanyaan_audio"]) && $_FILES["pertanyaan_audio"]["size"] > 2000000) {
                echo $this->response->json_response(400, "Ukuran pertanyaan audio melebihi 2MB");
                exit;      
            } 
            $allowedAudio = array("audio/mp3","audio/mpeg");            
            if(isset($_FILES["pertanyaan_audio"]) && !in_array($_FILES['pertanyaan_audio']['type'],$allowedAudio)) {
                echo $this->response->json_response(400,"Pertanyaan audio hanya file audio/mp3 yang bisa di upload");
                exit;
            }
            if (isset($_FILES["pertanyaan_images"]) && $_FILES["pertanyaan_images"]["size"] > 2000000) {
                echo $this->response->json_response(400, "Ukuran pertanyaan gambar melebihi 2MB");
                exit;      
            }
            $allowedImages = array("image/jpeg","image/png");
            if(isset($_FILES["pertanyaan_images"]) && !in_array($_FILES['pertanyaan_images']['type'],$allowedImages )) {
                echo $this->response->json_response(400, "Pertanyaan gambar hanya file png, jpeg dan jpg yang bisa di upload");
                exit;
            }
                   
            //insert database    
            $tex = isset($_POST["pertanyaan_tex"]) ? $_POST["pertanyaan_tex"]:"";        
            $this->database->insert("quiz_banksoal_essay",["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID,"pertanyaan_text" => $_POST["pertanyaan_text"],"pertanyaan_tex" => $tex]);           
            $lastID = $this->database->id();
            //make folder
            if (isset($_FILES["pertanyaan_images"]) || isset($_FILES["pertanyaan_audio"]) || isset($_FILES["files"])){ 
                if (!file_exists(__DIR__ ."/../../public/data/soal/essay/".$lastID)) {
                    mkdir(__DIR__ ."/../../public/data/soal/essay/".$lastID, 0777, true);
                }
            }
            //upload pertanyaan gambar jika ada
            if (isset($_FILES["pertanyaan_images"])){        
                $location = __DIR__ ."/../../public/data/soal/essay/".$lastID."/pertanyaan.jpg";                              
                move_uploaded_file($_FILES["pertanyaan_images"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_essay",["pertanyaan_images" => "pertanyaan.jpg"],["id" => $lastID]);                       
            }
            //upload pertanyaan audio jika ada
            if (isset($_FILES["pertanyaan_audio"])){        
                $location = __DIR__ ."/../../public/data/soal/essay/".$lastID."/pertanyaan.mp3";                              
                move_uploaded_file($_FILES["pertanyaan_audio"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_essay",["pertanyaan_audio" => "pertanyaan.mp3"],["id" => $lastID]);                       
            }       
            //berhasil
            echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('pertanyaan_text')){
                echo $this->response->json_response(400,"Input pertanyaan text kosong"); 
            }                      
        }        
    }    
    
    public function SoalEssayEdit($tingkatID,$mapelID,$semesterID,$soalID)
    {
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);        
        $soal = $this->database->select("quiz_banksoal_essay",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["id" => $soalID]);            
        $data = array("data" => $soal[0] ,"semester" => $semester[0],"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0] );
        echo $this->response->json_response(200, $data);
    }

    public function SoalEssayUpdate($tingkatID,$mapelID,$semesterID)
    {
        $v = new Validator($_POST);
        $v->rule('required', ['id','pertanyaan_text']);
        if($v->validate()) {
            // filter file size
            if (isset($_FILES["pertanyaan_audio"]) && $_FILES["pertanyaan_audio"]["size"] > 2000000) {
                echo $this->response->json_response(400, "Ukuran pertanyaan audio melebihi 2MB");
                exit;      
            } 
            $allowedAudio = array("audio/mp3","audio/mpeg");            
            if(isset($_FILES["pertanyaan_audio"]) && !in_array($_FILES['pertanyaan_audio']['type'],$allowedAudio)) {
                echo $this->response->json_response(400,"Pertanyaan audio hanya file audio/mp3 yang bisa di upload");
                exit;
            }
            if (isset($_FILES["pertanyaan_images"]) && $_FILES["pertanyaan_images"]["size"] > 2000000) {
                echo $this->response->json_response(400, "Ukuran pertanyaan gambar melebihi 2MB");
                exit;      
            }
            $allowedImages = array("image/jpeg","image/png");
            if(isset($_FILES["pertanyaan_images"]) && !in_array($_FILES['pertanyaan_images']['type'],$allowedImages )) {
                echo $this->response->json_response(400, "Pertanyaan gambar hanya file png, jpeg dan jpg yang bisa di upload");
                exit;
            }
            //update database
            $tex = isset($_POST["pertanyaan_tex"]) ? $_POST["pertanyaan_tex"]:"";             
            $this->database->update("quiz_banksoal_essay",["pertanyaan_text" => $_POST["pertanyaan_text"],"pertanyaan_tex" => $tex],["AND" =>["id" => $_POST["id"],"tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID]]);            
            //make folder
            if (isset($_FILES["pertanyaan_images"]) || isset($_FILES["pertanyaan_audio"]) || isset($_FILES["files"])){ 
                if (!file_exists(__DIR__ ."/../../public/data/soal/essay/".$_POST["id"])) {
                    mkdir(__DIR__ ."/../../public/data/soal/essay/".$_POST["id"], 0777, true);
                }
            }
            //upload pertanyaan gambar jika ada
            if (isset($_FILES["pertanyaan_images"])){        
                $location = __DIR__ ."/../../public/data/soal/essay/".$_POST["id"]."/pertanyaan.jpg";                              
                move_uploaded_file($_FILES["pertanyaan_images"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_essay",["pertanyaan_images" => "pertanyaan.jpg"],["id" => $_POST["id"]]);                       
            }
            //upload pertanyaan audio jika ada
            if (isset($_FILES["pertanyaan_audio"])){        
                $location = __DIR__ ."/../../public/data/soal/essay/".$_POST["id"]."/pertanyaan.mp3";                              
                move_uploaded_file($_FILES["pertanyaan_audio"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_essay",["pertanyaan_audio" => "pertanyaan.mp3"],["id" => $_POST["id"]]);                       
            }        
            //berhasil
            echo $this->response->json_response(200, "berhasil");
        }else{
            if($v->errors('pertanyaan_text')){
                echo $this->response->json_response(400,"Input pertanyaan text kosong"); 
            } 
            elseif($v->errors('id')){
                echo $this->response->json_response(400,"Input id kosong"); 
            }  
        }
    }

    public function SoalEssayDelete()
    {
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                          
            $deleteID = json_decode($_DELETE['delete']);                    
            $hapus=$this->database->delete("quiz_banksoal_essay",["AND" => ["id" => $deleteID]]);
            if($hapus->rowCount() === 0){ 
                echo $this->response->json_response(400,"Data tidak ditemukan");
            }else{
                if(is_array($deleteID)){
                    foreach ($deleteID as $value) {
                        $location = __DIR__ ."/../../public/data/soal/essay/".$value;  
                        $this->rrmdir($location);               
                    }
                }else{
                    $location = __DIR__ ."/../../public/data/soal/essay/".$deleteID;  
                    $this->rrmdir($location);  
                }  
                echo $this->response->json_response(200,"berhasil");
            }            
        }else{
            if($v->errors('delete')){
                echo $this->response->json_response(400,"delete id kosong"); 
            }
        }
    }

    public function PaketSoal($tingkatID,$mapelID,$semesterID)
    {
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;

        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]);
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);
        $totalRow = $this->database->count("quiz_paketsoal",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID]]);        

        if(isset($_GET['cari'])){
            $soal = $this->database->select("quiz_paketsoal",["id","nama","acak[bool]","bobot_pilihan","bobot_essay","pilihan_terpilih[JSON]","essay_terpilih[JSON]"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"nama[~]" => $cari]);
            $data = array("data" => $soal,"totaldata" => $totalRow ,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0] ,"nextpage"=> false );
        }else{
            $soal = $this->database->select("quiz_paketsoal",["id","nama","acak[bool]","bobot_pilihan","bobot_essay","pilihan_terpilih[JSON]","essay_terpilih[JSON]"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $soal,"totaldata" => $totalRow,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0],"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );            
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function PaketSoalDelete()
    {
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                          
            $deleteID = json_decode($_DELETE['delete']);                    
            $hapus=$this->database->delete("quiz_paketsoal",["AND" => ["id" => $deleteID]]);
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

    function rrmdir($dir) {
        if (is_dir($dir)) {
          $objects = scandir($dir);
          foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
              if (filetype($dir."/".$object) == "dir") 
                 rrmdir($dir."/".$object); 
              else unlink   ($dir."/".$object);
            }
          }
          reset($objects);
          rmdir($dir);
        }
    }

    function reMapPilihanTingkatanJumlah($data)
    {
        if ( is_array($data) || is_object($data) ){
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->nama = $val["nama"];                 
                $object->jumlah = $this->database->count("quiz_banksoal_pilihan",["tingkatan_id" => $val["id"]]);; 
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }    
    }

    function reMapPilihanMapelJumlah($data,$tingkatID)
    {
        if ( is_array($data) || is_object($data) ){
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->nama = $val["nama"];   
                $object->color = $val["color"];              
                $object->jumlah = $this->database->count("quiz_banksoal_pilihan",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $val["id"]]]);    
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }    
    }

    function reMapPilihanSemesterJumlah($data,$tingkatID,$mapelID)
    {
        if ( is_array($data) || is_object($data) ){
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->semester = $val["semester"];   
                $object->tahun = $val["tahun"];              
                $object->jumlah = $this->database->count("quiz_banksoal_pilihan",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $val["id"]]]);    
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }  
    }
    
    function reMapEssayTingkatanJumlah($data)
    {
        if ( is_array($data) || is_object($data) ){
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->nama = $val["nama"];                 
                $object->jumlah = $this->database->count("quiz_banksoal_essay",["tingkatan_id" => $val["id"]]);; 
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }    
    }

    function reMapEssayMapelJumlah($data,$tingkatID)
    {
        if ( is_array($data) || is_object($data) ){
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->nama = $val["nama"];   
                $object->color = $val["color"];              
                $object->jumlah = $this->database->count("quiz_banksoal_essay",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $val["id"]]]);    
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }    
    }

    function reMapEssaySemesterJumlah($data,$tingkatID,$mapelID)
    {
        if ( is_array($data) || is_object($data) ){
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->semester = $val["semester"];   
                $object->tahun = $val["tahun"];              
                $object->jumlah = $this->database->count("quiz_banksoal_essay",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $val["id"]]]);    
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }  
    }

    function reMapPaketTingkatanJumlah($data)
    {
        if ( is_array($data) || is_object($data) ){
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->nama = $val["nama"];                 
                $object->jumlah = $this->database->count("quiz_paketsoal",["tingkatan_id" => $val["id"]]);; 
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }    
    }

    function reMapPaketMapelJumlah($data,$tingkatID)
    {
        if ( is_array($data) || is_object($data) ){
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->nama = $val["nama"];   
                $object->color = $val["color"];              
                $object->jumlah = $this->database->count("quiz_paketsoal",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $val["id"]]]);    
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }    
    }

    function reMapPaketSemesterJumlah($data,$tingkatID,$mapelID)
    {
        if ( is_array($data) || is_object($data) ){
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->semester = $val["semester"];   
                $object->tahun = $val["tahun"];              
                $object->jumlah = $this->database->count("quiz_paketsoal",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $val["id"]]]);    
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }  
    }
    
}