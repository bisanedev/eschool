import React from 'react';

export default class Breadcrumb extends React.Component{

  constructor(props) {
    super(props);    
  }

  componentDidMount() {     

  }

  render() {      
    return (
    <nav aria-label="breadcrumb">
     <ol className="breadcrumb">
        <li className="breadcrumb-item berandaItem">
         <a href={"#"+this.props.homeUrl}>
          {this.props.homeIcon}          
          <span className="berandaText">{this.props.homeText}</span>
         </a>
        </li>
        {this.props.children}
     </ol>
    </nav>
    );
  }
}