import React from "react";
import {withRouter} from "react-router";
import { Helmet } from "react-helmet";
import Forbidden from "../../other/forbidden";
import Breadcrumb from '../../../components/breadcrumb';
import Cards from '../../../components/cards';

class PageSekolahKelas extends React.Component{

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
        <title>Kelas - Nama Sekolah</title>
      </Helmet>
      {!tokenData.superuser ? (<Forbidden location={this.props.location}/>):(
      <>
        <div className="headings">
          <div className="title">Kelas</div>
          <div className="subtitle">Halaman data kelas sekolah</div>
          <Breadcrumb homeUrl="/sekolah" homeText="Sekolah">
            <li><a href="#/sekolah/kelas"><span>Kelas</span></a></li>   
            <li><a href="#"><span>Data kelas</span></a></li>  
          </Breadcrumb>    
        </div>                
        <div className="mw9 center cf ph3 mb3">
        <Cards title="Data Kelas">

        </Cards>
        </div>
      </>
      )}        
    </div>
    );
  }
  // ---------------------------- script 
  
  // ---------------------------- end of script
}

export default withRouter(PageSekolahKelas);