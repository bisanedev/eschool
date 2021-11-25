import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Forbidden from "../../other/forbidden";
import { Breadcrumb } from '../../../components/menu';
import { InputText,InputPassword,Cards,Switcher } from '../../../components/forms';
import {DeleteDialog} from '../../../components/dialog';
import { ToastContainer, toast } from 'react-toastify';
import Cropper from "react-cropper";

class PageSekolahSiswaEdit extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      id:"",
      nama:"",
      noAbsen:"",
      foto:false,
      jenis:"l",
      src: "",
      errorSelect:"",
      croppedImageUrl:"",            
      kelas:"",      
      username:"",
      rawUsername:"",
      password:"",
      rePassword:"",
      kelasData:[],
      superuser:false,
      uploadProgress:false,
      uploadDisable:false,  
      showHapusFoto:false,         
    }
    this.handleInputChange = this.handleInputChange.bind(this);  
    this.cropper = React.createRef(); 
    this.userID = this.props.params.userID;  
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
    const {jenis,kelasData,kelas,noAbsen,nama,username,superuser,isLoading,src,croppedImageUrl,errorSelect,uploadProgress,uploadDisable,rawUsername,showHapusFoto,foto} = this.state;    
    const uploadClass = uploadProgress ? "progress-active":"";  
    const NomorAbsens = Array(40).fill(1).map((x, y) => x + y);  
    return (
    <>  
    <div className="konten"> 
        <Helmet>
          <title>Siswa - Nama Sekolah</title>
        </Helmet>
        {!tokenData.superuser ? (<Forbidden location={this.props.location}/>):(
        <>   
        <div className="headings">    
          <div className="title">Siswa</div>
          <div className="subtitle">Halaman informasi untuk siswa</div>          
          <Breadcrumb homeUrl="/sekolah" homeText="Sekolah">
            <li><a href="#/sekolah/siswa"><span>Siswa</span></a></li>   
            <li><a href={"#/sekolah/siswa/edit/"+this.userID}><span style={{textTransform:"capitalize"}}>{rawUsername === "" ? "memuat":rawUsername}</span></a></li>            
          </Breadcrumb>     
        </div>
        <div className="mw9 center cf ph3 mb3">
          <Cards title="Mengubah informasi siswa" bodyClass="flex">
            <div className="w-70 pa3">
              <div className="w-100 mb3 flex">
                <div className="w-70">
                  <label className="f5 fw4 db mb2">Nama lengkap</label>
                  <InputText name="nama" value={nama} placeholder="ketik nama lengkap disini" onChange={this.handleInputChange}/>
                </div>
                <div className="w-30 ml2">
                  <label className="f5 fw4 db mb2">Jenis kelamin</label>
                  <select className="pa2 db w-100" value={jenis} onChange={this.handleSelectJenis}>
                    <option label="Laki-laki" value="l"/>
                    <option label="Perempuan" value="p"/>
                  </select>
                </div>
              </div>
              <div className="w-100 mb3 flex">
                <div className="w-50">
                <label className="f5 fw4 db mb2">Kelas</label>
                {isLoading && (
                <header className="ph5 flex flex-column justify-center items-center"> 
                  <div className="loader mb3"></div>
                  <span className="dib flex items-center">
                      Memuat data kelas
                  </span>
                </header> 
                )}
                <select className="pa2 db w-100" value={kelas} onChange={this.handleSelectKelas}>
                <option value="100" disabled>Pilih kelas</option>
                  {kelasData.length > 0 && !isLoading && kelasData.map((value,k) => (
                    <option key={k} label={value.nama} value={value.id}/>                    
                  ))}
                </select>   
                </div>
                <div className="w-50 ml2">
                <label className="f5 fw4 db mb2">No urut absen</label>  
                <select className="pa2 db w-100" value={noAbsen} onChange={this.handleSelectAbsen}>
                <option value="100" disabled>Pilih nomor</option>
                  {NomorAbsens.map((value,k) => (
                    <option key={k} label={"Nomor "+value} value={value}/>                    
                  ))}
                </select>   
                </div>
              </div> 
              <div className="w-100 mb3">                
                <label className="f5 fw4 db mb2">Username</label>
                <InputText name="username" value={username} placeholder="ketik username yang di inginkan disini" onChange={this.handleInputChange}/>
              </div>
              <div className="w-100 mb3 flex">
                <div className="w-50">
                  <label className="f5 fw4 db mb2">Password (Opsional)</label>
                  <InputPassword name="password" onChange={this.handleInputChange}/>
                </div>
                <div className="w-50 ml2">
                  <label className="f5 fw4 db mb2">Ketik ulang password (Opsional)</label>
                  <InputPassword name="rePassword" onChange={this.handleInputChange}/> 
                </div>              
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Foto profil (Opsional)</label>
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
              <div className="mb3 pa2 " style={{border:"3px dashed rgba(0, 0, 0, 0.125)"}}>
                {croppedImageUrl ? (                  
                  <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />                                   
                ):( 
                  foto ?                  
                  <div className="relative">
                    <div className="link dim deleteFotoButton" onClick={() => this.setState({showHapusFoto:true})}>
                      <i className="material-icons-outlined" style={{fontSize: "14px"}}>close</i>
                    </div>
                    <img src={"data/siswa/"+rawUsername+".jpg?nocache="+Date.now()}/>
                  </div>
                  :
                  <img src={jenis==="l" ? "assets/images/cowok.png":"assets/images/cewek.png"}/> 
                )}
              </div>
              <button type="submit" style={{cursor: "pointer"}} className={`${uploadClass} dim w-100 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary`} disabled={uploadDisable} onClick={this.updateSiswa}>Ubah data</button>
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
    if(name === "username"){
      this.setState({ [name]: value.split(" ").join("")});
    }else{
      this.setState({ [name]: value});
    }    
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
  /*--- Select jenis ---*/
  handleSelectJenis = (event) => {    
    this.setState({jenis: event.target.value});
  }   
  /*--- select kelas ---*/
  handleSelectKelas = (event) => {
    this.setState({kelas:event.target.value});                
  }
  /*--- select nomor ---*/
  handleSelectAbsen = (event) => {
    this.setState({noAbsen:event.target.value}); 
  }
  /*--- fetch data ---*/
  fetchData = () => {     
    axios.get(
      window.location.origin + `/api/pendidik/sekolah/siswa/view/`+this.userID+"&nocache="+Date.now()
    ).then(response => { 
    var data = response.data.message.data;         
      this.setState({
        id:data.id,
        nama:data.nama,
        jenis:data.jenis,                 
        kelas:data.kelas_id,
        foto:data.foto, 
        noAbsen:data.no_absens,  
        username:data.username, 
        rawUsername:data.username        
      },() => this.fetchKelas());
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /* fetch kelas nama */
  fetchKelas = () => {
    this.setState({isLoading:true});
    axios.get(
      window.location.origin + `/api/pendidik/sekolah/siswa/kelas?total=200`+"&nocache="+Date.now()
    ).then(response => {      
      this.setState({
        kelasData:response.data.message,      
        isLoading:false
      });
    }).catch(error => {
      if(error.response.status == 401){                             
        this.logout();
      }
    });
  }
  /*--- patch edit the user ----*/
  updateSiswa = () => {         
    const {nama,jenis,kelas,noAbsen,username,password,rePassword,superuser,croppedImageUrl,src,rawUsername} = this.state;
    var formData = new FormData();
    this.setState({uploadProgress:true,uploadDisable:true});
    if(src != null && src != "" && croppedImageUrl != ""){
      var blobFile = this.b64toBlob(croppedImageUrl); 
      formData.append('file',blobFile);
    }

    formData.append('id', this.userID);
    formData.append('nama', nama);
    formData.append('jenis', jenis);    
    formData.append('kelas', kelas);
    formData.append('absen', noAbsen);
    formData.append('username', username);
    formData.append('lastUsername', rawUsername);          
    formData.append('password', password);
    formData.append('rePassword', rePassword);      
    
    axios({
        method: 'post',
        url: '/api/pendidik/sekolah/siswa/edit/'+this.userID,
        data: formData
    }).then(response => {                 
        if(response.data.status == true)
        {                      
          this.navigate("/sekolah/siswa");                     
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
      url: window.location.origin +'/api/pendidik/sekolah/siswa/foto/'+rawUsername,
      data: formData
    }).then(response => {
      if(response.data.status == true)
      {        
        this.navigate("/sekolah/siswa");      
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
    this.navigate("/", { replace: true });
  }
  // ---------------------------- end of script
}

export default PageSekolahSiswaEdit;