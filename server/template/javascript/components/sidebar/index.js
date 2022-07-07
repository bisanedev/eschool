import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

export default class Sidebar extends React.Component{

  constructor(props) {
    super(props); 
    this.state = {     
    }        
  }

  componentDidMount() {     

  }

  render() {
    let foto = <img src={"/data/users/"+this.props.username+".jpg?nocache="+Date.now()} onError={(e)=>{e.target.onerror = null; e.target.src=this.props.jenis==="l" ? "/assets/images/cowok.png":"/assets/images/cewek.png"}} />;
    let sekolah = this.props.superuser ? <NavItem url="/sekolah" title="Sekolah" ico={<i className="material-icons-outlined" style={{fontSize:"25px",color:"white"}}>school</i>}/>:<NavItemDisabled title="Sekolah" ico={<i className="material-icons-outlined" style={{fontSize:"25px",color:"white"}}>school</i>} />;    
    return (
    <div id="menu" className="sidebar">
      <div className="logo">
        <img src="/assets/images/logo_harizontal.png"/>
      </div>
      <ul className="nav"> 
        <NavItem url="/aplikasi" title="Aplikasi" ico={<i className="material-icons-outlined" style={{fontSize:"25px",color:"white"}}>apps</i>}/>
        {sekolah}        
        <NavItem url="/profile" title="Profil" class="profile" subtext={"@"+this.props.username} ico={foto}/>  
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
      <i className="material-icons-outlined" style={{fontSize:"25px",color:"white"}}>power_settings_new</i>     
    </div>
    <div className="nav-button" onClick={props.show}>      
      <span className="text">{props.title}</span>      
    </div>
    </li>    
  );
}
function NavItem(props){  
  const location = useLocation().pathname.split('/');  
  const urlActive = props.url.split('/');  
  
  return (
    <li className={urlActive[1] === location[1] ? "nav-item active":"nav-item"}>  
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
    <Link className="nav-button" to={props.url}>     
      <span className="text">{props.title}</span>       
      {props.subtext &&
        <span className="subtext">
         {props.subtext}
        </span>
      }    
    </Link>
    </li>
  );
}

function NavItemDisabled(props){
  return(
  <li className="nav-item">
  <div className="nav-icon icon-disabled">
    {props.ico}
  </div>
  <div className="nav-button" style={{cursor:"not-allowed"}}>      
      <span className="text" style={{color:"#b3b3b3"}}>{props.title}</span>       
      <div style={{position:"absolute",right:"10px"}}>
        <i className="fas fa-lock" style={{color:"#b3b3b3",fontSize:"15px"}}/>        
      </div>
  </div>
  </li>
  ); 
}