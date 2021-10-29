import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import Forbidden from "../../other/forbidden";
import { Breadcrumb } from '../../../components/menu';
import { InputText,InputPassword,Cards } from '../../../components/forms';
import {DeleteDialog} from '../../../components/dialog';
import { ToastContainer, toast } from 'react-toastify';
import Cropper from "react-cropper";

class PageSekolahPendidikEdit extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      id:"",
      nama:"",
      foto:false,
      jenis:"pria",
      src: "",
      errorSelect:"",
      croppedImageUrl:"",            
      mapel:[],      
      username:"",
      rawUsername:"",
      password:"",
      rePassword:"",
      mapelData:[],
      superuser:false,
      uploadProgress:false,
      uploadDisable:false,  
      showHapusFoto:false,         
    }
    this.handleInputChange = this.handleInputChange.bind(this);  
    this.cropper = React.createRef(); 
    this.userID = this.props.match.params.userID;   
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.fetchData(),300);       
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() { 
    const {tokenData} = this.props;
    const {jenis,mapelData,mapel,nama,username,superuser,isLoading,src,croppedImageUrl,errorSelect,uploadProgress,uploadDisable,rawUsername,showHapusFoto,foto} = this.state;
    //let foto = <img src={"data/users/"+rawUsername+".jpg?nocache="+Date.now()} onError={(e)=>{e.target.onerror = null;e.target.src=jenis==="pria" ? "assets/images/cowok.png":"assets/images/cewek.png"}} />;    
    const uploadClass = uploadProgress ? "progress-active":"";    
    return (
    <>  
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
            <li><a href="#/sekolah/pendidik"><span>Users & pendidik</span></a></li>   
            <li><a href={"#/sekolah/pendidik/edit/"+this.userID}><span>Merubah data</span></a></li> 
            <li><a href="#"><span>Users & pendidik</span></a></li>  
          </Breadcrumb>     
        </div>
        <div className="mw9 center cf ph3 mb3">
          <Cards title="Merubah informasi users & pendidik" bodyClass="flex">
            <div className="w-70 pa3">
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Nama lengkap</label>
                <InputText name="nama" value={nama} placeholder="ketik nama lengkap disini" onChange={this.handleInputChange}/>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Jenis kelamin</label>
                <select className="pa2 db w-100" value={jenis} onChange={this.handleSelectJenis}>
                  <option label="Pria" value="pria"/>
                  <option label="Perempuan" value="perempuan"/>
                </select>                
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Mata Pelajaran</label>
                {isLoading && (
                <header className="ph5 flex flex-column justify-center items-center"> 
                  <div className="loader mb3"></div>
                  <span className="dib flex items-center">
                      Memuat data mata pelajaran
                  </span>
                </header> 
                )}
                <div className="flex flex-wrap pa3" style={{background:"#f3f3f3",border:"1px solid rgba(0, 0, 0, 0.125)"}}>
                {mapelData.length > 0 && !isLoading && mapelData.map((value,k) => (
                  <label key={k} className="checkbox-container mr4" style={{color:value.color}}>{value.nama}                    
                    <input type="checkbox" value={mapel[mapel.indexOf(value.id)]} checked={mapel.indexOf(value.id) !== -1 ? true:false} onChange={() => this.handleMapelChecked(value.id)}/>
                    <span className="checkmark"></span>
                  </label>  
                ))}
                </div>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Superuser akses</label>
                <div className="toggle"> 
                  <label className="switch" htmlFor="checkbox" onClick={() => this.handleSwitchChangeSuperuser()}>
                    <input type="checkbox" checked={superuser} value={superuser} onChange={(e) => console.log(e.target.value)} />
                    <div className="slider round"></div>
                  </label>                                   
                </div>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Username</label>
                <InputText name="username" value={username} placeholder="ketik username yang di inginkan disini" onChange={this.handleInputChange}/>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Password</label>
                <InputPassword name="password" onChange={this.handleInputChange}/>                
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Ketik ulang password</label>
                <InputPassword name="rePassword" onChange={this.handleInputChange}/>                
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Foto profil</label>
                <div className="flex justify-between mb3">
                  <input className="link br2 ba ph3 pv2 dib black bg-light-gray ba b--light-silver " type="file" accept="image/*" onChange={this.onSelectFile}/>
                  <button type="submit" style={{cursor: "pointer"}} className="link dim br2 ba pa2 dib bg-white" onClick={() => this.setState({croppedImageUrl:"",src:""})}>
                    Reset
                  </button>
                </div>                
                {src != null && src != "" && (
                  <Cropper
                      src={src}
                      style={{ height: 500, width: "100%" }}                      
                      initialAspectRatio={3 / 4}
                      minCropBoxWidth={255}    
                      minCropBoxHeight={330}
                      guides={false}
                      crop={this._crop.bind(this)}
                      onInitialized={this.onCropperInit.bind(this)} 
                      ref={this.cropper}
                      cropBoxResizable={false}
                      dragMode={'move'}                     
                  />
                )}
                {src === null && (
                  <h5 className="p-5" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>{errorSelect}</h5>
                )}
              </div>              
            </div>
            <div className="w-30 pa3">              
              <button type="submit" style={{cursor: "pointer"}} className={`${uploadClass} w-100 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary mb3`} disabled={uploadDisable} onClick={this.updateUserPendidik}>Ubah data</button>              
              <div className="mb3 pa2 " style={{border:"3px dashed rgba(0, 0, 0, 0.125)"}}>
                {croppedImageUrl ? (                  
                  <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />                                   
                ):( 
                  foto ?                  
                  <div className="relative">
                    <div className="link dim deleteFotoButton" onClick={() => this.setState({showHapusFoto:true})}>
                      <i className="fas fa-times" style={{fontSize: "11px"}}/>
                    </div>
                    <img src={"data/users/"+rawUsername+".jpg?nocache="+Date.now()}/>
                  </div>
                  :
                  <img src={jenis==="pria" ? "assets/images/cowok.png":"assets/images/cewek.png"}/> 
                )}
              </div>                           
            </div>                  
          </Cards>
        </div> 
        <DeleteDialog show={showHapusFoto} 
          title="Hapus" subtitle={"Yakin hapus foto profil ??"} 
          close={() => this.setState({showHapusFoto:false})}        
          onClick={() => this.profileFotoDelete()}
        />                             
        </>
        )}
        <ToastContainer />
    </div>           
    </>
    );
  }
  // ---------------------------- script 
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;    
    this.setState({[name]: value});
  } 
  handleSwitchChangeSuperuser = () => {    
    const {superuser} =  this.state;    
    this.setState({superuser:!superuser});
  }
  _crop = () => {         
    const foto = this.cropper.getCroppedCanvas({
      width: 354,
      height: 472,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
    }).toDataURL(); 
    this.setState({croppedImageUrl:foto});
  }

  onCropperInit = (cropper) => {
    this.cropper = cropper;
  }

  b64toBlob(dataURI) {    
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
  } 

  onSelectFile = (e) => {
    let wow = this; 
    if (e.target.files && e.target.files.length > 0) {      
      const reader = new FileReader();   
      reader.addEventListener('load', () => {        
        var image = new Image();        
        image.src = reader.result;   
        image.addEventListener('load', function () {
          var height = this.height;
          var width = this.width;                 
          if (height >= 320 && width >= 260) {            
            wow.setState({ src: reader.result });                                    
          }else{            
            wow.setState({ src: null,croppedImageUrl:"",errorSelect:"Gambar foto dimensi minimal 320x260" }); 
          }
        });        
      });
      reader.readAsDataURL(e.target.files[0]);   
    }
  };
  /*--- Select jumlah data ---*/
  handleSelectJenis = (event) => {    
    this.setState({jenis: event.target.value});
  } 
  /*--- multiselect mata pelajaran ---*/
  handleMapelChecked = (id) => {
    const {mapel} =  this.state;    
    var index = mapel.indexOf(id);             
    if (index !== -1) {      
      mapel.splice(index, 1);
      this.setState({mapel});
    }else{      
      mapel.push(id);
      this.setState({mapel});      
    }                 
  }
  /*--- fetch data ---*/
  fetchData = () => {     
    axios.get(
      window.location.origin + `/api/pendidik/sekolah/users/view/`+this.userID+"&nocache="+Date.now()
    ).then(response => { 
    var data = response.data.message;         
      this.setState({
        id:data.id,
        nama:data.nama,
        jenis:data.jenis,                 
        mapel:data.mapel_id,
        foto:data.foto,   
        username:data.username, 
        rawUsername:data.username,        
        superuser:data.superuser
      },() => this.fetchMapel());
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /* fetch mata pelajaran */
  fetchMapel = () => {
    this.setState({isLoading:true});
    axios.get(
      window.location.origin + `/api/pendidik/sekolah/mapel?total=200`+"&nocache="+Date.now()
    ).then(response => {      
      this.setState({
        mapelData:response.data.message.data,      
        isLoading:false
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /*--- patch edit the user ----*/
  updateUserPendidik = () => {         
    const {nama,jenis,mapel,username,password,rePassword,superuser,croppedImageUrl,src,rawUsername} = this.state;
    var formData = new FormData();
    this.setState({uploadProgress:true,uploadDisable:true});
    if(src != null && src != "" && croppedImageUrl != ""){
      var blobFile = this.b64toBlob(croppedImageUrl); 
      formData.append('file',blobFile);
    }

    formData.append('id', this.userID);
    formData.append('nama', nama);
    formData.append('jenis', jenis);    
    formData.append('mapel_id', JSON.stringify(mapel));
    formData.append('username', username);
    formData.append('lastUsername', rawUsername);          
    formData.append('password', password);
    formData.append('rePassword', rePassword);
    formData.append('superuser', superuser ? "1":"0");    
    
    axios({
        method: 'post',
        url: '/api/pendidik/sekolah/users/edit/'+this.userID,
        data: formData
    }).then(response => {                 
        if(response.data.status == true)
        {                                
          this.props.history.push('/sekolah/pendidik');
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
  //---- delete profile
  profileFotoDelete = () => { 
    const {rawUsername} = this.state;       
    var formData = new FormData();
    formData.append('delete', this.userID);    
    axios({
      method: 'delete',
      url: window.location.origin +'/api/pendidik/sekolah/users/foto/'+rawUsername,
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        this.props.history.push('/sekolah/pendidik');     
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
  //---
  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization']; 
    this.props.history.push('/');
  }
  // ---------------------------- end of script
}

export default withRouter(PageSekolahPendidikEdit);