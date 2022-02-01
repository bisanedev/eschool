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

    public function IndexTingkatanExam()
    {                  
        $data = $this->database->select("sekolah_kelastingkatan",["id","nama"]); 
        $newData = $this->reMapExamTingkatanJumlah($data);        
        echo $this->response->json_response(200, $newData);
    }

    public function IndexMapelExam($tingkatID)
    {          
        $mapelList = json_decode($this->user["mapel_id"],true);
        if($this->user["superuser"] === "1"){      
            $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
            $mapel = $this->database->select("sekolah_mapel",["id","nama","color"]);      
            $newData = $this->reMapExamMapelJumlah($mapel,$tingkatID);
            $data = array("data" => $newData,"tingkatan" => $tingkatan[0]);
            echo $this->response->json_response(200, $data);
        }else if(count($mapelList) > 0){
            $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
            $mapel = $this->database->select("sekolah_mapel",["id","nama","color"],["id" => $mapelList]);      
            $newData = $this->reMapExamMapelJumlah($mapel,$tingkatID);
            $data = array("data" => $newData,"tingkatan" => $tingkatan[0]);
            echo $this->response->json_response(200, $data);
        }else{
            echo $this->response->json_response(400, "Anda bukan Pendidik atau Administrator jadi gak punya IZIN");
        }
    }

    public function IndexSemesterExam($tingkatID,$mapelID)
    {           
        $mapelList = json_decode($this->user["mapel_id"],true);
        if($this->user["superuser"] === "1"){
            $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
            $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
            $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"]);        
            $newData = $this->reMapExamSemesterJumlah($semester,$tingkatID,$mapelID);
            $data = array("data" => $newData,"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0]);
            echo $this->response->json_response(200, $data);
        }else if(count($mapelList) > 0 && in_array($mapelID,$mapelList)){
            $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
            $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
            $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"]);        
            $newData = $this->reMapExamSemesterJumlah($semester,$tingkatID,$mapelID);
            $data = array("data" => $newData,"tingkatan"=> $tingkatan[0] ,"mapel"=> $mapel[0]);
            echo $this->response->json_response(200, $data);
        }else{
            echo $this->response->json_response(400, "Anda bukan Pendidik atau Administrator jadi gak punya IZIN");
        }
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
                if (!file_exists(__DIR__ ."/../../public/data/quiz/soal/pilihan/".$lastID)) {
                    mkdir(__DIR__ ."/../../public/data/quiz/soal/pilihan/".$lastID, 0777, true);
                }
            }
            //upload pertanyaan gambar jika ada
            if (isset($_FILES["pertanyaan_images"])){        
                $location = __DIR__ ."/../../public/data/quiz/soal/pilihan/".$lastID."/pertanyaan.jpg";                              
                move_uploaded_file($_FILES["pertanyaan_images"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_pilihan",["pertanyaan_images" => "pertanyaan.jpg"],["id" => $lastID]);                       
            }
            //upload pertanyaan audio jika ada
            if (isset($_FILES["pertanyaan_audio"])){        
                $location = __DIR__ ."/../../public/data/quiz/soal/pilihan/".$lastID."/pertanyaan.mp3";                              
                move_uploaded_file($_FILES["pertanyaan_audio"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_pilihan",["pertanyaan_audio" => "pertanyaan.mp3"],["id" => $lastID]);                       
            }
            //upload pilihan files jika ada
            if (isset($_FILES["files"])){
                $isMulti    = is_array($_FILES["files"]);                
                $countfiles = $isMulti?count($_FILES["files"]):1;               
                $location = __DIR__ ."/../../public/data/quiz/soal/pilihan/".$lastID;                  
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
                if (!file_exists(__DIR__ ."/../../public/data/quiz/soal/pilihan/".$_POST["id"])) {
                    mkdir(__DIR__ ."/../../public/data/quiz/soal/pilihan/".$_POST["id"], 0777, true);
                }
            }
            //upload pertanyaan gambar jika ada
            if (isset($_FILES["pertanyaan_images"])){        
                $location = __DIR__ ."/../../public/data/quiz/soal/pilihan/".$_POST["id"]."/pertanyaan.jpg";                              
                move_uploaded_file($_FILES["pertanyaan_images"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_pilihan",["pertanyaan_images" => "pertanyaan.jpg"],["id" => $_POST["id"]]);                       
            }
            //upload pertanyaan audio jika ada
            if (isset($_FILES["pertanyaan_audio"])){        
                $location = __DIR__ ."/../../public/data/quiz/soal/pilihan/".$_POST["id"]."/pertanyaan.mp3";                              
                move_uploaded_file($_FILES["pertanyaan_audio"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_pilihan",["pertanyaan_audio" => "pertanyaan.mp3"],["id" => $_POST["id"]]);                       
            }
            //upload pilihan files jika ada
            if (isset($_FILES["files"])){
                $isMulti    = is_array($_FILES["files"]);                
                $countfiles = $isMulti?count($_FILES["files"]):1;               
                $location = __DIR__ ."/../../public/data/quiz/soal/pilihan/".$_POST["id"];                  
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
                        $location = __DIR__ ."/../../public/data/quiz/soal/pilihan/".$value;  
                        $this->rrmdir($location);               
                    }
                }else{
                    $location = __DIR__ ."/../../public/data/quiz/soal/pilihan/".$deleteID;  
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
                if (!file_exists(__DIR__ ."/../../public/data/quiz/soal/essay/".$lastID)) {
                    mkdir(__DIR__ ."/../../public/data/quiz/soal/essay/".$lastID, 0777, true);
                }
            }
            //upload pertanyaan gambar jika ada
            if (isset($_FILES["pertanyaan_images"])){        
                $location = __DIR__ ."/../../public/data/quiz/soal/essay/".$lastID."/pertanyaan.jpg";                              
                move_uploaded_file($_FILES["pertanyaan_images"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_essay",["pertanyaan_images" => "pertanyaan.jpg"],["id" => $lastID]);                       
            }
            //upload pertanyaan audio jika ada
            if (isset($_FILES["pertanyaan_audio"])){        
                $location = __DIR__ ."/../../public/data/quiz/soal/essay/".$lastID."/pertanyaan.mp3";                              
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
                if (!file_exists(__DIR__ ."/../../public/data/quiz/soal/essay/".$_POST["id"])) {
                    mkdir(__DIR__ ."/../../public/data/quiz/soal/essay/".$_POST["id"], 0777, true);
                }
            }
            //upload pertanyaan gambar jika ada
            if (isset($_FILES["pertanyaan_images"])){        
                $location = __DIR__ ."/../../public/data/quiz/soal/essay/".$_POST["id"]."/pertanyaan.jpg";                              
                move_uploaded_file($_FILES["pertanyaan_images"]["tmp_name"],$location);
                $this->database->update("quiz_banksoal_essay",["pertanyaan_images" => "pertanyaan.jpg"],["id" => $_POST["id"]]);                       
            }
            //upload pertanyaan audio jika ada
            if (isset($_FILES["pertanyaan_audio"])){        
                $location = __DIR__ ."/../../public/data/quiz/soal/essay/".$_POST["id"]."/pertanyaan.mp3";                              
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
                        $location = __DIR__ ."/../../public/data/quiz/soal/essay/".$value;  
                        $this->rrmdir($location);               
                    }
                }else{
                    $location = __DIR__ ."/../../public/data/quiz/soal/essay/".$deleteID;  
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
            $soal = $this->database->select("quiz_paketsoal",["id","nama","acak_soal[Bool]","bobot_pilihan","bobot_essay","pilihan_terpilih[JSON]","essay_terpilih[JSON]"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"nama[~]" => $cari]);
            $data = array("data" => $soal,"totaldata" => $totalRow ,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0] ,"nextpage"=> false );
        }else{
            $soal = $this->database->select("quiz_paketsoal",["id","nama","acak_soal[Bool]","bobot_pilihan","bobot_essay","pilihan_terpilih[JSON]","essay_terpilih[JSON]"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"LIMIT" => [$mulai,$totalData],"ORDER" => ["nama" => "ASC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $soal,"totaldata" => $totalRow,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0],"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );            
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function PaketSoalAdd($tingkatID,$mapelID,$semesterID)
    {
        $v = new Validator($_POST);
        $v->rule('required', ['nama','acak','bobot_pilihan','bobot_essay','paket_pilihan','paket_essay']);
        if($v->validate()) {
            $pilihanTerpilih = $this->objectSoalToArray(json_decode($_POST["paket_pilihan"],true));
            $essayTerpilih = $this->objectSoalToArray(json_decode($_POST["paket_essay"],true));
            $this->database->insert("quiz_paketsoal",["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID,"nama" => $_POST["nama"],"acak_soal" => $_POST["acak"],"bobot_pilihan" => $_POST["bobot_pilihan"],"bobot_essay" => $_POST["bobot_essay"],"pilihan_terpilih" =>  json_encode($pilihanTerpilih),"essay_terpilih" => json_encode($essayTerpilih)]);
            echo $this->response->json_response(200,"berhasil");
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama paket kosong"); 
            } 
            elseif($v->errors('acak')){
                echo $this->response->json_response(400,"Input acak kosong"); 
            }  
            elseif($v->errors('bobot_pilihan')){
                echo $this->response->json_response(400,"Input bobot pilihan kosong"); 
            }
            elseif($v->errors('bobot_essay')){
                echo $this->response->json_response(400,"Input bobot essay kosong"); 
            }
            elseif($v->errors('paket_pilihan')){
                echo $this->response->json_response(400,"Input paket pilihan kosong"); 
            }
            elseif($v->errors('paket_essay')){
                echo $this->response->json_response(400,"Input paket essay kosong"); 
            }            
        }
    }

    public function PaketSoalEdit($tingkatID,$mapelID,$semesterID,$paketID)
    {
        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);        
        $paket = $this->database->select("quiz_paketsoal",["id","nama","acak_soal[Bool]","bobot_pilihan","bobot_essay","pilihan_terpilih[JSON]","essay_terpilih[JSON]"],["id" => $paketID]);
        $semesterData = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","label" => Medoo::raw("CONCAT(sekolah_semestertahun.nama,' (Semester ',sekolah_semesternama.semester,')')")],["ORDER" => ["id" => "DESC"]]);
        $repaket = $this->reMapPaketSoal($paket[0]);
        $data = array("data" => $repaket ,"semester" => $semester[0],"tingkatan" => $tingkatan[0] ,"mapel" => $mapel[0] , "semesterdata" => $semesterData);
        echo $this->response->json_response(200, $data);
    }

    public function PaketSoalUpdate($tingkatID,$mapelID,$semesterID)
    {
        $_PATCH = RequestParser::parse()->params;
        $v = new Validator($_PATCH);
        $v->rule('required', ['id','nama','acak','bobot_pilihan','bobot_essay','paket_pilihan','paket_essay']);
        if($v->validate()) {
            $pilihanTerpilih = $this->objectSoalToArray(json_decode($_PATCH["paket_pilihan"],true));
            $essayTerpilih = $this->objectSoalToArray(json_decode($_PATCH["paket_essay"],true));
            $this->database->update("quiz_paketsoal",["nama" => $_PATCH["nama"],"acak_soal" => $_PATCH["acak"],"bobot_pilihan" => $_PATCH["bobot_pilihan"],"bobot_essay" => $_PATCH["bobot_essay"],"pilihan_terpilih" =>  json_encode($pilihanTerpilih),"essay_terpilih" => json_encode($essayTerpilih)],["AND" =>["id" => $_PATCH["id"],"tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID]]);                       
            echo $this->response->json_response(200,"berhasil");            
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama paket kosong"); 
            } 
            elseif($v->errors('id')){
                echo $this->response->json_response(400,"Input id kosong"); 
            }
            elseif($v->errors('acak')){
                echo $this->response->json_response(400,"Input acak kosong"); 
            }  
            elseif($v->errors('bobot_pilihan')){
                echo $this->response->json_response(400,"Input bobot pilihan kosong"); 
            }
            elseif($v->errors('bobot_essay')){
                echo $this->response->json_response(400,"Input bobot essay kosong"); 
            }
            elseif($v->errors('paket_pilihan')){
                echo $this->response->json_response(400,"Input paket pilihan kosong"); 
            }
            elseif($v->errors('paket_essay')){
                echo $this->response->json_response(400,"Input paket essay kosong"); 
            }            
        }
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

    public function PaketGetSoalPilihan($tingkatID,$mapelID,$semesterID)
    {
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;        
        $totalRow = $this->database->count("quiz_banksoal_pilihan",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID]]);

        if(isset($_GET['cari'])){
            $soal = $this->database->select("quiz_banksoal_pilihan",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"pertanyaan_text[~]" => $cari]);
            $data = array("data" => $soal,"totaldata" => $totalRow ,"nextpage"=> false );
        }else{
            $soal = $this->database->select("quiz_banksoal_pilihan",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $soal,"totaldata" => $totalRow,"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );            
        }  
        echo $this->response->json_response(200, $data);   
    }

    public function PaketGetSoalEssay($tingkatID,$mapelID,$semesterID)
    {
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;        
        $totalRow = $this->database->count("quiz_banksoal_essay",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID]]);

        if(isset($_GET['cari'])){
            $soal = $this->database->select("quiz_banksoal_essay",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"pertanyaan_text[~]" => $cari]);
            $data = array("data" => $soal,"totaldata" => $totalRow ,"nextpage"=> false );
        }else{
            $soal = $this->database->select("quiz_banksoal_essay",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID],"LIMIT" => [$mulai,$totalData],"ORDER" => ["id" => "DESC"]]);            
            $pages = ceil($totalRow/$totalData);
            $nextpage = ($page < $pages) ? $page+1 : false;
            $data = array("data" => $soal,"totaldata" => $totalRow,"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );            
        }  
        echo $this->response->json_response(200, $data); 
    }

    public function Exam($tingkatID,$mapelID,$semesterID)
    {        
        $cari = isset($_GET['cari'])? (string)$_GET["cari"]:"%";        
        $totalData = isset($_GET['total'])? (int)$_GET["total"]:1;             
        $page = isset($_GET['page'])? (int)$_GET["page"]:1;        
        $mulai = ($page>1) ? ($page * $totalData) - $totalData :0;

        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]);
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);
        $userID = $this->token->claims()->get('uid');
        $mapelList = json_decode($this->user["mapel_id"],true);
        
        if($this->user["superuser"] === "1"){
            $totalRow = $this->database->count("quiz_exam",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID]]);
            if(isset($_GET['cari'])){
                $soal = $this->database->select("quiz_exam",["[>]sekolah_users" => ["user_id" => "id"]],["quiz_exam.id","quiz_exam.nama","quiz_exam.mulai","quiz_exam.selesai","quiz_exam.nilai_minimal","quiz_exam.paket_soal[JSON]","quiz_exam.kisi_exam","sekolah_users.nama(pendidik)","sekolah_users.jenis","sekolah_users.username","sekolah_users.foto[Bool]"],["AND" => ["quiz_exam.tingkatan_id" => $tingkatID,"quiz_exam.mapel_id" => $mapelID ,"quiz_exam.semester_id" => $semesterID],"quiz_exam.nama[~]" => $cari]);
                $data = array("data" => $soal,"totaldata" => $totalRow ,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0] ,"nextpage"=> false );
            }else{
                $soal = $this->database->select("quiz_exam",["[>]sekolah_users" => ["user_id" => "id"]],["quiz_exam.id","quiz_exam.nama","quiz_exam.mulai","quiz_exam.selesai","quiz_exam.nilai_minimal","quiz_exam.paket_soal[JSON]","quiz_exam.kisi_exam","sekolah_users.nama(pendidik)","sekolah_users.jenis","sekolah_users.username","sekolah_users.foto[Bool]"],["AND" => ["quiz_exam.tingkatan_id" => $tingkatID,"quiz_exam.mapel_id" => $mapelID ,"quiz_exam.semester_id" => $semesterID],"LIMIT" => [$mulai,$totalData],"ORDER" => ["quiz_exam.nama" => "ASC"]]);            
                $pages = ceil($totalRow/$totalData);
                $nextpage = ($page < $pages) ? $page+1 : false;
                $data = array("data" => $soal,"totaldata" => $totalRow,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0],"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );            
            }  
            echo $this->response->json_response(200, $data);
        }else if(count($mapelList) > 0 && in_array($mapelID,$mapelList)){
            $totalRow = $this->database->count("quiz_exam",["AND" => ["user_id" => $userID,"tingkatan_id" => $tingkatID,"mapel_id" => $mapelID ,"semester_id" => $semesterID]]);
            if(isset($_GET['cari'])){
                $soal = $this->database->select("quiz_exam",["[>]sekolah_users" => ["user_id" => "id"]],["quiz_exam.id","quiz_exam.nama","quiz_exam.mulai","quiz_exam.selesai","quiz_exam.nilai_minimal","quiz_exam.paket_soal[JSON]","quiz_exam.kisi_exam","sekolah_users.nama(pendidik)","sekolah_users.jenis","sekolah_users.username","sekolah_users.foto[Bool]"],["AND" => ["quiz_exam.user_id" => $userID,"quiz_exam.tingkatan_id" => $tingkatID,"quiz_exam.mapel_id" => $mapelID ,"quiz_exam.semester_id" => $semesterID],"quiz_exam.nama[~]" => $cari]);
                $data = array("data" => $soal,"totaldata" => $totalRow ,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0] ,"nextpage"=> false );
            }else{
                $soal = $this->database->select("quiz_exam",["[>]sekolah_users" => ["user_id" => "id"]],["quiz_exam.id","quiz_exam.nama","quiz_exam.mulai","quiz_exam.selesai","quiz_exam.nilai_minimal","quiz_exam.paket_soal[JSON]","quiz_exam.kisi_exam","sekolah_users.nama(pendidik)","sekolah_users.jenis","sekolah_users.username","sekolah_users.foto[Bool]"],["AND" => ["quiz_exam.user_id" => $userID,"quiz_exam.tingkatan_id" => $tingkatID,"quiz_exam.mapel_id" => $mapelID ,"quiz_exam.semester_id" => $semesterID],"LIMIT" => [$mulai,$totalData],"ORDER" => ["quiz_exam.nama" => "ASC"]]);            
                $pages = ceil($totalRow/$totalData);
                $nextpage = ($page < $pages) ? $page+1 : false;
                $data = array("data" => $soal,"totaldata" => $totalRow,"tingkatan" => $tingkatan[0] , "mapel" => $mapel[0] , "semester" => $semester[0],"pages" => $pages,"current" => $page,"nextpage"=> $nextpage );            
            }  
            echo $this->response->json_response(200, $data);
        }else{
            echo $this->response->json_response(400, "Anda bukan Pendidik atau Administrator jadi gak punya IZIN");
        }          
    }

    public function ExamAddInfo($tingkatID,$mapelID,$semesterID)
    {
        $mapelList = json_decode($this->user["mapel_id"],true);
        if($this->user["superuser"] != "1" && !in_array($mapelID,$mapelList)){
            echo $this->response->json_response(400, "Anda bukan Pendidik atau Administrator jadi gak punya IZIN");
            exit;
        }

        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);
        $paketData = $this->database->select("quiz_paketsoal",["id","nama","acak_soal[Bool]","bobot_pilihan","bobot_essay","pilihan_terpilih[JSON]","essay_terpilih[JSON]"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID]]);        
        $userData = $this->database->select("sekolah_users",["id","nama","jenis","username","mapel_id[JSON]"]);
        $userFilter = $this->userFilterMapel($userData,$mapelID);
        $data = array("semester" => $semester[0],"tingkatan"=> $tingkatan[0],"mapel" => $mapel[0],"paketdata" => $paketData,"userdata" => $userFilter);
        echo $this->response->json_response(200, $data);
    }

    public function ExamAdd($tingkatID,$mapelID,$semesterID)
    {
        $mapelList = json_decode($this->user["mapel_id"],true);
        if($this->user["superuser"] != "1" && !in_array($mapelID,$mapelList)){
            echo $this->response->json_response(400, "Anda bukan Pendidik atau Administrator jadi gak punya IZIN");
            exit;
        }

        $v = new Validator($_POST);        
        $v->rule('required', ['user_id','nama','nilai','mulai','selesai','paket_soal']);
        if($v->validate()) { 
            if (isset($_FILES["kisi"]) && $_FILES["kisi"]["size"] > 2000000) {
                echo $this->response->json_response(400, "Ukuran pertanyaan gambar melebihi 2MB");
                exit;      
            }
            $allowedImages = array("image/jpeg","image/png");
            if(isset($_FILES["kisi"]) && !in_array($_FILES['kisi']['type'],$allowedImages )) {
                echo $this->response->json_response(400, "Pertanyaan gambar hanya file png, jpeg dan jpg yang bisa di upload");
                exit;
            }           
            $this->database->insert("quiz_exam",["user_id" => $_POST["user_id"],"tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID,"nama" => $_POST["nama"],"mulai" => $_POST["mulai"],"selesai" => $_POST["selesai"],"nilai_minimal" => $_POST["nilai"] ,"paket_soal" => $_POST["paket_soal"]]);
            $lastID = $this->database->id();
            //make folder
            if (isset($_FILES["kisi"])){ 
                if (!file_exists(__DIR__ ."/../../public/data/quiz/exam/".$lastID)) {
                    mkdir(__DIR__ ."/../../public/data/quiz/exam/".$lastID, 0777, true);
                }
            }
            //upload kisi-kisi jika ada
            if (isset($_FILES["kisi"])){        
                $location = __DIR__ ."/../../public/data/quiz/exam/".$lastID."/kisi.jpg";                              
                move_uploaded_file($_FILES["kisi"]["tmp_name"],$location);
                $this->database->update("quiz_exam",["kisi_exam" => "kisi.jpg"],["id" => $lastID]);                       
            }
            echo $this->response->json_response(200,"berhasil");
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama ujian kosong"); 
            }             
            elseif($v->errors('user_id')){
                echo $this->response->json_response(400,"Input userid kosong"); 
            }  
            elseif($v->errors('nilai')){
                echo $this->response->json_response(400,"Input nilai minimal kosong"); 
            }  
            elseif($v->errors('mulai')){
                echo $this->response->json_response(400,"Input waktu mulai kosong"); 
            }
            elseif($v->errors('selesai')){
                echo $this->response->json_response(400,"Input waktu selesai kosong"); 
            }
            elseif($v->errors('paket_soal')){
                echo $this->response->json_response(400,"Paket soal kosong"); 
            }                 
        }
    }

    public function ExamEdit($tingkatID,$mapelID,$semesterID,$examID)
    {
        $mapelList = json_decode($this->user["mapel_id"],true);
        if($this->user["superuser"] != "1" && !in_array($mapelID,$mapelList)){
            echo $this->response->json_response(400, "Anda bukan Pendidik atau Administrator jadi gak punya IZIN");
            exit;
        }

        $tingkatan = $this->database->select("sekolah_kelastingkatan",["id","nama"],["id" => $tingkatID]); 
        $mapel = $this->database->select("sekolah_mapel",["id","nama"],["id" => $mapelID]); 
        $semester = $this->database->select("sekolah_semesternama",["[>]sekolah_semestertahun" => ["semester_tahun_id" => "id"]],["sekolah_semesternama.id","sekolah_semestertahun.nama(tahun)","sekolah_semesternama.semester"],["sekolah_semesternama.id" => $semesterID]);
        $paketData = $this->database->select("quiz_paketsoal",["id","nama","acak_soal[Bool]","bobot_pilihan","bobot_essay","pilihan_terpilih[JSON]","essay_terpilih[JSON]"],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID]]); 
        $examData = $this->database->select("quiz_exam",["id","user_id","nama","mulai","selesai","nilai_minimal","paket_soal[JSON]","kisi_exam"],["id" => $examID]);
        $userData = $this->database->select("sekolah_users",["id","nama","jenis","username","mapel_id[JSON]"]);
        $userFilter = $this->userFilterMapel($userData,$mapelID);
        $data = array("semester" => $semester[0],"tingkatan" => $tingkatan[0],"mapel" => $mapel[0],"paketdata" => $paketData,"userdata" => $userFilter,"data" => $examData[0]);
        echo $this->response->json_response(200, $data);
    }

    public function ExamUpdate($tingkatID,$mapelID,$semesterID)
    {
        $mapelList = json_decode($this->user["mapel_id"],true);
        if($this->user["superuser"] != "1" && !in_array($mapelID,$mapelList)){
            echo $this->response->json_response(400, "Anda bukan Pendidik atau Administrator jadi gak punya IZIN");
            exit;
        }
        
        $v = new Validator($_POST);        
        $v->rule('required', ['id','nama','nilai','mulai','selesai','paket_soal','user_id']);
        if($v->validate()) { 
            if (isset($_FILES["kisi"]) && $_FILES["kisi"]["size"] > 2000000) {
                echo $this->response->json_response(400, "Ukuran pertanyaan gambar melebihi 2MB");
                exit;      
            }
            $allowedImages = array("image/jpeg","image/png");
            if(isset($_FILES["kisi"]) && !in_array($_FILES['kisi']['type'],$allowedImages )) {
                echo $this->response->json_response(400, "Pertanyaan gambar hanya file png, jpeg dan jpg yang bisa di upload");
                exit;
            }            
            $examID = $_POST["id"];
            //make folder
            if (isset($_FILES["kisi"])){ 
                if (!file_exists(__DIR__ ."/../../public/data/quiz/exam/".$examID)) {
                    mkdir(__DIR__ ."/../../public/data/quiz/exam/".$examID, 0777, true);
                }
            }
            //upload kisi-kisi jika ada
            if (isset($_FILES["kisi"])){        
                $location = __DIR__ ."/../../public/data/quiz/exam/".$examID."/kisi.jpg";                              
                move_uploaded_file($_FILES["kisi"]["tmp_name"],$location); 
                $this->database->update("quiz_exam",["kisi_exam" => "kisi.jpg"],["id" => $examID]);                  
            }
            $this->database->update("quiz_exam",["user_id" => $_POST["user_id"], "nama" => $_POST["nama"],"mulai" => $_POST["mulai"],"selesai" => $_POST["selesai"],"nilai_minimal" => $_POST["nilai"],"paket_soal" => $_POST["paket_soal"]],["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $semesterID,"id" => $examID]]);
            echo $this->response->json_response(200,"berhasil");
        }else{
            if($v->errors('nama')){
                echo $this->response->json_response(400,"Input nama ujian kosong"); 
            } 
            elseif($v->errors('user_id')){
                echo $this->response->json_response(400,"Input userid kosong"); 
            } 
            elseif($v->errors('nilai')){
                echo $this->response->json_response(400,"Input nilai minimal kosong"); 
            }  
            elseif($v->errors('mulai')){
                echo $this->response->json_response(400,"Input waktu mulai kosong"); 
            }
            elseif($v->errors('selesai')){
                echo $this->response->json_response(400,"Input waktu selesai kosong"); 
            }
            elseif($v->errors('paket_soal')){
                echo $this->response->json_response(400,"Paket soal kosong"); 
            }                 
        }        
    }

    public function ExamDelete()
    {
        $_DELETE = RequestParser::parse()->params;        
        $v = new Validator($_DELETE);
        $v->rule('required', ['delete']);
        if($v->validate()) {                          
            $deleteID = json_decode($_DELETE['delete']);
            $userID = $this->token->claims()->get('uid');
            //hapus folder kisi jika ada
            $location = __DIR__ ."/../../public/data/quiz/exam/".$deleteID;  
            $this->rrmdir($location);  
            // permission delete
            if($this->user["superuser"] === "1"){                    
                $hapus=$this->database->delete("quiz_exam",["AND" => ["id" => $deleteID]]);
                if($hapus->rowCount() === 0){ 
                    echo $this->response->json_response(400,"Data tidak ditemukan");
                }else{
                    echo $this->response->json_response(200,"berhasil");
                }
            }else{
                $hapus=$this->database->delete("quiz_exam",["AND" => ["user_id" => $userID,"id" => $deleteID]]);
                if($hapus->rowCount() === 0){ 
                    echo $this->response->json_response(400,"Data tidak ditemukan");
                }else{
                    echo $this->response->json_response(200,"berhasil");
                }
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

    function objectSoalToArray($obj)
    {
        $soalID = array(); 
        foreach ($obj as $val) {            
            $soalID[] = $val['id'];            
        }        
        return $soalID;
    }

    function reMapPaketSoal($data)
    {        
        if ( is_array($data) || is_object($data) ){          
            $object = new stdClass();  
            $object->id = $data["id"];               
            $object->nama = $data["nama"];
            $object->acak_soal = $data["acak_soal"];
            $object->bobot_pilihan = $data["bobot_pilihan"];
            $object->bobot_essay = $data["bobot_essay"];
            if(count($data["pilihan_terpilih"]) > 0){
                $soalCollect = array();
                foreach ($data["pilihan_terpilih"] as $soalID) {
                    $getSoal = $this->database->select("quiz_banksoal_pilihan",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["id" => $soalID]);          
                    $soalCollect[] = $getSoal[0];
                }    
                $object->pilihan_terpilih = $soalCollect;                
            }else{ $object->pilihan_terpilih = $data["pilihan_terpilih"];}
            if(count($data["essay_terpilih"]) > 0){
                $soalCollect = array();
                foreach ($data["essay_terpilih"] as $soalID) {
                    $getSoal = $this->database->select("quiz_banksoal_essay",["id","pertanyaan_text","pertanyaan_tex","pertanyaan_images","pertanyaan_audio"],["id" => $soalID]);          
                    $soalCollect[] = $getSoal[0];
                }    
                $object->essay_terpilih = $soalCollect; 
            }else{ $object->essay_terpilih = $data["essay_terpilih"];}   
            return $object;
        }else{
            return false;
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
                $object->jumlah = $this->database->count("quiz_banksoal_pilihan",["tingkatan_id" => $val["id"]]); 
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
                $object->jumlah = $this->database->count("quiz_banksoal_essay",["tingkatan_id" => $val["id"]]); 
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
                $object->jumlah = $this->database->count("quiz_paketsoal",["tingkatan_id" => $val["id"]]); 
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

    function reMapExamTingkatanJumlah($data)
    {
        if ( is_array($data) || is_object($data) ){            
            $userID = $this->token->claims()->get('uid');
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->nama = $val["nama"];
                if($this->user["superuser"] === "1"){
                    $object->jumlah = $this->database->count("quiz_exam",["tingkatan_id" => $val["id"]]);
                }else{
                    $object->jumlah = $this->database->count("quiz_exam",["AND" => ["tingkatan_id" => $val["id"],"user_id" => $userID]]);
                }                 
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }    
    }

    function reMapExamMapelJumlah($data,$tingkatID)
    {
        if ( is_array($data) || is_object($data) ){
            $userID = $this->token->claims()->get('uid');
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->nama = $val["nama"];   
                $object->color = $val["color"];
                if($this->user["superuser"] === "1"){                    
                    $object->jumlah = $this->database->count("quiz_exam",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $val["id"]]]);    
                }else{
                    $object->jumlah = $this->database->count("quiz_exam",["AND" => ["user_id" => $userID,"tingkatan_id" => $tingkatID,"mapel_id" => $val["id"]]]);                    
                }                
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }    
    }

    function reMapExamSemesterJumlah($data,$tingkatID,$mapelID)
    {
        if ( is_array($data) || is_object($data) ){
            $userID = $this->token->claims()->get('uid');
            $recollect = array();
            foreach ($data as $val) {
                $object = new stdClass();  
                $object->id = $val["id"];               
                $object->semester = $val["semester"];   
                $object->tahun = $val["tahun"];                              
                if($this->user["superuser"] === "1"){                      
                    $object->jumlah = $this->database->count("quiz_exam",["AND" => ["tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $val["id"]]]);
                }else{
                    $object->jumlah = $this->database->count("quiz_exam",["AND" => ["user_id" => $userID,"tingkatan_id" => $tingkatID,"mapel_id" => $mapelID,"semester_id" => $val["id"]]]);                    
                }
                $recollect[] = $object;
            }
            return $recollect;
        }else{
            return false;
        }  
    }

    function userFilterMapel($data,$mapelID)
    {
        if ( is_array($data) || is_object($data) ){
            $recollect = array();
            foreach ($data as $val) {
                if(in_array($mapelID,$val["mapel_id"])){
                    $object = new stdClass();
                    $object->id = $val["id"];
                    $object->nama = $val["nama"];
                    $object->jenis = $val["jenis"];
                    $object->username = $val["username"];                                    
                    $recollect[] = $object;
                }                
            }
            return $recollect;
        }else{
            return false;
        } 
    }
    
}