import React from 'react';
import { useLocation } from 'react-router-dom';

export default class Sidebar extends React.Component{

  constructor(props) {
    super(props);    
  }

  componentDidMount() {     

  }

  render() {      
    return (
    <div id="menu" className="sidebar">
      <div className="logo">
        <img src="assets/images/logo_harizontal.png"/>
      </div>
      <ul className="nav"> 
        <NavItem url="/" title="Aplikasi" ico={<span className="material-icons-outlined" style={{color:"#ffffff"}}>apps</span>}/>
        {this.props.superuser ? 
        <NavItem url="/sekolah" title="Sekolah" ico={<span className="material-icons-outlined" style={{color:"#ffffff"}}>school</span>}/>
        :
        <NavItemDisabled title="Sekolah" ico={<span className="material-icons-outlined" style={{color:"#ffffff"}}>school</span>} />
        }        
        <NavItem url="/profile" title="Profil" class="profile" subtext={"@"+this.props.username} ico={<img src="user.jpg" />}/>  
        <NavLogout title="Logout" show={this.props.modalShow}/>
      </ul>
    </div>
    );
  }
  // ---------------------------- script 
 
  // ---------------------------- end of script
}
function NavLogout(props){
  return (
    <li className="nav-item">
    <div className="nav-icon icon-logout">
      <span className="material-icons-outlined" style={{color:"#ffffff"}}>power_settings_new</span>
    </div>
    <div className="nav-button" onClick={props.show}>      
      <span className="text">{props.title}</span>      
    </div>
    </li>    
  );
}
function NavItem(props){  
  const location = useLocation();
  return (
    <li className={props.url === location.pathname ? "nav-item active":"nav-item"}>  
    {props.class === "profile" && 
      <div className="nav-icon icon-profile">
      {props.ico}
      </div>
    }
    {props.class != "profile" && props.class != "logout" &&
      <div className="nav-icon">
      {props.ico}
      </div>
    }     
    <a className="nav-button" href={"#"+props.url}>      
      <span className="text">{props.title}</span>       
      {props.subtext &&
        <span className="subtext">
         {props.subtext}
        </span>
      }
    </a>
    </li>
  );
}

function NavItemDisabled(props){
  return(
  <li className={props.url === location.pathname ? "nav-item active":"nav-item"}>
  <div className="nav-icon icon-disabled">
    {props.ico}
  </div>
  <div className="nav-button" style={{cursor:"not-allowed"}}>      
      <span className="text" style={{color:"#b3b3b3"}}>{props.title}</span>       
      <div style={{position:"absolute",right:"5px",height:"22px"}}>
        <span className="material-icons-outlined" style={{color:"#b3b3b3",fontSize:"22px"}}>lock</span>
      </div>
  </div>
  </li>
  ); 
}