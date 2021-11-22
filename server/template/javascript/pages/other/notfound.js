import React from 'react';
import { useLocation,useNavigate } from "react-router";

function NotFound() {     
    let location = useLocation();
    let navigate = useNavigate();

    const goBack = () => {            
        navigate(-1);
    }
    return (
      <section className="vh-100 dt w-100">
      <div className="dtc v-mid tc ph3 ph4-l">
      <header className="tc ph5 flex flex-column">
          <span className="f1 f-headline-l code mb2 fw9 dib tracked-tight primary" style={{fontSize:"120px"}}>404</span>
          <span className="tc f1-l fw1 bg-white pa2" style={{fontSize:"28px"}}>Halaman <code>{location.pathname}</code> yang kamu cari tidak ditemukan.</span>          
      </header>
      <p className="fw1 i tc mt3 f4 f3-l">Kembali ke halaman sebelumnya ya ! </p>
      <button className="w4 tc f6 link dim br2 ba ph3 pv2 dib white bg-primary b--primary pointer" onClick={goBack}>Kembali</button>        
      </div>
      </section>
    );    
}

export default NotFound;