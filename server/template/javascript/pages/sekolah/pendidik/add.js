import React from 'react';
import axios from 'axios';
import { withRouter } from "react-router";
import { Helmet } from 'react-helmet';
import Forbidden from "../../other/forbidden";
import { Breadcrumb } from '../../../components/menu';
import { InputText,InputPassword,Cards,Switcher } from '../../../components/forms';
import { ToastContainer, toast } from 'react-toastify';
import Cropper from "react-cropper";

class PageSekolahPendidikAdd extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      nama:"",
      jenis:"pria",
      src: "",
      errorSelect:"",
      croppedImageUrl:"",            
      mapel:[],      
      username:"",
      password:"",
      rePassword:"",
      mapelData:[],
      superuser:false,
      uploadProgress:false,
      uploadDisable:false,       
    }
    this.handleInputChange = this.handleInputChange.bind(this);  
    this.cropper = React.createRef();    
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.fetchMapel(),300);       
  }
  
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() { 
    const {tokenData} = this.props;
    const {jenis,mapelData,superuser,isLoading,src,croppedImageUrl,errorSelect,uploadProgress,uploadDisable} = this.state; 
    let foto = <img src={jenis === "pria" ? "assets/images/cowok.png":"assets/images/cewek.png"} />;  
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
            <li><a href="#/sekolah/pendidik/add"><span>Users & pendidik baru</span></a></li> 
            <li><a href="#"><span>Menambahkan data</span></a></li>  
          </Breadcrumb>     
        </div>
        <div className="mw9 center cf ph3 mb3">
          <Cards title="Masukan informasi users & pendidik baru" bodyClass="flex">
            <div className="w-70 pa3">
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Nama lengkap</label>
                <InputText name="nama" placeholder="ketik nama lengkap disini" onChange={this.handleInputChange}/>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Jenis kelamin</label>
                <select className="pa2 db w-30" value={jenis} onChange={this.handleSelectJenis}>
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
                  <label key={k} className="checkbox-container mr4 mb3" style={{color:value.color}}>{value.nama}                    
                    <input type="checkbox" onChange={() => this.handleMapelChecked(value.id)}/>
                    <span className="checkmark"></span>
                  </label>  
                ))}
                </div>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Superuser akses</label>
                <Switcher value={superuser} yesClick={() => this.setState({superuser:true})} noClick={() => this.setState({superuser:false})} yesLabel="Aktif" noLabel="Tidak"/>
              </div>
              <div className="w-100 mb3">
                <label className="f5 fw4 db mb2">Username</label>
                <InputText name="username" placeholder="ketik username yang di inginkan disini" onChange={this.handleInputChange}/>
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
              <button type="submit" style={{cursor: "pointer"}} className={`${uploadClass} dim w-100 tc b f7 link br2 ba ph3 pv2 dib white bg-primary b--primary mb3`} disabled={uploadDisable} onClick={this.newUserPendidik}>Tambahkan</button>              
              <div className="mb3 pa2 " style={{border:"3px dashed rgba(0, 0, 0, 0.125)"}}>
                {croppedImageUrl ? (
                  <img alt="Crop" style={{ maxWidth: '100%' }} src={croppedImageUrl} />
                ):foto}      
              </div>                           
            </div>                  
          </Cards>
        </div>                              
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
  /*--- post new user ----*/
  newUserPendidik = () => {         
    const {nama,jenis,mapel,username,password,rePassword,superuser,croppedImageUrl,src} = this.state;
    var formData = new FormData();
    this.setState({uploadProgress:true,uploadDisable:true});
    if(src != null && src != "" && croppedImageUrl != ""){
      var blobFile = this.b64toBlob(croppedImageUrl); 
      formData.append('file',blobFile);
    }    

    formData.append('nama', nama);
    formData.append('jenis', jenis);    
    formData.append('mapel_id', JSON.stringify(mapel));
    formData.append('username', username);      
    formData.append('password', password);
    formData.append('rePassword', rePassword);
    formData.append('superuser', superuser);    
    
    axios({
        method: 'post',
        url: '/api/pendidik/sekolah/users',
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

  logout = () => {   
    window.localStorage.clear();
    delete axios.defaults.headers.common['Authorization']; 
    this.props.history.push('/');
  }
  // ---------------------------- end of script
}

export default withRouter(PageSekolahPendidikAdd);