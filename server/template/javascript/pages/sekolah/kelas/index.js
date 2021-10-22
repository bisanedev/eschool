import React from "react";
import {withRouter} from "react-router";
import { Helmet } from "react-helmet";
import axios from "axios";
import Forbidden from "../../other/forbidden";
import {Breadcrumb} from '../../../components/menu';
import {InputSearch} from '../../../components/forms';
import {Table,TableHeader,TableBody,TableCell,TableFooter,TablePagination} from "../../../components/table";


class PageSekolahKelas extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      nextPage:undefined,
      total:1,
      totalData:undefined,
      cari:undefined,
      isLoading:false,
      data:[],
      pages:1,
      currPage:undefined,      
      selected:[],
    }    
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();    
  }

  render() {     
    const {tokenData} = this.props;
    const {data,totalData,pages,currPage,total,cari,selected} = this.state;
    return (  
    <div className="konten"> 
      <Helmet>
        <title>Kelas - Nama Sekolah</title>
      </Helmet>
      {!tokenData.superuser ? (<Forbidden location={this.props.location}/>):(
      <>
        <div className="headings">
          <div className="title">Kelas</div>
          <div className="subtitle">Halaman informasi data kelas</div>
          <Breadcrumb homeUrl="/sekolah" homeText="Sekolah">
            <li><a href="#/sekolah/kelas"><span>Kelas</span></a></li>   
            <li><a href="#"><span>Data kelas</span></a></li>  
          </Breadcrumb>    
        </div>                
        <div className="mw9 center cf ph3 mb3">
        <Table>
          <TableHeader>
            <div className="w-50 ph2">
              <button type="submit" style={{cursor: "pointer",borderColor:"#0191d7"}} className="link dim br1 ba pa2 dib white bg-primary" onClick={this.tambahkan}>
                <i className="fas fa-plus" style={{fontSize:"18px"}}/>
              </button>
            </div>
            <div className="w-50 ph2 flex" style={{justifyContent:"flex-end"}}>              
              <button type="submit" style={{cursor: "pointer",fontSize:"13px",border:"1px solid rgba(0, 0, 0, 0.125)"}} className="link dim br1 ba pa2 dib bg-white" onClick={() => this.selectAll()}>
                {data.length === selected.length ? "BATAL PILIH SEMUA":"PILIH SEMUA"}
              </button>
              <div className="dropdown">
                <button type="submit" style={{cursor: "pointer",border:"1px solid rgba(0, 0, 0, 0.125)"}} className="link dim br1 ba pa2 dib bg-white" onClick={this.tambahkan}>
                  <i className="fas fa-ellipsis-v" style={{fontSize:"25px",color:"#474747"}}/>
                </button>
                <div className="dropdown-content">                  
                  <div className="disable">
                    <span>Edit</span>
                    <i className="fas fa-pen" style={{fontSize:"14px"}}/>
                  </div>
                  <div>
                    <span>Hapus</span>
                    <i className="fas fa-trash" style={{color:"red",fontSize:"14px"}}/>
                  </div>
                </div>   
              </div>                                                                          
              <select className="pa2 db gray ml2" value={total} onChange={this.handleSelectChange}>
                <option label="1" value="1"/>
                <option label="20" value="20"/>
                <option label="30" value="30"/>
              </select>
              <div className="flex ml2">                
                <InputSearch name="cari" value={cari ? cari:""} placeholder={cari ? "":"Cari Nama Kelas"} onChange={this.handleInputChange} onReset={this.resetCari} onClick={this.handleCari} onKeyPress={this.handleKeyPress}/>
              </div>
            </div> 
          </TableHeader>       
          <TableBody>
          {data.length > 0 && data.map((value,k) => (
              <TableCell key={k} title={value.nama} checked={selected.includes(value.id)} onChecked={() => this.onChecked(value.id)}/>     
          ))}  
          </TableBody>
          <TableFooter>
            <div className="w-50 ph2">
              <span className="f6" style={{fontStyle:"italic"}}>Total data : {totalData} entri</span>
            </div>
            <div className="w-50 ph2 flex" style={{justifyContent:"flex-end"}}>
              <TablePagination pages={pages} current={currPage} pageSize={3} pilihPage={this.pilihPagination} disable={cari ? true:false} />              
            </div>
          </TableFooter>          
        </Table>
        </div>
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
      console.log("value ada");
      selected.splice(index, 1);
      this.setState({selected});
    }else{
      console.log("value tidak ada");
      selected.push(id);
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
      window.location.origin + `/api/pendidik/sekolah/kelas/tingkatan?`+ `${total ? 'total=' + total : ''}` + `${page ? '&page=' + page : ''}`+ `${cari ? '&cari=' + cari : ''}` +"&nocache="+Date.now()
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
  /*--- Menambahkan data ---*/
  tambahkan = () => {
    console.log("tambahkan");
  }  
  /*--- Logout ---*/
  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization']; 
    this.props.history.push('/');
  }
  // ---------------------------- end of script
}

export default withRouter(PageSekolahKelas);