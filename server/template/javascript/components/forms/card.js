import React from 'react';

export default class Cards extends React.Component{

  constructor(props) {
    super(props);    
  }

  componentDidMount() {     

  }

  render() {         
    return (
    <div className={`${this.props.custom === undefined ? "":this.props.custom} bg-white mr2 br2 mb2`} style={{border:"1px solid rgba(0, 0, 0, 0.125)"}}>
        <div className="pa3 bg-primary white">
            <span className="f4">{this.props.title}</span>
        </div>
        <div className={this.props.bodyClass}>
            {this.props.children}
        </div>
    </div>
    );
  }
}