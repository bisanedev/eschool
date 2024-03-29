import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import DatePicker from "react-datepicker";
import Forbidden from "../../other/forbidden";
import {Breadcrumb} from '../../../components/menu';
import {InputSearch} from '../../../components/forms';
import Table from "../../../components/table";
import {DeleteDialog} from '../../../components/dialog';
import {AddModal,EditModal} from '../../../components/modal';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/id";

class PageSekolahSemesterSub extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      nextPage:undefined,
      total:10,
      totalData:undefined,
      cari:undefined,
      isLoading:true,
      data:[],
      pages:1,
      currPage:undefined,      
      selected:[],
      showDelete:false,
      showSingleDelete:false,
      showAdd:false,
      showEdit:false,
      singleData:[],
      kelas:"",
      id:"",
      semester:1,
      semesterStart:"",
      semesterEnd:"",
      tahunAjaran:"",      
      errorSemesterStart:"",
      errorSemesterEnd:"",
    }    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.semesterID = this.props.params.semesterID;
    this.navigate = this.props.navigate;
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.fetchData(this.semesterID),300);       
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {           
    const {tokenData} = this.props;        
    const {data,totalData,pages,currPage,total,cari,selected,showDelete,showSingleDelete,singleData,showAdd,showEdit,isLoading,tahunAjaran,semester,semesterStart,semesterEnd,errorSemesterStart,errorSemesterEnd} = this.state;
    return (  
    <div className="konten"> 
      <Helmet>
        <title>Semester - Nama Sekolah</title>
      </Helmet>
      {!tokenData.superuser ? (<Forbidden location={this.props.location}/>):(
      <>
        <div className="headings">
          <div className="title">Semester</div>
          <div className="subtitle">Halaman informasi untuk semester</div>
          <Breadcrumb homeUrl="/sekolah" homeText="Sekolah">            
            <li><Link to="/sekolah/semester"><span>Semester</span></Link></li>
            <li><Link to={"#/sekolah/semester/"+this.semesterID}><span>{tahunAjaran !="" ? tahunAjaran:"memuat..."}</span></Link></li>            
          </Breadcrumb>
        </div>                
        <div className="mw9 center cf ph3 mb3">
        <Table>
          <Table.Header>
            <div className="w-50 ph2">
              <button type="submit" className="pointer link dim br1 ba pa2 dib white bg-primary b--primary" onClick={() => this.setState({showAdd:true,semester:1,semesterStart:"",semesterEnd:"",errorSemesterStart:"",errorSemesterEnd:""})}>
                <i className="material-icons-outlined" style={{fontSize:"20px"}}>add</i>
              </button>
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
                <option label="10" value="10"/>
                <option label="20" value="20"/>
                <option label="30" value="30"/>
              </select>
              <div className="ml2">                
                <InputSearch name="cari" value={cari ? cari:""} placeholder={cari ? "":"Cari Semester"} onChange={this.handleInputChange} onReset={this.resetCari} onClick={this.handleCari} onKeyPress={this.handleKeyPress}/>
              </div>
            </div> 
          </Table.Header>       
          <Table.Body>
            {data.length > 0 && !isLoading && data.map((value,k) => (
                <Table.DataSimple key={k} title={"Semester "+value.semester} 
                subtitle={moment(value.semester_start).format('DD MMMM')+" s.d. "+moment(value.semester_end).format('DD MMMM')+" Tahun "+moment(value.semester_end).format('YYYY')}
                checked={selected.includes(value.id)} 
                onChecked={() => this.onChecked(value.id)}
                onDelete={() => this.onDelete(value)}
                onEdit={() => this.onEdit(value)}
                />     
            ))} 
            {isLoading && <Table.Loading nama="semester" /> } 
            {data.length === 0 && !isLoading && <Table.Empty nama="semester" /> }
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
          title="Hapus" subtitle={"Yakin hapus semester "+singleData.semester+" ??"} 
          close={() => this.setState({showSingleDelete:false})}        
          onClick={() => this.singleDelete(singleData)}
        />
        <AddModal show={showAdd}
            height="380px"
            width="400px" 
            title="Menambahkan semester" 
            close={() => this.setState({showAdd:false})}        
            onClick={() => this.tambahkan()}
        >
          <div className="w-100 pa3">
            <label className="f5 fw4 db mb2">Pilih semester</label>
            <select className="pa2 db w-100 mb2" value={semester} onChange={this.handleSemesterChange}>
                <option label="Semester 1" value="1"/>
                <option label="Semester 2" value="2"/>                
            </select> 
            <label className="f5 fw4 db mb2">Tanggal awal semester</label>
            <DatePicker className={"input-reset ba b--black-20 pa2 db w-100 " + (errorSemesterStart != "" ? "error":"mb2")} 
              dateFormat="dd/MM/yyyy" selected={semesterStart} 
              onChange={(date) => this.setState({semesterStart:date})}
              selectsStart
              startDate={semesterStart}
              endDate={semesterEnd}
            />
            {errorSemesterStart != "" && ( <span className="pesan-error mb2">{errorSemesterStart}</span> )}            
            <label className="f5 fw4 db mb2">Tanggal akhir semester</label>
            <DatePicker className={"input-reset ba b--black-20 pa2 db w-100 " + (errorSemesterEnd != "" ? "error":"mb2")} 
              dateFormat="dd/MM/yyyy" selected={semesterEnd} 
              onChange={(date) => this.setState({semesterEnd:date})}
              selectsEnd
              startDate={semesterStart}
              endDate={semesterEnd}
              minDate={semesterStart}
            />
            {errorSemesterEnd != "" && ( <span className="pesan-error mb2">{errorSemesterEnd}</span> )}            
          </div>
        </AddModal>
        <EditModal
          show={showEdit}
          height="380px"
          width="400px" 
          title="Mengubah data semester" 
          close={() => this.setState({showEdit:false})}        
          onClick={() => this.ubahData()}
        >
          <div className="w-100 pa3">
            <label className="f5 fw4 db mb2">Pilih semester</label>
            <select className="pa2 db w-100 mb2" value={semester} onChange={this.handleSemesterChange}>
                <option label="Semester 1" value="1"/>
                <option label="Semester 2" value="2"/>               
            </select>
            <label className="f5 fw4 db mb2">Tanggal awal semester</label>
            <DatePicker className={"input-reset ba b--black-20 pa2 db w-100 " + (errorSemesterStart != "" ? "error":"mb2") } 
              dateFormat="dd/MM/yyyy" selected={semesterStart}               
              onChange={(date) => this.setState({semesterStart:date})}
              selectsStart
              startDate={semesterStart}
              endDate={semesterEnd}
            />
            {errorSemesterStart != "" && ( <span className="pesan-error mb2">{errorSemesterStart}</span> )}
            <label className="f5 fw4 db mb2">Tanggal akhir semester</label>
            <DatePicker className={"input-reset ba b--black-20 pa2 db w-100 " + (errorSemesterEnd != "" ? "error":"mb2")}
              dateFormat="dd/MM/yyyy" selected={semesterEnd} 
              onChange={(date) => this.setState({semesterEnd:date})}
              selectsEnd
              startDate={semesterStart}
              endDate={semesterEnd}
              minDate={semesterStart}
            />
            {errorSemesterEnd != "" && ( <span className="pesan-error mb2">{errorSemesterEnd}</span> )}
          </div>
        </EditModal>
      </>      
      )}             
    </div>
    );
  }
  // ---------------------------- script 
  handleSemesterChange = (event) => {
    this.setState({semester: event.target.value});
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  } 

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
      this.fetchData(this.semesterID);
    }    
  }  
  handleKeyPress = (event) => {   
    const {cari} = this.state;    
    if (event.key === 'Enter' && cari != undefined) {
        this.fetchData(this.semesterID);
    }
  }
  resetCari = () => {
    this.setState({cari: undefined},() => this.fetchData(this.semesterID));
  }
  /*--- Select jumlah data ---*/
  handleSelectChange = (event) => {    
    this.setState({total: event.target.value,page:1,selected:[]},() => this.fetchData(this.semesterID));
  } 
  /*--- pagination ---*/
  pilihPagination = (nomor) =>{    
    this.setState({page: nomor},() => this.fetchData(this.semesterID));
  }
  /*--- fetch data ---*/
  fetchData = (id) => { 
    const {page,total,cari} = this.state;
    this.setState({isLoading:true});
    axios.get(
      window.location.origin + `/api/pendidik/sekolah/tahun/semester/${id}?`+ `${total ? 'total=' + total : ''}` + `${page ? '&page=' + page : ''}`+ `${cari ? '&cari=' + cari : ''}` +"&nocache="+Date.now()
    ).then(response => {      
      this.setState({
        data:response.data.message.data,
        totalData:response.data.message.totaldata,        
        currPage:response.data.message.current,
        pages:response.data.message.pages,  
        tahunAjaran:response.data.message.tahun,
        isLoading:false
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /*--- Menambahkan data ---*/
  tambahkan = () => {    
    const {semester,semesterStart,semesterEnd} = this.state;
    var formData = new FormData();
    formData.append('semester', semester );
    formData.append('semester_start', moment(semesterStart).format('YYYY-MM-DD'));
    formData.append('semester_end', moment(semesterEnd).format('YYYY-MM-DD'));
    axios({
      method: 'post',
      url: window.location.origin +'/api/pendidik/sekolah/tahun/semester/'+this.semesterID,
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {                
        toast.success("Data semester "+semester+" berhasil ditambahkan");
        this.setState({showAdd:false,page:1},() => this.fetchData(this.semesterID));        
      }
    }).catch(error => {
      if(error.response.status == 401){
        this.logout();
      }
      if(error.response.status == 400){     
        if(error.response.data.message["semester_end"]){   
          this.setState({errorSemesterEnd:error.response.data.message["semester_end"]}); 
        }   
        if(error.response.data.message["semester_start"]){   
          this.setState({errorSemesterStart:error.response.data.message["semester_start"]}); 
        }        
      }
    });
  }
  /*--- Edit Data ---*/
  onEdit = (data) => {
    this.setState({showEdit:true,id:data.id,semester:data.semester,semesterStart:moment(data.semester_start).toDate(),semesterEnd:moment(data.semester_end).toDate(),errorSemesterStart:"",errorSemesterEnd:""})
  }
  ubahData = () => {
    const {id,semester,semesterStart,semesterEnd} = this.state;
    var formData = new FormData();
    formData.append('id', id );
    formData.append('semester', semester );
    formData.append('semester_start', moment(semesterStart).format('YYYY-MM-DD'));
    formData.append('semester_end', moment(semesterEnd).format('YYYY-MM-DD'));
    axios({
      method: 'patch',
      url: window.location.origin +'/api/pendidik/sekolah/tahun/semester/'+this.semesterID,
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        toast.success("Data semester "+semester+" berhasil diperbarui");
        this.setState({showEdit:false},() => this.fetchData(this.semesterID));        
      }
    }).catch(error => {
      if(error.response.status == 401){
        this.logout();
      }
      if(error.response.status == 400){
        if(error.response.data.message["semester_end"]){   
          this.setState({errorSemesterEnd:error.response.data.message["semester_end"]}); 
        }   
        if(error.response.data.message["semester_start"]){   
          this.setState({errorSemesterStart:error.response.data.message["semester_start"]}); 
        } 
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
      url: window.location.origin +'/api/pendidik/sekolah/tahun/semester/'+this.semesterID,
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        toast.success("Data semester "+ data.semester +" berhasil dihapus");
        this.setState({showSingleDelete:false},() => this.fetchData(this.semesterID));        
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
      url: window.location.origin +'/api/pendidik/sekolah/tahun/semester/'+this.semesterID,
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        toast.success(selected.length +" data berhasil dihapus");
        this.setState({showDelete:false,selected:[]},() => this.fetchData(this.semesterID));        
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

export default PageSekolahSemesterSub;