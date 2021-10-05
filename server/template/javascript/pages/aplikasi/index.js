import React from 'react';
import {withRouter} from "react-router";
import { Helmet } from 'react-helmet';
import MenuCard from '../../components/cards/menuCards';
import MenuCardDisable from '../../components/cards/menuCardDisable';
import Breadcrumb from '../../components/breadcrumb';

class PageAplikasi extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      
    }    
  }

  componentDidMount() {     
    
  }

  render() {
    const {tokenData} = this.props;
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Aplikasi - Nama Sekolah</title>
        </Helmet>
        <div className="headings">
          <div className="title">Aplikasi</div>
          <div className="subtitle">Halaman aplikasi penunjang sekolah & belajar</div>
          <Breadcrumb homeUrl="/" homeIcon={<div className="material-icons-outlined">apps</div>} homeText="Aplikasi">            
            <li className="breadcrumb-item active" aria-current="page">Beranda</li>
          </Breadcrumb>
        </div>        
        <div className="container">
        <div className="row">        
          <MenuCard url="/quiz" icon="assets/images/menuButton.png" text="Kuis platform"/>
          <MenuCard url="/absensi" icon="assets/images/menuButton.png" text="Absensi"/>
          <MenuCard url="/ebook" icon="assets/images/menuButton.png" text="Buku Elektronik"/>
          {tokenData.superuser ? (
            <MenuCard url="/pengumuman" superuser={tokenData.superuser} icon="assets/images/menuButton.png" text="Pengumuman"/>
          ):(
            <MenuCardDisable icon="assets/images/menuButton.png" text="Pengumuman"/>
          )}          
          <MenuCard url="/analisis" icon="assets/images/menuButton.png" text="Analisis"/>
          {tokenData.superuser ? (
            <MenuCard url="/permainan" icon="assets/images/menuButton.png" text="Permainan"/>
          ):(
            <MenuCardDisable icon="assets/images/menuButton.png" text="Permainan"/>
          )}
          <MenuCard url="/mandiri" icon="assets/images/menuButton.png" text="Belajar mandiri"/>       
        </div>
        </div>
    </div>
    );
  }
  // ---------------------------- script 
  
  // ---------------------------- end of script
}

export default withRouter(PageAplikasi);