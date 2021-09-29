import React from 'react';
import { useLocation } from 'react-router-dom';

export default class Sidebar extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLogin:false
    }    
  }

  componentDidMount() {     

  }

  render() {
    const {isLogin} = this.state;
    return (
    <div id="menu" className="sidebar">
      <div className="logo">
        <img src="assets/images/logo_harizontal.png"/>
      </div>
      <ul className="nav"> 
        <NavItem url="/" title="Aplikasi" ico={<span className="material-icons-outlined" style={{color:"#ffffff"}}>apps</span>}/>        
        <NavItem url="/sekolah" title="Sekolah" ico={<span className="material-icons-outlined" style={{color:"#ffffff"}}>school</span>  }/>        
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