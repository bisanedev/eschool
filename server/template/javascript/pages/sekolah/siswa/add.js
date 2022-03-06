import React from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import Forbidden from "../../other/forbidden";
import { Breadcrumb } from '../../../components/menu';
import { InputText,InputPassword,Cards } from '../../../components/forms';
import { toast } from 'react-toastify';
import { DropdownList } from 'react-widgets';
import Cropper from "react-cropper";

class PageSekolahSiswaAdd extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      nama:"",
      jenis:"l",
      src: "",
      errorSelect:"",
      croppedImageUrl:"",            
      kelas:"", 
      noAbsen:"",     
      username:"",
      password:"",
      rePassword:"",
      kelasData:[],      
      uploadProgress:false,
      uploadDisable:false,
      errorNama:"",
      errorKelas:"",
      errorNoAbsen:"",
      errorUsername:"",
      errorPassword:"",
      errorRepassword:""
    }
    this.handleInputChange = this.handleInputChange.bind(this);  
    this.cropper = React.createRef();   
    this.navigate = this.props.navigate; 
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.fetchKelas(),300);       
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() { 
    const {tokenData} = this.props;
    const {jenis,kelasData,username,kelas,noAbsen,isLoading,src,croppedImageUrl,errorSelect,uploadProgress,uploadDisable,errorNama,errorKelas,errorNoAbsen,errorUsername,errorPassword,errorRepassword} = this.state; 
    let foto = <img src={jenis === "l" ? "assets/images/cowok.png":"assets/images/cewek.png"} />;  
    const uploadClass = uploadProgress ? "progress-active":"";   
    var NomorAbsens = []; 
    for (var x = 0; x < 100; x++) {
      NomorAbsens[x] = {id: x+1 , nomor: "Nomor "+(x+1)};
    }
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
            <li><a href="#/sekolah/siswa/add"><span>Siswa baru</span></a></li>            
          </Breadcrumb>     
        </div>
        <div className="mw9 center cf ph3 mb3">
          <Cards title="Menambahkan informasi siswa baru" bodyClass="flex">
            <div className="w-70 pa3">
              <div className="w-100 mb3 flex">
                <div className="w-70">
                    <label className="f5 fw4 db mb2">Nama lengkap</label>
                    <InputText name="nama" placeholder="ketik nama lengkap disini" onChange={this.handleInputChange} errorMessage={errorNama}/>
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
                <DropdownList filter='contains' data={kelasData} containerClassName={errorKelas !="" ? "error":""} value={kelas} onChange={value => this.handleSelectKelas(value)} textField="nama" dataKey="id" placeholder="Pilih kelas"/>
                {errorKelas != "" && (
                  <span className="pesan-error">{errorKelas}</span>
                )}
                </div>
                <div className="w-50 ml2">                
                <label className="f5 fw4 db mb2">No urut absen</label>  
                <DropdownList filter='contains' data={NomorAbsens} containerClassName={errorNoAbsen !="" ? "error":""} value={noAbsen} onChange={value => this.handleSelectAbsen(value)} textField="nomor" dataKey="id" placeholder="Pilih nomor"/>
                {errorNoAbsen != "" && (
                  <span className="pesan-error">{errorNoAbsen}</span>
                )}
                </div>
              </div>            
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Username / NISN (Nomor Induk Siswa Nasional)</label>
                <InputText name="username" value={username} placeholder="ketik username yang di inginkan disini" onChange={this.handleInputChange} errorMessage={errorUsername}/>
              </div>
              <div className="w-100 mb3 flex">
                <div className="w-50">
                    <label className="f5 fw4 db mb2">Password</label>
                    <InputPassword name="password" onChange={this.handleInputChange} errorMessage={errorPassword}/> 
                </div>
                <div className="w-50 ml2">
                    <label className="f5 fw4 db mb2">Ketik ulang password</label>
                    <InputPassword name="rePassword" onChange={this.handleInputChange} errorMessage={errorRepassword}/>   
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
                ):foto}      
              </div>
              <button type="submit" style={{cursor: "pointer"}} className={`${uploadClass} dim w-100 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary`} disabled={uploadDisable} onClick={this.newUserPendidik}>Tambahkan</button>
            </div>                  
          </Cards>
        </div>                              
        </>
        )}
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
      imageSmoothingEnabled: true,
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
  /*--- select kelas ---*/
  handleSelectKelas = (value) => {
    this.setState({kelas:value.id},() => this.fetchCountKelas(value.id));
  }
  /*--- select nomor ---*/
  handleSelectAbsen = (value) => {
    this.setState({noAbsen:value.id}); 
  }
  /*--- auto count absensi ---*/
  fetchCountKelas = (id) => {    
    axios.get(
      window.location.origin + `/api/pendidik/sekolah/siswa/countkelas/`+id+"&nocache="+Date.now()
    ).then(response => {      
      this.setState({noAbsen:response.data.message + 1});
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
  /*--- post new user ----*/
  newUserPendidik = () => {         
    const {nama,jenis,kelas,noAbsen,username,password,rePassword,croppedImageUrl,src} = this.state;
    this.setState({uploadProgress:true,uploadDisable:true,errorNama:"",errorKelas:"",errorNoAbsen:"",errorUsername:"",errorPassword:"",errorRepassword:""});
    var formData = new FormData();
    if(src != null && src != "" && croppedImageUrl != ""){
      var blobFile = this.b64toBlob(croppedImageUrl); 
      formData.append('file',blobFile);
    }    

    formData.append('nama', nama);
    formData.append('jenis', jenis);    
    formData.append('kelas', kelas);
    formData.append('absen', noAbsen);
    formData.append('username', username);      
    formData.append('password', password);
    formData.append('rePassword', rePassword);      
    
    axios({
        method: 'post',
        url: '/api/pendidik/sekolah/siswa',
        data: formData
    }).then(response => {                 
        if(response.data.status == true)
        {            
          toast.success("Data "+nama+" berhasil ditambahkan");                               
          this.navigate("/sekolah/siswa"); 
        }
    }).catch(error => {                   
      if(error.response.status == 400){   
        this.setState({uploadProgress:false,uploadDisable:false},() => {          
          if(error.response.data.message["nama"]){   
            this.setState({errorNama:error.response.data.message["nama"]}); 
          }
          if(error.response.data.message["username"]){   
            this.setState({errorUsername:error.response.data.message["username"]}); 
          }
          if(error.response.data.message["password"]){   
            this.setState({errorPassword:error.response.data.message["password"]}); 
          }
          if(error.response.data.message["rePassword"]){   
            this.setState({errorRepassword:error.response.data.message["rePassword"]}); 
          }
          if(error.response.data.message["kelas"]){   
            this.setState({errorKelas:error.response.data.message["kelas"]}); 
          }
          if(error.response.data.message["absen"]){   
            this.setState({errorNoAbsen:error.response.data.message["absen"]}); 
          }
        });        
      }  
      if(error.response.status == 401){
        this.logout();
      }                    
      if(error.message === "Network Error"){ 
        toast.error("Jaringan internet tidak tersambung");                    
      }     
    });
  }

  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];     
    this.navigate("/", { replace: true });
  }
  // ---------------------------- end of script
}

export default PageSekolahSiswaAdd;