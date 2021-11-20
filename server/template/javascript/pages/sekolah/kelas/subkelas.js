import React from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import Forbidden from "../../other/forbidden";
import {Breadcrumb} from '../../../components/menu';
import {InputSearch,InputText} from '../../../components/forms';
import Table from "../../../components/table";
import {DeleteDialog} from '../../../components/dialog';
import {AddModal,EditModal} from '../../../components/modal';
import { ToastContainer, toast } from 'react-toastify';

class PageSekolahKelasSub extends React.Component{

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
      tingkatanNama:"",
    }    
    this.handleInputChange = this.handleInputChange.bind(this);
    this.kelasID = this.props.params.kelasID;
    this.navigate = this.props.navigate;
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.fetchData(this.kelasID),300);       
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }  

  render() {           
    const {tokenData} = this.props;        
    const {data,totalData,pages,currPage,total,cari,selected,showDelete,showSingleDelete,singleData,showAdd,showEdit,isLoading,tingkatanNama} = this.state;
    return (  
    <div className="konten"> 
      <Helmet>
        <title>Kelas - Nama Sekolah</title>
      </Helmet>
      {!tokenData.superuser ? (<Forbidden location={this.props.location}/>):(
      <>
        <div className="headings">
          <div className="title">Kelas</div>
          <div className="subtitle">Halaman informasi untuk kelas</div>
          <Breadcrumb homeUrl="/sekolah" homeText="Sekolah">
            <li><a href="#/sekolah/kelas"><span>Tingkatan kelas</span></a></li>
            <li><a href={"#/sekolah/kelas/"+this.kelasID}><span>{tingkatanNama !="" ? tingkatanNama:"memuat..."}</span></a></li>   
            <li><a href="#"><span>Data kelas</span></a></li>  
          </Breadcrumb>
        </div>                
        <div className="mw9 center cf ph3 mb3">
        <Table>
          <Table.Header>
            <div className="w-50 ph2">
              <button type="submit" style={{cursor: "pointer",borderColor:"#0191d7"}} className="link dim br1 ba pa2 dib white bg-primary" onClick={() => this.setState({showAdd:true})}>                
                <i className="material-icons-outlined" style={{fontSize:"20px"}}>add</i>
              </button>
            </div>
            <div className="w-50 ph2 flex" style={{justifyContent:"flex-end"}}>              
              <button type="submit" style={{cursor: "pointer",fontSize:"13px",border:"1px solid rgba(0, 0, 0, 0.125)"}} className="link dim br1 ba pa2 dib bg-white" onClick={() => this.selectAll()}>
                {data.length === selected.length ? "BATAL PILIH SEMUA":"PILIH SEMUA"}
              </button>
              <div className="dropdown">
                <button style={{cursor: "pointer",border:"1px solid rgba(0, 0, 0, 0.125)"}} className="link dim br1 ba pa2 dib bg-white">                  
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
              <div className="flex ml2">                
                <InputSearch name="cari" value={cari ? cari:""} placeholder={cari ? "":"Cari nama kelas"} onChange={this.handleInputChange} onReset={this.resetCari} onClick={this.handleCari} onKeyPress={this.handleKeyPress}/>
              </div>
            </div> 
          </Table.Header>       
          <Table.Body>
            {data.length > 0 && !isLoading && data.map((value,k) => (
                <Table.DataSimple key={k} title={value.nama}
                checked={selected.includes(value.id)} 
                onChecked={() => this.onChecked(value.id)}
                onDelete={() => this.onDelete(value)}
                onEdit={() => this.onEdit(value)}
                />     
            ))} 
            {isLoading && <Table.Loading nama="kelas" /> } 
            {data.length === 0 && !isLoading && <Table.Empty nama="kelas" /> }
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
          onClick={() => this.singleDelete(singleData.id)}
        />
        <AddModal show={showAdd}
            height="200px"
            width="400px" 
            title="Menambahkan kelas" 
            close={() => this.setState({showAdd:false})}        
            onClick={() => this.tambahkan()}
        >
          <div className="w-100 pa3">
            <label className="f5 fw4 db mb2">Nama kelas</label>
            <InputText name="kelas" placeholder="ketik disini" onChange={this.handleInputChange} />                      
          </div>
        </AddModal>
        <EditModal
          show={showEdit}
          height="200px"
          width="400px" 
          title="Mengubah data kelas" 
          close={() => this.setState({showEdit:false})}        
          onClick={() => this.ubahData()}
        >
          <div className="w-100 pa3">
            <label className="f5 fw4 db mb2">Nama kelas</label>
            <InputText value={singleData.nama} placeholder="ketik disini" onChange={this.handleEditChange}/>                      
          </div>
        </EditModal>
      </>      
      )}
      <ToastContainer />        
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
      this.fetchData(this.kelasID);
    }    
  }  
  handleKeyPress = (event) => {   
    const {cari} = this.state;    
    if (event.key === 'Enter' && cari != undefined) {
        this.fetchData(this.kelasID);
    }
  }
  resetCari = () => {
    this.setState({cari: undefined},() => this.fetchData(this.kelasID));
  }
  /*--- Select jumlah data ---*/
  handleSelectChange = (event) => {    
    this.setState({total: event.target.value,page:1,selected:[]},() => this.fetchData(this.kelasID));
  } 
  /*--- pagination ---*/
  pilihPagination = (nomor) =>{    
    this.setState({page: nomor},() => this.fetchData(this.kelasID));
  }
  /*--- fetch data ---*/
  fetchData = (id) => { 
    const {page,total,cari} = this.state;
    this.setState({isLoading:true});
    axios.get(
      window.location.origin + `/api/pendidik/sekolah/tingkatan/kelas/${id}?`+ `${total ? 'total=' + total : ''}` + `${page ? '&page=' + page : ''}`+ `${cari ? '&cari=' + cari : ''}` +"&nocache="+Date.now()
    ).then(response => {      
      this.setState({
        data:response.data.message.data,
        totalData:response.data.message.totaldata,        
        currPage:response.data.message.current,
        pages:response.data.message.pages,  
        tingkatanNama:response.data.message.tingkatan,
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
    const {kelas} = this.state;
    var formData = new FormData();
    formData.append('nama', kelas );
    axios({
      method: 'post',
      url: window.location.origin +'/api/pendidik/sekolah/tingkatan/kelas/'+this.kelasID,
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        this.setState({showAdd:false,page:1},() => this.fetchData(this.kelasID));        
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
  /*--- Edit Data ---*/
  onEdit = (data) => {
    this.setState({showEdit:true,singleData:data})
  }
  ubahData = () => {
    const {singleData} = this.state;
    var formData = new FormData();
    formData.append('id', singleData.id );
    formData.append('nama', singleData.nama );
    axios({
      method: 'patch',
      url: window.location.origin +'/api/pendidik/sekolah/tingkatan/kelas/'+this.kelasID,
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        this.setState({showEdit:false},() => this.fetchData(this.kelasID));        
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
  /*--- Hapus single data ---*/
  onDelete = (data) => {
    this.setState({showSingleDelete:true,singleData:data})
  }
  singleDelete = (id) => {    
    var formData = new FormData();
    formData.append('delete', id);    
    axios({
      method: 'delete',
      url: window.location.origin +'/api/pendidik/sekolah/tingkatan/kelas/'+this.kelasID,
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        this.setState({showSingleDelete:false},() => this.fetchData(this.kelasID));        
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
      url: window.location.origin +'/api/pendidik/sekolah/tingkatan/kelas/'+this.kelasID,
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        this.setState({showDelete:false,selected:[]},() => this.fetchData(this.kelasID));        
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

export default PageSekolahKelasSub;