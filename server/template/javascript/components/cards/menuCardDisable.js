import React from 'react';

export default class MenuCardDisable extends React.Component{

  constructor(props) {
    super(props);    
  }

  componentDidMount() {

  }

  render() {
    return(
    <div className="col-md-3">
        <div className="card p-4 mb-4 cardMenu">
            <div className="cardMenuLocked">
                <div className="material-icons-outlined" style={{fontSize:"32px"}}>lock</div>
            </div>                     
            <div className="linkMenu">
                <img src={this.props.icon}/>
                <span>{this.props.text}</span>
                <div className="middle">
                    <div className="text">Hanya akses Superuser</div>                    
                </div>
            </div>
        </div>
    </div>
    );
  }
}