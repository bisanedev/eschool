import React from 'react';
import { useLocation } from 'react-router-dom';

export default class Sidebar extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isAdmin:this.props.superuser
    }    
  }

  componentDidMount() {     

  }

  render() {  
    const {isAdmin} = this.state;  
    return (
    <div id="menu" className="sidebar">
      <div className="logo">
        <img src="assets/images/logo_harizontal.png"/>
      </div>
      <ul className="nav"> 
        <NavItem url="/" title="Aplikasi" ico={<span className="material-icons-outlined" style={{color:"#ffffff"}}>apps</span>}/>
        {isAdmin ? 
        <NavItem url="/sekolah" title="Sekolah" ico={<span className="material-icons-outlined" style={{color:"#ffffff"}}>school</span>}/>
        :
        <NavItemDisabled title="Sekolah" ico={<span className="material-icons-outlined" style={{color:"#ffffff"}}>school</span>} />
        }        
        <NavItem url="/profile" title="Profil" class="profile" subtext="@zvickyhac" ico={<img src="user.jpg" />}/>  
        <NavItem url="/keluar" title="Logout" class="logout" ico={<span className="material-icons-outlined" style={{color:"#ffffff"}}>power_settings_new</span>}/>
      </ul>
    </div>
    );
  }
  // ---------------------------- script 
 
  // ---------------------------- end of script
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
    {props.class === "logout" && 
      <div className="nav-icon icon-logout">
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
      <div style={{position:"absolute",right:0,height:"22px"}}>
        <span className="material-icons-outlined" style={{color:"#b3b3b3",fontSize:"22px"}}>lock</span>
      </div>
  </div>
  </li>
  ); 
}