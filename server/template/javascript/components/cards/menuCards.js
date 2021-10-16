import React from 'react';

export default class MenuCard extends React.Component{

  constructor(props) {
    super(props);    
  }

  componentDidMount() {

  }

  render() {
    return(
    <div className="w-25 ph3 mb4">
        <div className="bg-white tc pa3 cardMenu br2" style={{border:"1px solid rgba(0,0,0,.125)"}}>                   
            <a className="linkMenu" href={"#"+this.props.url}>
                <img src={this.props.icon}/>
                <span className="pt1">{this.props.text}</span>               
            </a>
        </div>
    </div>
    );
  }
}