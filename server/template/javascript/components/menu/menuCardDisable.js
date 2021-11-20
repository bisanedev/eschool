import React from 'react';

export default class MenuCardDisable extends React.Component{

  constructor(props) {
    super(props);    
  }

  componentDidMount() {

  }

  render() {
    return(
    <div className="wrapCard">
    <div className="bg-white tc pa3 cardMenu relative br2" style={{border:"1px solid rgba(0,0,0,.125)"}}>
            <div className="cardMenuLocked">
                <i className="material-icons" style={{fontSize:"20px"}}>lock</i>                  
            </div>                     
            <div className="linkMenu">
                <img src={this.props.icon}/>
                <span className="pt1">{this.props.text}</span>
                <div className="middle">
                    <div className="text pa2">Hanya akses Superuser</div>                    
                </div>
            </div>
        </div>
    </div>
    );
  }
}