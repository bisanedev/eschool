import React from "react";
import {withRouter} from "react-router";
import { Helmet } from "react-helmet";
import Forbidden from "../other/forbidden";
import Breadcrumb from '../../components/breadcrumb';
import MenuCard from '../../components/cards/menuCards';

class PageSekolah extends React.Component{

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
        <title>Sekolah - Nama Sekolah</title>
      </Helmet>
      {!tokenData.superuser ? (<Forbidden location={this.props.location}/>):(
      <>
        <div className="headings">
          <div className="title">Sekolah</div>
          <div className="subtitle">Halaman data informasi sekolah</div>
          <Breadcrumb homeUrl="/sekolah" homeText="Sekolah">                                
            <li><a href="#"><span>Beranda</span></a></li>  
          </Breadcrumb>    
        </div>        
        <div className="mw9 center">
        <div className="cf ph2 flex flex-wrap">       
          <MenuCard url="/sekolah/kelas" icon="assets/images/menuButton.png" text="Kelas"/>
          <MenuCard url="/sekolah/semester" icon="assets/images/menuButton.png" text="Semester"/>
          <MenuCard url="/sekolah/mapel" icon="assets/images/menuButton.png" text="Mata pelajaran"/>    
          <MenuCard url="/sekolah/users" icon="assets/images/menuButton.png" text="Users & Pengajar"/>
          <MenuCard url="/sekolah/siswa" icon="assets/images/menuButton.png" text="Siswa"/>
        </div>
        </div>
      </>
      )}        
    </div>
    );
  }
  // ---------------------------- script 
  
  // ---------------------------- end of script
}

export default withRouter(PageSekolah);