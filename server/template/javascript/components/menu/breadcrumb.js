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
        <li>
          <a href={"#"+this.props.homeUrl}>          
          <span>{this.props.homeText}</span>
          </a>
        </li>
        {this.props.children}                 
      </ol>   
    </nav>
    );
  }
}