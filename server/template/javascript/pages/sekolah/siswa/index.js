import React from "react";
import {withRouter} from "react-router";
import { Helmet } from "react-helmet";
import Forbidden from "../../other/forbidden";
import {Breadcrumb} from "../../../components/menu";

class PageSekolahSiswa extends React.Component{

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
            <li><a href="#/sekolah/semester"><span>Mata pelajaran</span></a></li>                                 
            <li><a href="#"><span>Data mata pelajaran</span></a></li>  
          </Breadcrumb>    
        </div>                       
        <div className="mw9 center cf ph3 mb3">
 
        </div>        
      </>
      )}        
    </div>
    );
  }
  // ---------------------------- script 
  
  // ---------------------------- end of script
}

export default withRouter(PageSekolahSiswa);