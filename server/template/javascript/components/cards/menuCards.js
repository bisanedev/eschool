import React from 'react';

export default class MenuCard extends React.Component{

  constructor(props) {
    super(props);    
  }

  componentDidMount() {

  }

  render() {
    return(
    <div className="col-md-3">
        <div className="card p-3 mb-4 cardMenu">                   
            <a className="linkMenu" href={"#"+this.props.url}>
                <img src={this.props.icon}/>
                <span>{this.props.text}</span>               
            </a>
        </div>
    </div>
    );
  }
}