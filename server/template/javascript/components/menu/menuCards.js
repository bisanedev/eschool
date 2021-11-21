import React from 'react';

export default class MenuCard extends React.Component{

  constructor(props) {
    super(props);    
  }

  componentDidMount() {

  }

  render() {
    return(
    <div className="wrapCard">
        <div className="bg-white tc pa3 cardMenu br2" style={this.props.style}>                   
            <a className="linkMenu" href={"#"+this.props.url}>
                <img src={this.props.icon}/>
                <span className="pt1">{this.props.text}</span>               
            </a>
        </div>
    </div>
    );
  }
}