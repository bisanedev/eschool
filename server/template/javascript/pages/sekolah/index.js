import React from "react";
import {withRouter} from "react-router";
import { Helmet } from "react-helmet";
import jwt_decode from "jwt-decode";
import Forbidden from "../other/forbidden";
import Breadcrumb from '../../components/breadcrumb';
import MenuCard from '../../components/cards/menuCards';

class PageSekolah extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        tokenData:""
    }    
  }

  componentDidMount() {
    const authData = window.localStorage.getItem('userToken');
    this.setState({tokenData:jwt_decode(authData)});
  }

  render() { 
    const {tokenData} = this.state;
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
          <Breadcrumb homeUrl="/" homeIcon={<div className="material-icons-outlined">school</div>} homeText="Sekolah">            
            <li className="breadcrumb-item active" aria-current="page">Beranda</li>
          </Breadcrumb>
        </div>        
        <div className="container">
        <div className="row">        
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