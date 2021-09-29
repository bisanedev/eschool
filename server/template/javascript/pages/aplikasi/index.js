import React from 'react';
import {withRouter} from "react-router";
import { Helmet } from 'react-helmet';

class PageAplikasi extends React.Component{

  constructor(props) {
    super(props);
    this.state = {

    }    
  }

  componentDidMount() {     

  }

  render() {
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Aplikasi - Nama Sekolah</title>
        </Helmet>   
        <h1>Halaman Aplikasi</h1>
    </div>
    );
  }
  // ---------------------------- script 
  
  // ---------------------------- end of script
}

export default withRouter(PageAplikasi);