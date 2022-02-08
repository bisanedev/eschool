import React from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Breadcrumb } from "../../../../components/menu";
import { SwitchMini,InputText,InputNumber,InputSearch } from "../../../../components/forms";
import Tabs from "../../../../components/tabs";
import Pagination from "../../../../components/table/pagination";
import { DropdownList } from 'react-widgets';
import { ToastContainer, toast } from 'react-toastify';
import SoalItem from "./soalItem";
import SoalSelected from "./soalSelected";

class PageAplikasiQuizPaketSoalEdit extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
          id:"",
          nama:"",
          bobotPilihan:0,
          bobotEssay:0,
          paketPilihan:[],
          paketEssay:[],
          dataPilihan:[],
          dataEssay:[],
          acak:false,         
          isLoading:true, 
          semesterPickPilihan:null,
          semesterPickEssay:null,
          semesterData:[],
          pagePilihan:undefined,
          cariPilihan:undefined,          
          totalDataPilihan:undefined,
          currPagePilihan:undefined,
          pagesPilihan:1,
          pageEssay:undefined,
          cariEssay:undefined,          
          totalDataEssay:undefined,
          currPageEssay:undefined,
          pagesEssay:1
      } 

      this.handleInputChange = this.handleInputChange.bind(this);   
      this.tingkatID = this.props.params.tingkatID;
      this.mapelID = this.props.params.mapelID;
      this.semesterID = this.props.params.semesterID;
      this.paketID = this.props.params.paketID;
      this.navigate = this.props.navigate;
    }
  
    componentDidMount() {     
      this.timer = setTimeout(() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID,this.paketID),300);   
    }
  
    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    
  render() {     
    const {uploadProgress,uploadDisable,tingkatan,nama,acak,mapel,semester,bobotPilihan,bobotEssay,paketPilihan,paketEssay,dataPilihan,dataEssay,semesterPickPilihan,semesterPickEssay,semesterData,cariPilihan,cariEssay,totalDataPilihan,totalDataEssay,pagesPilihan,currPagePilihan,pagesEssay,currPageEssay} = this.state; 
    const uploadClass = uploadProgress ? "progress-active":""; 
    const totalBobot = parseInt(bobotPilihan)+parseInt(bobotEssay);    
    return (  
    <div className="konten"> 
        <Helmet>
            <title>Paket soal - Nama Sekolah</title>
        </Helmet> 
        <div className="headings">    
          <div className="title">Paket soal</div>
          <div className="subtitle">Data Paket soal untuk tingkatan {tingkatan != null ? tingkatan.nama:"memuat..."}, mata pelajaran {mapel != null ? mapel.nama:"memuat..."} dan {semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</div>
          <Breadcrumb homeUrl="/aplikasi" homeText="Aplikasi"> 
            <li><a href="#/aplikasi/quiz"><span>Kuis platform</span></a></li>   
            <li><a href="#/aplikasi/quiz/paket"><span>Paket soal</span></a></li>               
            <li><a href={"#/aplikasi/quiz/paket/"+this.tingkatID}><span>{tingkatan != null ? tingkatan.nama:"memuat..."}</span></a></li>  
            <li><a href={"#/aplikasi/quiz/paket/"+this.tingkatID+"/"+this.mapelID}><span>{mapel != null ? mapel.nama:"memuat..."}</span></a></li>
            <li><a href={"#/aplikasi/quiz/paket/"+this.tingkatID+"/"+this.mapelID+"/"+this.semesterID}><span>{semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</span></a></li>            
            <li><a href="#"><span>Mengubah paket soal</span></a></li>   
          </Breadcrumb>   
        </div>
        <div className="mw9 center cf ph3 flex flex-column">
        <div className="w-100">
        <div className="bg-white br2 mb1" style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
        <div className="flex">
            <span className="pa3 f4 bg-primary white flex items-center" style={{width:"88%"}}>Mengubah paket soal</span>
            <div className="w-20 flex justify-center items-center" style={{width:"12%",borderBottom:"1px solid rgba(0, 0, 0, 0.125)"}}>
              <div className="flex flex-column items-center">
                <label className="f7 fw4 db mb1">Acak urutan soal</label>
                <SwitchMini name="acak" value={acak} onChange={this.handleInputChange}/>
              </div>
            </div>
        </div>      
        <div className="flex">
        <div className="w-50 pa3">
          <div className="w-100 mb3">
            <label className="f5 fw4 db mb2">Nama paket soal</label>
            <InputText name="nama" value={nama} placeholder="ketik nama paket soal disini" onChange={this.handleInputChange} />
          </div>
        </div>
        <div className="w-50 pa3">
          <div className="w-100 mb3">
            <label className="f5 fw4 db mb2">Bobot nilai (total bobot nilai pilihan ganda + essay = wajib 100)</label>
            <div className="flex">
            <div className="w-30">
              <InputNumber name="bobotPilihan" value={bobotPilihan} placeholder="pilihan ganda" onChange={this.handleChangePilihan} />
            </div>
            <div className="w-10 f3 flex items-center justify-center">+</div>
            <div className="w-30">
              <InputNumber name="bobotEssay" value={bobotEssay} placeholder="essay" onChange={this.handleChangeEssay} />
            </div> 
            <div className="w-10 f3 flex items-center justify-center">=</div>
            <div className="w-20">
              <InputText value={isNaN(totalBobot) ? 0:totalBobot } readonly={true} style={{cursor:"not-allowed"}}/>
            </div>
            </div>      
          </div>
        </div>
        </div>
        </div>
        </div>
        <div className="w-100 flex mb1">
          <div className="w-40 mr1">
            <div className="flex bg-white justify-between items-center ph2" style={{height:"50px",border:"1px solid rgba(0, 0, 0, 0.125)"}}>
              <span className="f5 b">Soal yang dipilih</span>
              <span className="f5">{paketPilihan.length + paketEssay.length} terpilih</span>
            </div>
            <div className="bg-white paket-container">
              {paketPilihan.length === 0 && paketEssay.length === 0 && (
              <div className="flex justify-center items-center pa3 flex-column w-100 h-100">
                <span className="f3 gray">Data soal yang dipilih kosong</span>                
              </div>
              )}
              {paketPilihan.length > 0 && (<div className="f6 b pv1 db bb b--primary mb3 primary bw1 mb2 flex justify-between"><span>Pilihan ganda</span><span>{paketPilihan.length} soal</span></div>)}
              {paketPilihan.length > 0 && paketPilihan.map((value,k) => (                 
                  <SoalSelected key={k} nomor={k+1} text={value.pertanyaan_text}
                    onDelete={() => this.onDeletePilihan(value)}
                    dataValue={value}    
                    linkImages={`data/quiz/soal/pilihan/${value.id}/${value.pertanyaan_images}`}
                    linkAudio={`data/quiz/soal/pilihan/${value.id}/${value.pertanyaan_audio}`}
                  />                
              ))}
              {paketEssay.length > 0 && (<div className="f6 b pv1 db bb b--primary mb3 primary bw1 mb2 flex justify-between"><span>Essay</span><span>{paketEssay.length} soal</span></div>)}
              {paketEssay.length > 0 && paketEssay.map((value,k) => (  
              <SoalSelected key={k} nomor={k+1} text={value.pertanyaan_text}
                onDelete={() => this.onDeleteEssay(value)}
                dataValue={value}    
                linkImages={`data/quiz/soal/essay/${value.id}/${value.pertanyaan_images}`}
                linkAudio={`data/quiz/soal/essay/${value.id}/${value.pertanyaan_audio}`}
              />
              ))}
            </div>
          </div>
          <div className="w-60">
          <Tabs>
            <div label="Pilihan ganda">
            {parseInt(bobotPilihan) === 0 || bobotPilihan === "" ? (
                <div className="flex justify-center items-center flex-column" style={{border:"3px dashed rgba(0, 0, 0, 0.125)",margin:10,width:"97%",height:"97%"}}>                  
                  <span className="f3 gray">Silahkan isi bobot soal pilihan ganda pada menu diatas</span>
                </div>
              ):(
              <>
              <div className="w-100 flex pa1">
                <div className="w-50 mr1">
                  <DropdownList filter='contains' data={semesterData} value={semesterPickPilihan} onChange={value => this.handleSelectPilihan(value)} textField="label" dataKey="id" placeholder="Pilih Semester"/>
                </div> 
                <div className="w-50">
                  <InputSearch name="cariPilihan" disabled={dataPilihan.length === 0 ? true:false} value={cariPilihan ? cariPilihan:""} placeholder={cariPilihan ? "":"Cari soal"} onChange={this.handleInputChange} onReset={this.resetCariPilihan} onClick={this.handleCariPilihan} onKeyPress={this.handleKeyPressPilihan}/>
                </div>             
              </div>
              <div className="flex flex-wrap w-100 pa2 body-content">
                {semesterPickPilihan === null && (
                <div className="flex justify-center items-center pa3 flex-column w-100" style={{border:"3px dashed rgba(0, 0, 0, 0.125)",height:365}}>
                  <span className="f3 gray">Silahkan pilih semester pada menu dropdown diatas</span>                
                </div>
                )}
                {dataPilihan.length === 0 && semesterPickPilihan != null &&
                  <div className="flex justify-center items-center pa3 flex-column w-100" style={{border:"3px dashed rgba(0, 0, 0, 0.125)",height:365}}>
                    <span className="f3 gray">Data soal pilih ganda kosong</span>         
                  </div>     
                }   
                {dataPilihan.length > 0 && dataPilihan.map((value,k) => (             
                  <SoalItem key={k} nomor={k+1} text={value.pertanyaan_text}
                    checked={paketPilihan.some(item => item.id === value.id)}
                    onChecked={() => this.onCheckedPilihan(value)}
                    dataValue={value}    
                    linkImages={`data/quiz/soal/pilihan/${value.id}/${value.pertanyaan_images}`}
                    linkAudio={`data/quiz/soal/pilihan/${value.id}/${value.pertanyaan_audio}`}
                  />
                ))}
              </div> 
              <div className="flex items-center bg-near-white w-100" style={{borderTop:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>
              <div className="w-50 ph2">
                {totalDataPilihan !=undefined && 
                  <span className="f6" style={{fontStyle:"italic"}}>Total data : {totalDataPilihan} entri</span>
                }                
              </div>
              <div className="w-50 ph2 flex" style={{justifyContent:"flex-end"}}>  
                {totalDataPilihan !=undefined &&               
                  <Pagination pages={pagesPilihan} current={currPagePilihan} pageSize={3} pilihPage={this.pilihPaginationPilihan} disable={cariPilihan ? true:false} />
                }
              </div>
              </div>
              </>
            )}                            
            </div>
            <div label="Essay">
            {parseInt(bobotEssay) === 0 || bobotEssay === "" ? (
                <div className="flex justify-center items-center flex-column" style={{border:"3px dashed rgba(0, 0, 0, 0.125)",margin:10,width:"97%",height:"97%"}}>
                  <span className="f3 gray">Silahkan isi bobot nilai soal essay pada menu diatas</span>
                </div>
              ):(
              <>
              <div className="w-100 flex pa1">
                <div className="w-50 mr1">
                  <DropdownList filter='contains' data={semesterData} value={semesterPickEssay} onChange={value => this.handleSelectEssay(value)} textField="label" dataKey="id" placeholder="Pilih Semester"/>            
                </div>
                <div className="w-50">
                  <InputSearch name="cariEssay" disabled={dataEssay.length === 0 ? true:false} value={cariEssay ? cariEssay:""} placeholder={cariEssay ? "":"Cari soal"} onChange={this.handleInputChange} onReset={this.resetCariEssay} onClick={this.handleCariEssay} onKeyPress={this.handleKeyPressEssay}/>
                </div>
              </div>
              <div className="flex flex-wrap w-100 pa2 body-content">
              {semesterPickEssay === null && (
              <div className="flex justify-center items-center pa3 flex-column w-100" style={{border:"3px dashed rgba(0, 0, 0, 0.125)",height:365}}>
                <span className="f3 gray">Silahkan pilih semester pada menu dropdown diatas</span> 
              </div>
              )} 
              {dataEssay.length === 0 && semesterPickEssay != null &&
              <div className="flex justify-center items-center pa3 flex-column w-100" style={{border:"3px dashed rgba(0, 0, 0, 0.125)",height:365}}>
                <span className="f3 gray">Data soal essay kosong</span>         
              </div> 
              }
              {dataEssay.length > 0 && dataEssay.map((value,k) => (             
                <SoalItem key={k} nomor={k+1} text={value.pertanyaan_text}   
                  checked={paketEssay.some(item => item.id === value.id)}  
                  onChecked={() => this.onCheckedEssay(value)}
                  dataValue={value}    
                  linkImages={`data/quiz/soal/essay/${value.id}/${value.pertanyaan_images}`}
                  linkAudio={`data/quiz/soal/essay/${value.id}/${value.pertanyaan_audio}`}
                />
              ))}
              </div>
              <div className="flex items-center bg-near-white w-100" style={{borderTop:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>
              <div className="w-50 ph2">
                {totalDataEssay !=undefined && 
                  <span className="f6" style={{fontStyle:"italic"}}>Total data : {totalDataEssay} entri</span>
                }                
              </div>
              <div className="w-50 ph2 flex" style={{justifyContent:"flex-end"}}>
                {totalDataEssay !=undefined && 
                  <Pagination pages={pagesEssay} current={currPageEssay} pageSize={3} pilihPage={this.pilihPaginationEssay} disable={cariEssay ? true:false} />
                } 
              </div>
              </div>
              </>
            )}                                    
            </div>  
          </Tabs>
          </div>
        </div>
        <div className="flex items-center justify-center bg-near-white mb3" style={{border:"1px solid rgba(0, 0, 0, 0.125)",height:"58px"}}>            
            <button type="submit" className={`${uploadClass} dim pointer w-30 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary`} disabled={uploadDisable} onClick={this.updatePaket}>Perbarui paket soal</button> 
        </div>
        </div>
        <ToastContainer />
    </div>
    );
  }
  // ---------------------------- script 
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value});    
  }

  handleChangePilihan = (event) => { 
    const {bobotPilihan} = this.state;    
    const target = event.target;     
    const value = target.validity.valid ? target.value : bobotPilihan;    
    const name = target.name;    
    const numericRegex = /^(0|[1-9][0-9]?|100)$/;
    if(numericRegex.test(value) || value === "") {
      this.setState({ [name]: value });
    }     
  }

  handleChangeEssay = (event) => {
    const {bobotEssay} = this.state;    
    const target = event.target;    
    const value = target.validity.valid ? target.value : bobotEssay;    
    const name = target.name;
    const numericRegex = /^(0|[1-9][0-9]?|100)$/;
    if(numericRegex.test(value) || value === "") {
      this.setState({ [name]: value });
    }      
  }
  /*--- sort item data ---*/

  /*--- Onchecked soal ---*/
  onCheckedPilihan = (value) => {
    const {paketPilihan} =  this.state;    
    var index = paketPilihan.findIndex(x => x.id === value.id);             
    if (index !== -1) {      
      paketPilihan.splice(index, 1);
      this.setState({paketPilihan});
    }else{      
      paketPilihan.push(value);
      this.setState({paketPilihan});      
    } 
  }
  onCheckedEssay = (value) => {
    const {paketEssay} =  this.state;    
    var index = paketEssay.findIndex(x => x.id === value.id);             
    if (index !== -1) {      
      paketEssay.splice(index, 1);
      this.setState({paketEssay});
    }else{      
      paketEssay.push(value);
      this.setState({paketEssay});      
    } 
  }
  /*--- menu delete selected soal ---*/
  onDeletePilihan = (value) => {
    const {paketPilihan} =  this.state;
    var index = paketPilihan.findIndex(x => x.id === value.id);
    if (index !== -1) { 
      paketPilihan.splice(index, 1);
      this.setState({paketPilihan});
    }    
  }
  onDeleteEssay = (value) => {
    const {paketEssay} =  this.state;
    var index = paketEssay.findIndex(x => x.id === value.id);
    if (index !== -1) { 
      paketEssay.splice(index, 1);
      this.setState({paketEssay});
    }    
  }
  /*--- menu cari ---*/
  handleCariPilihan = () => {
    const {cariPilihan,semesterPickPilihan} = this.state;
    if(cariPilihan != undefined){
      this.fetchPilihanSoal(this.tingkatID,this.mapelID,semesterPickPilihan);
    }    
  }  
  handleKeyPressPilihan = (event) => {   
    const {cariPilihan,semesterPickPilihan} = this.state;    
    if (event.key === 'Enter' && cariPilihan != undefined) {
        this.fetchPilihanSoal(this.tingkatID,this.mapelID,semesterPickPilihan);
    }
  }
  resetCariPilihan = () => {
    const {semesterPickPilihan} = this.state; 
    this.setState({cariPilihan: undefined},() => this.fetchPilihanSoal(this.tingkatID,this.mapelID,semesterPickPilihan));
  }

  handleCariEssay = () => {
    const {cariEssay,semesterPickEssay} = this.state;
    if(cariEssay != undefined){
      this.fetchEssaySoal(this.tingkatID,this.mapelID,semesterPickEssay);
    }    
  }  
  handleKeyPressEssay = (event) => {   
    const {cariEssay,semesterPickEssay} = this.state;    
    if (event.key === 'Enter' && cariEssay!= undefined) {
        this.fetchEssaySoal(this.tingkatID,this.mapelID,semesterPickEssay);
    }
  }
  resetCariEssay= () => {
    const {semesterPickEssay} = this.state; 
    this.setState({cariEssay: undefined},() => this.fetchEssaySoal(this.tingkatID,this.mapelID,semesterPickEssay));
  }
  /*--- end menu cari ---*/
  /*--- pagination ---*/
  pilihPaginationPilihan = (nomor) =>{  
    const {semesterPickPilihan} = this.state;   
    this.setState({pagePilihan: nomor},() => this.fetchPilihanSoal(this.tingkatID,this.mapelID,semesterPickPilihan));
  }
  pilihPaginationEssay = (nomor) =>{  
    const {semesterPickEssay} = this.state;   
    this.setState({pageEssay: nomor},() => this.fetchPilihanSoal(this.tingkatID,this.mapelID,semesterPickEssay));
  }
  /*--- end pagination ---*/
  handleSelectPilihan = (value) => {
    this.setState({semesterPickPilihan:value.id,pagePilihan:1},() => this.fetchPilihanSoal(this.tingkatID,this.mapelID,value.id));
  }

  handleSelectEssay = (value) => {
    this.setState({semesterPickEssay:value.id,pageEssay:1},() => this.fetchEssaySoal(this.tingkatID,this.mapelID,value.id));
  }
  /*--- fetch data soal ---*/
  fetchPilihanSoal = (tingkat,mapel,semester) => {      
    const {pagePilihan,cariPilihan} = this.state;    
    axios.get(
      window.location.origin + `/api/pendidik/aplikasi/quiz/paket/${tingkat}/${mapel}/${semester}/pilihan?total=6` + `${pagePilihan ? '&page=' + pagePilihan : ''}`+ `${cariPilihan ? '&cari=' + cariPilihan : ''}` +"&nocache="+Date.now()
    ).then(response => {      
      this.setState({
        dataPilihan:response.data.message.data,
        totalDataPilihan:response.data.message.totaldata,        
        currPagePilihan:response.data.message.current,
        pagesPilihan:response.data.message.pages,  
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }

  fetchEssaySoal = (tingkat,mapel,semester) => {
    const {pageEssay,cariEssay} = this.state;    
    axios.get(
      window.location.origin + `/api/pendidik/aplikasi/quiz/paket/${tingkat}/${mapel}/${semester}/essay?total=6` + `${pageEssay ? '&page=' + pageEssay: ''}`+ `${cariEssay ? '&cari=' + cariEssay : ''}` +"&nocache="+Date.now()
    ).then(response => {      
      this.setState({
        dataEssay:response.data.message.data,
        totalDataEssay:response.data.message.totaldata,        
        currPageEssay:response.data.message.current,
        pagesEssay:response.data.message.pages,  
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /*--- fetch data ---*/
   fetchData = (tingkat,mapel,semester,paket) => {   
    axios.get(
      window.location.origin + `/api/pendidik/aplikasi/quiz/paket/${tingkat}/${mapel}/${semester}/paket/${paket}?&nocache=`+Date.now()
    ).then(response => {      
      this.setState({
        id:response.data.message.data.id,
        nama:response.data.message.data.nama,
        acak:response.data.message.data.acak_soal,
        bobotPilihan:response.data.message.data.bobot_pilihan,
        bobotEssay:response.data.message.data.bobot_essay,
        paketPilihan:response.data.message.data.pilihan_terpilih,
        paketEssay:response.data.message.data.essay_terpilih,
        semester:response.data.message.semester,        
        tingkatan:response.data.message.tingkatan,
        mapel:response.data.message.mapel,
        semesterData:response.data.message.semesterdata
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /*--- post data ---*/
  updatePaket = () => {
    const {id,nama,acak,bobotPilihan,bobotEssay,paketPilihan,paketEssay} = this.state;    
    this.setState({uploadProgress:true,uploadDisable:true});  
    var formData = new FormData();
    var jumlah = parseInt(bobotEssay === "" ? 0:bobotEssay,10) + parseInt(bobotPilihan === "" ? 0:bobotPilihan,10);
    if(jumlah > 100 || 100 > jumlah){      
      this.setState({uploadProgress:false,uploadDisable:false},() => toast.warn("Kedua bobot tidak boleh melebihi atau kurang dari 100"));
      return false;
    }
    if(paketPilihan.length > 0 && parseInt(bobotPilihan) === 0){
      this.setState({uploadProgress:false,uploadDisable:false},() => toast.warn("Bobot soal pilihan ganda wajib di isi"));
      return false;
    }
    if(paketEssay.length > 0 && parseInt(bobotEssay) === 0){
      this.setState({uploadProgress:false,uploadDisable:false},() => toast.warn("Bobot soal essay wajib di isi"));
      return false;
    }
    formData.append('id',id);
    formData.append('nama',nama);
    formData.append('acak',acak ? 1:0);
    formData.append('bobot_pilihan',bobotPilihan);
    formData.append('bobot_essay',bobotEssay);
    formData.append('paket_pilihan',JSON.stringify(paketPilihan));
    formData.append('paket_essay',JSON.stringify(paketEssay));    
    axios({
      method: 'patch',
      url: `/api/pendidik/aplikasi/quiz/paket/${this.tingkatID}/${this.mapelID}/${this.semesterID}/update`,
      data: formData
    }).then(response => {                 
        if(response.data.status == true)
        {      
          console.log("berhasil");                                    
          this.navigate(-1); 
        }
    }).catch(error => {                   
      if(error.response.status == 400){                       
        this.setState({uploadProgress:false,uploadDisable:false},() => toast.warn(error.response.data.message));
      }  
      if(error.response.status == 401){
        this.logout();
      }                    
      if(error.message === "Network Error"){ 
        toast.error("Jaringan internet tidak tersambung");                    
      }     
    });    
  }
  /*--- Logout ---*/
  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];  
    this.navigate("/", { replace: true });    
  }
  // ---------------------------- end of script
}

export default PageAplikasiQuizPaketSoalEdit;