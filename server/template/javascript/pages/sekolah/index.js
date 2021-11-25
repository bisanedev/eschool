import React from "react";
import { Helmet } from "react-helmet";
import Forbidden from "../other/forbidden";
import {MenuCard} from '../../components/menu';

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
        </div>        
        <div className="mw9 center">        
        <div className="cf ph3 mb3 flex flex-wrap">
          <MenuCard url="/sekolah/kelas" icon="assets/images/buttonIcon/kelas.png" text="Kelas"/>
          <MenuCard url="/sekolah/semester" icon="assets/images/buttonIcon/semester.png" text="Semester"/>
          <MenuCard url="/sekolah/mapel" icon="assets/images/buttonIcon/mapel.png" text="Mata pelajaran"/>    
          <MenuCard url="/sekolah/pendidik" icon="assets/images/buttonIcon/userManager.png" text="Users & Pendidik"/>
          <MenuCard url="/sekolah/siswa" icon="assets/images/buttonIcon/userManager.png" text="Siswa"/>
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

export default PageSekolah;