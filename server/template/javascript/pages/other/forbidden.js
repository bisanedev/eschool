import React from 'react';
import { useLocation } from "react-router";

function Forbidden() {
  let location = useLocation();
  return (    
    <section className="vh-100 dt w-100">
      <div className="dtc v-mid tc ph3 ph4-l">
      <header className="tc ph5 flex flex-column">
          <span className="f1 f-headline-l code mb2 fw9 dib tracked-tight primary" style={{fontSize:"120px"}}>403</span>
          <span className="tc f1-l fw1 bg-white pa2" style={{fontSize:"28px"}}>Akses halaman <code>{location.pathname}</code> tidak diperbolehkan.</span>
      </header>
      <p className="fw1 i tc mt3 f4 f3-l">Hanya untuk pengguna akses superuser ! </p>        
      </div>
    </section> 
  );
}

export default Forbidden;