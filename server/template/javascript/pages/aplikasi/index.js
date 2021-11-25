import React from 'react';
import { Helmet } from 'react-helmet';
import {MenuCard,MenuCardDisable} from '../../components/menu';

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
        </div>        
        <div className="mw9 center">
        <div className="cf ph3 mb3 flex flex-wrap">
          <MenuCard url="/aplikasi/quiz" icon="assets/images/menuButton.png" text="Kuis platform"/>
          <MenuCard url="/aplikasi/absensi" icon="assets/images/menuButton.png" text="Absensi"/>
          <MenuCard url="/aplikasi/ebook" icon="assets/images/menuButton.png" text="Buku Elektronik"/>
          {tokenData.superuser ? (
            <MenuCard url="/aplikasi/pengumuman" superuser={tokenData.superuser} icon="assets/images/menuButton.png" text="Pengumuman"/>
          ):(
            <MenuCardDisable icon="assets/images/menuButton.png" text="Pengumuman"/>
          )}          
          <MenuCard url="/aplikasi/analisis" icon="assets/images/menuButton.png" text="Analisis siswa"/>
          {tokenData.superuser ? (
            <MenuCard url="/aplikasi/permainan" icon="assets/images/menuButton.png" text="Permainan"/>
          ):(
            <MenuCardDisable icon="assets/images/menuButton.png" text="Permainan"/>
          )}
          <MenuCard url="/aplikasi/mandiri" icon="assets/images/menuButton.png" text="Belajar mandiri"/>       
        </div>
        </div>
    </div>
    );
  }
  // ---------------------------- script 
  
  // ---------------------------- end of script
}

export default PageAplikasi;