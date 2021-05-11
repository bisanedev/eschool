import React from 'react';
import { withRouter } from "react-router";

class Page404 extends React.Component {

  componentDidMount() {
 
  }

  render() {
    const { match, location, history } = this.props;
    return (
      <div>
        <h3>
          No match for <code>{location.pathname}</code>
        </h3>
      </div>
    );
  }
  
}

export default withRouter(Page404);