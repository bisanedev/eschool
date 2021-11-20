import React from 'react';
import { useLocation } from "react-router";

function Page404() {     
    let location = useLocation();
    return (
      <section className="vh-100 dt w-100">
        <div className="dtc v-mid tc ph3 ph4-l">
        <header className="tc ph5 flex flex-column">
            <span className="f1 f-headline-l code mb2 fw9 dib tracked-tight primary" style={{fontSize:"120px"}}>404</span>
            <span className="tc f1-l fw1 bg-white pa2" style={{fontSize:"28px"}}>Halaman <code>{location.pathname}</code> yang kamu cari tidak ditemukan.</span>
        </header>
        <p className="fw1 i tc mt3 f4 f3-l">Apakah Anda mencari salah satunya? </p>
        <ul className="list tc pl0 w-100 mt3">
          <li className="dib"><a className="f5 f4-ns link black db pv2 ph3 hover-primary" href="#/">Beranda</a></li>
          <li className="dib"><a className="f5 f4-ns link black db pv2 ph3 hover-primary" href="#/login">Login</a></li> 
        </ul>
        </div>
      </section>
    );    
}

export default Page404;