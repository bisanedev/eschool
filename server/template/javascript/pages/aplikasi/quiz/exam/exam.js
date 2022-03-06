import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import {Breadcrumb} from '../../../../components/menu';
import {InputSearch} from '../../../../components/forms';
import Table from "../../../../components/table";
import {DeleteDialog} from '../../../../components/dialog';
import { toast } from 'react-toastify';

class PageAplikasiQuizExamIndex extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      nextPage:undefined,
      total:8,
      totalData:undefined,
      cari:undefined,
      isLoading:true,
      data:[],
      pages:1,
      currPage:undefined,      
      selected:[],
      showDelete:false,
      showSingleDelete:false,            
      singleData:[],
      tingkatan:null,
      mapel:null,
      semester:null
    }    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.tingkatID = this.props.params.tingkatID;
    this.mapelID = this.props.params.mapelID;
    this.semesterID = this.props.params.semesterID;
    this.navigate = this.props.navigate;
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID),300);       
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }  

  render() {         
    const {data,totalData,pages,currPage,total,cari,selected,showDelete,showSingleDelete,singleData,isLoading,tingkatan,mapel,semester} = this.state;
    return (  
    <div className="konten"> 
      <Helmet>
        <title>Ujian - Nama Sekolah</title>
      </Helmet>  
        <div className="headings">
          <div className="title">Ujian</div>
          <div className="subtitle">Data ujian untuk tingkatan {tingkatan != null ? tingkatan.nama:"memuat..."}, mata pelajaran {mapel != null ? mapel.nama:"memuat..."} dan {semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</div>
          <Breadcrumb homeUrl="/aplikasi" homeText="Aplikasi"> 
            <li><a href="#/aplikasi/quiz"><span>Kuis platform</span></a></li>   
            <li><a href="#/aplikasi/quiz/exam"><span>Ujian</span></a></li>               
            <li><a href={"#/aplikasi/quiz/exam/"+this.tingkatID}><span>{tingkatan != null ? tingkatan.nama:"memuat..."}</span></a></li>  
            <li><a href={"#/aplikasi/quiz/exam/"+this.tingkatID+"/"+this.mapelID}><span>{mapel != null ? mapel.nama:"memuat..."}</span></a></li>
            <li><a href={"#/aplikasi/quiz/exam/"+this.tingkatID+"/"+this.mapelID+"/"+this.semesterID}><span>{semester != null ? semester.tahun+" (semester "+semester.semester+")":"memuat..."}</span></a></li>            
          </Breadcrumb>
        </div>                
        <div className="mw9 center cf ph3 mb3">
        <Table>
          <Table.Header>
            <div className="w-50 ph2">
              <a href={`#/aplikasi/quiz/exam/${this.tingkatID}/${this.mapelID}/${this.semesterID}/add`} className="pointer link dim br1 ba pa2 dib white bg-primary b--primary" onClick={() => this.setState({showAdd:true})}>                
                <i className="material-icons-outlined" style={{fontSize:"20px"}}>add</i>
              </a>
            </div>
            <div className="w-50 ph2 flex" style={{justifyContent:"flex-end"}}>              
              <button type="submit" style={{fontSize:"13px",border:"1px solid rgba(0, 0, 0, 0.125)"}} className="pointer link dim br1 ba pa2 dib bg-white" onClick={() => this.selectAll()}>
                {data.length === selected.length ? "BATAL PILIH SEMUA":"PILIH SEMUA"}
              </button>
              <div className="dropdown">
                <button style={{border:"1px solid rgba(0, 0, 0, 0.125)"}} className="pointer link dim br1 ba pa2 dib bg-white">                  
                  <i className="material-icons-outlined" style={{fontSize:"25px",color:"#474747"}}>more_vert</i>
                </button>
                <div className="dropdown-content">                  
                  <div className="disable">
                    <span>Edit</span>                    
                    <i className="material-icons-outlined" style={{fontSize:18}}>edit</i>
                  </div>
                  <div className={selected.length === 0 ? "disable":""} onClick={ e => selected.length === 0 ? e.preventDefault() : this.setState({showDelete:true})}>
                    <span>Hapus</span>                    
                    <i className="material-icons-outlined red" style={{fontSize:18}}>delete</i>              
                  </div>
                </div>   
              </div>                                                                          
              <select className="pa2 db gray ml2" value={total} onChange={this.handleSelectChange}>
                <option label="8" value="8"/>
                <option label="16" value="16"/>
                <option label="24" value="24"/>
              </select>
              <div className="ml2">                
                <InputSearch name="cari" value={cari ? cari:""} placeholder={cari ? "":"Cari ujian"} onChange={this.handleInputChange} onReset={this.resetCari} onClick={this.handleCari} onKeyPress={this.handleKeyPress}/>
              </div>
            </div> 
          </Table.Header>       
          <Table.Body>
            {data.length > 0 && !isLoading && data.map((value,k) => (
              <Table.DataExam key={k} nama={value.nama} data={value} src={"data/users/"+value.username+".jpg?nocache="+Date.now()}
              onEdit={`#/aplikasi/quiz/exam/${this.tingkatID}/${this.mapelID}/${this.semesterID}/${value.id}`}             
              onLihat={`#/aplikasi/quiz/exam/${this.tingkatID}/${this.mapelID}/${this.semesterID}/${value.id}`} 
              checked={selected.includes(value.id)} 
              onChecked={() => this.onChecked(value.id)}
              onDelete={() => this.onDelete(value)}
              />     
            ))} 
            {isLoading && <Table.Loading nama="ujian" /> } 
            {data.length === 0 && !isLoading && <Table.Empty nama="ujian" /> }              
          </Table.Body>
          <Table.Footer>
            <div className="w-50 ph2">
              <span className="f6" style={{fontStyle:"italic"}}>Total data : {totalData} entri</span>
            </div>
            <div className="w-50 ph2 flex" style={{justifyContent:"flex-end"}}>
              <Table.Pagination pages={pages} current={currPage} pageSize={3} pilihPage={this.pilihPagination} disable={cari ? true:false} />              
            </div>
          </Table.Footer>          
        </Table>
        </div>
        <DeleteDialog show={showDelete} 
          title="Hapus semua" subtitle={"Yakin hapus "+selected.length+" data yang anda pilih ??"} 
          close={() => this.setState({showDelete:false})} 
          onClick={this.multiDelete}
        />
        <DeleteDialog show={showSingleDelete} 
          title="Hapus" subtitle={"Yakin hapus data "+singleData.nama+" ??"} 
          close={() => this.setState({showSingleDelete:false})}        
          onClick={() => this.singleDelete(singleData)}
        />            
    </div>
    );
  }
  // ---------------------------- script 
  
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  } 

  handleEditChange = (e) => {
    this.setState(prevState => ({
      singleData: {
          ...prevState.singleData,
          nama: e.target.value
      }
    }));  
  };
  /*--- select ALL ---*/
  selectAll = () => {    
    const {selected,data} =  this.state;   
    var selectedx = [];
    if (selected.length != data.length) {
      data.forEach(function (data) {
        selectedx.push(data.id);
      });
      this.setState({selected:selectedx});
    }else{
      this.setState({selected:[]});
    }  
  }
  onChecked = (id) => {
    const {selected} =  this.state;    
    var index = selected.indexOf(id);             
    if (index !== -1) {      
      selected.splice(index, 1);
      this.setState({selected});
    }else{      
      selected.push(id);
      this.setState({selected});      
    }                 
  }
  /*--- menu cari ---*/
  handleCari = () => {
    const {cari} = this.state;
    if(cari != undefined){
      this.fetchData(this.tingkatID,this.mapelID,this.semesterID);
    }    
  }  
  handleKeyPress = (event) => {   
    const {cari} = this.state;    
    if (event.key === 'Enter' && cari != undefined) {
        this.fetchData(this.tingkatID,this.mapelID,this.semesterID);
    }
  }
  resetCari = () => {
    this.setState({cari: undefined},() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID));
  }
  /*--- Select jumlah data ---*/
  handleSelectChange = (event) => {    
    this.setState({total: event.target.value,page:1,selected:[]},() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID));
  } 
  /*--- pagination ---*/
  pilihPagination = (nomor) =>{    
    this.setState({page: nomor},() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID));
  }
  /*--- fetch data ---*/
  fetchData = (tingkatID,mapelID,semesterID) => { 
    const {page,total,cari} = this.state;
    this.setState({isLoading:true});
    axios.get(
      window.location.origin + `/api/pendidik/aplikasi/quiz/exam/${tingkatID}/${mapelID}/${semesterID}?`+ `${total ? 'total=' + total : ''}` + `${page ? '&page=' + page : ''}`+ `${cari ? '&cari=' + cari : ''}` +"&nocache="+Date.now()
    ).then(response => {      
      this.setState({
        data:response.data.message.data,
        totalData:response.data.message.totaldata,        
        currPage:response.data.message.current,
        pages:response.data.message.pages,  
        tingkatan:response.data.message.tingkatan,
        mapel:response.data.message.mapel,
        semester:response.data.message.semester,
        isLoading:false
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /*--- Hapus single data ---*/
  onDelete = (data) => {
    this.setState({showSingleDelete:true,singleData:data})
  }
  
  singleDelete = (data) => {    
    var formData = new FormData();
    formData.append('delete', data.id);    
    axios({
      method: 'delete',
      url: window.location.origin +'/api/pendidik/aplikasi/quiz/exam',
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        toast.success("Data "+ data.nama +" berhasil dihapus");
        this.setState({showSingleDelete:false},() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID));        
      }
    }).catch(error => {
      if(error.response.status == 401){
        this.logout();
      }
      if(error.response.status == 400){       
        toast.warn(error.response.data.message);  
      }
    });
  }
  /*--- Hapus data ---*/
  multiDelete = () => {    
    const {selected} = this.state;    
    var formData = new FormData();
    formData.append('delete', JSON.stringify(selected));    
    axios({
      method: 'delete',
      url: window.location.origin +'/api/pendidik/aplikasi/quiz/exam',
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        toast.success(selected.length +" data berhasil dihapus");
        this.setState({showDelete:false,selected:[]},() => this.fetchData(this.tingkatID,this.mapelID,this.semesterID));        
      }
    }).catch(error => {
      if(error.response.status == 401){
        this.logout();
      }
      if(error.response.status == 400){       
        toast.warn(error.response.data.message);  
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

export default PageAplikasiQuizExamIndex;