import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Forbidden from "../../other/forbidden";
import {Breadcrumb} from '../../../components/menu';
import {InputSearch} from '../../../components/forms';
import Table from "../../../components/table";
import {DeleteDialog} from '../../../components/dialog';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";

class PageSekolahPendidik extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      nextPage:undefined,
      total:12,
      totalData:undefined,
      cari:undefined,
      isLoading:true,
      data:[],
      pages:1,
      currPage:undefined,      
      selected:[],
      showDelete:false,
      showSingleDelete:false,     
      singleData:[]      
    }    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.navigate = this.props.navigate;
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.fetchData(),300);       
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  
  render() {     
    const {tokenData} = this.props;
    const {data,totalData,pages,currPage,total,cari,selected,showDelete,isLoading,singleData,showSingleDelete} = this.state;
    return (  
    <div className="konten"> 
      <Helmet>
        <title>Users & Pendidik - Nama Sekolah</title>
      </Helmet>
      {!tokenData.superuser ? (<Forbidden location={this.props.location}/>):(
      <>
        <div className="headings">
          <div className="title">Users & Pendidik</div>
          <div className="subtitle">Halaman informasi untuk users & pendidik</div>
          <Breadcrumb homeUrl="/sekolah" homeText="Sekolah">
            <li><Link to="/sekolah/pendidik"><span>Users & pendidik</span></Link></li>                   
          </Breadcrumb>    
        </div>                
        <div className="mw9 center cf ph3 mb3">
        <Table>
          <Table.Header>
            <div className="w-50 ph2">
              <Link to="/sekolah/pendidik/add" className="pointer link dim br1 ba pa2 dib white bg-primary b--primary">                            
                <i className="material-icons-outlined" style={{fontSize:"20px"}}>add</i>              
              </Link>
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
                <option label="12" value="12"/>
                <option label="24" value="24"/>
                <option label="36" value="36"/>
              </select>
              <div className="ml2">                
                <InputSearch name="cari" value={cari ? cari:""} placeholder={cari ? "":"Cari Users dan pendidik"} onChange={this.handleInputChange} onReset={this.resetCari} onClick={this.handleCari} onKeyPress={this.handleKeyPress}/>
              </div>
            </div> 
          </Table.Header>       
          <Table.Body>
          {data.length > 0 && !isLoading && data.map((value,k) => (
              <Table.DataProfile key={k} data={value} superuser={value.id === "1" ? true:false}
                src={"/data/users/"+value.username+".jpg?nocache="+Date.now()}
                href={`/sekolah/pendidik/edit/${value.id}`}
                checked={selected.includes(value)} 
                onChecked={() => this.onChecked(value)}   
                onDelete={() => this.onDelete(value)}                         
              >
                {value.mapel.length > 0 && value.mapel.map((wow,i) => (
                  <span key={i} style={{color:wow.color,marginRight:5}}>{wow.nama}</span>
                ))}
              </Table.DataProfile>     
          ))} 
          {isLoading && <Table.Loading nama="pendidik" /> } 
          {data.length === 0 && !isLoading && <Table.Empty nama="pendidik" /> } 
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
        <DeleteDialog show={showSingleDelete} 
          title="Hapus" subtitle={"Yakin hapus user "+singleData.nama+" ??"} 
          close={() => this.setState({showSingleDelete:false})}        
          onClick={() => this.singleDelete(singleData)}
        />
        <DeleteDialog show={showDelete} 
          title="Hapus semua" subtitle={"Yakin hapus "+selected.length+" data yang anda pilih ??"} 
          close={() => this.setState({showDelete:false})} 
          onClick={this.multiDelete}
        />             
      </>      
      )}              
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
        selectedx.push(data);
      });
      this.setState({selected:selectedx});
    }else{
      this.setState({selected:[]});
    }  
  }
  onChecked = (data) => {
    const {selected} =  this.state;       
    var index = selected.indexOf(data);             
    if (index !== -1) {      
      selected.splice(index, 1);
      this.setState({selected});
    }else{ 
      selected.push(data);
      this.setState({selected});      
    }                 
  }
  /*--- menu cari ---*/
  handleCari = () => {
    const {cari} = this.state;
    if(cari != undefined){
      this.fetchData();
    }    
  }  
  handleKeyPress = (event) => {   
    const {cari} = this.state;    
    if (event.key === 'Enter' && cari != undefined) {
        this.fetchData();
    }
  }
  resetCari = () => {
    this.setState({cari: undefined},() => this.fetchData());
  }
  /*--- Select jumlah data ---*/
  handleSelectChange = (event) => {    
    this.setState({total: event.target.value,page:1,selected:[]},() => this.fetchData());
  } 
  /*--- pagination ---*/
  pilihPagination = (nomor) =>{    
    this.setState({page: nomor},() => this.fetchData());
  }
  /*--- fetch data ---*/
  fetchData = () => { 
    const {page,total,cari} = this.state;
    this.setState({isLoading:true});
    axios.get(
      window.location.origin + `/api/pendidik/sekolah/users?`+ `${total ? 'total=' + total : ''}` + `${page ? '&page=' + page : ''}`+ `${cari ? '&cari=' + cari : ''}` +"&nocache="+Date.now()
    ).then(response => {      
      this.setState({
        data:response.data.message.data,
        totalData:response.data.message.totaldata,        
        currPage:response.data.message.current,
        pages:response.data.message.pages,        
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
    formData.append('metode', 'single');
    formData.append('delete', JSON.stringify(data));    
    axios({
      method: 'delete',
      url: window.location.origin +'/api/pendidik/sekolah/users',
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        toast.success("Data "+ data.nama +" berhasil dihapus");
        this.setState({showSingleDelete:false},() => this.fetchData());        
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
    formData.append('metode', 'multi');
    formData.append('delete', JSON.stringify(selected));    
    axios({
      method: 'delete',
      url: window.location.origin +'/api/pendidik/sekolah/users',
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        toast.success(selected.length +" data berhasil dihapus");
        this.setState({showDelete:false,selected:[]},() => this.fetchData());        
      }
    }).catch(error => {
      if(error.response.status == 401){
        this.logout();
      }
      if(error.response.status == 400){       
        toast.error(error.response.data.message);  
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

export default PageSekolahPendidik;
