import React from 'react';
import { useLocation , useNavigate} from "react-router";
import { Link } from "react-router-dom";

function Page404() {     
    let location = useLocation();
    let navigate = useNavigate();
    const goBack = () => {          
      navigate(-1)
  }
    return (
      <section className="vh-100 dt w-100">
        <div className="dtc v-mid tc ph3 ph4-l">
        <header className="tc ph5 flex flex-column">
            <span className="f1 f-headline-l code mb2 fw9 dib tracked-tight primary" style={{fontSize:"120px"}}>404</span>
            <span className="tc f1-l fw1 bg-white pa2" style={{fontSize:"28px"}}>Halaman <code>{location.pathname}</code> yang kamu cari tidak ditemukan.</span>
        </header>
        <p className="fw1 i tc mt3 f4 f3-l">Apakah anda mencari salah satunya? </p>
        <ul className="list tc pl0 w-100 mt3">                  
          <li className="dib">            
            <Link className="f5 f4-ns link black db pv2 ph3 hover-primary" to="/aplikasi">Aplikasi</Link>
          </li>
          <li className="dib">            
            <Link className="f5 f4-ns link black db pv2 ph3 hover-primary" to="/sekolah">Sekolah</Link>
          </li>
          <li className="dib">            
            <Link className="f5 f4-ns link black db pv2 ph3 hover-primary" to="/login">Login</Link>
          </li> 
        </ul>
        <button className="w4 tc f6 link dim br2 ba ph3 pv2 dib white bg-primary b--primary pointer" onClick={goBack}>Kembali</button>                
        </div>
      </section>
    );    
}

export default Page404;