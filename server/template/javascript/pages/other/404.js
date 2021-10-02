import React from 'react';
import { withRouter } from "react-router";

class Page404 extends React.Component {

  componentDidMount() {
 
  }

  render() {
    const { match, location, history } = this.props;
    return (
       <div className="page-wrap d-flex flex-row align-items-center">
       <div className="container">
           <div className="row justify-content-center">
               <div className="col-md-12 text-center">
                   <span className="display-1 d-block">404</span>
                   <div className="mb-4 lead">Halaman <code>{location.pathname}</code> yang kamu cari tidak ditemukan.</div>
                   <a href="/" className="btn btn-link">Kembali</a>
               </div>
           </div>
       </div>
       </div>
    );
  }
  
}

export default withRouter(Page404);