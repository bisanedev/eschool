import React from 'react';

class Forbidden extends React.Component {

  componentDidMount() {
 
  }

  render() {    
    return (
        <div className="page-wrap d-flex flex-row align-items-center">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-12 text-center">
                    <span className="display-1 d-block">403</span>
                    <div className="mb-4 lead">Akses halaman <code>{this.props.location.pathname}</code> tidak diperbolehkan.</div>
                    <a href="/" className="btn btn-link">Kembali</a>
                </div>
            </div>
        </div>
        </div> 
    );
  }
  
}

export default Forbidden;