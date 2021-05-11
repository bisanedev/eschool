import React from 'react';
import {withRouter} from "react-router";

class PageDashboard extends React.Component{

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
        <h1>Halaman Dashboard</h1>
    </div>
    );
  }
  // ---------------------------- script 
  
  // ---------------------------- end of script
}

export default withRouter(PageDashboard);