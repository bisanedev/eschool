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
    <>
       <div className="logo">
         <img src="assets/images/logo.png"/>
       </div>
       <ul className="nav nav-primary"> 
        <NavItem url="/" title="Beranda" ico="las la-home"/>                        
        <NavItems title="Komponen" ico="las la-briefcase">
          <SubItem url="/form" title="Komponen Form"/>
          <SubItem url="/button" title="Komponen Button"/>
          <SubItem url="/test" title="Testing"/>
        </NavItems>
        <NavItem url="/example" title="Example" ico="las la-microchip"/>
       </ul>
    </>
    );
  }
  // ---------------------------- script 
 
  // ---------------------------- end of script
}

function NavItem(props){  
  const location = useLocation();
  return (
    <li className={props.url === location.pathname ? "nav-item active":"nav-item"}>
    <a className="nav-button" href={"#"+props.url}>
      <i className={props.ico}></i>
      <span className="text">{props.title}</span>					
    </a>
    </li>
  );
}

function NavItems(props){
  const [menu, setMenu] = React.useState(false);
  function handleClick() {
    if(menu){setMenu(false);}else{setMenu(true);}    
  }
  return (
    <li className="nav-item submenu">
    <div className="nav-button" onClick={handleClick}>
      <i className={props.ico}></i>
      <span className="text">{props.title}</span>
      <span className={menu ? "caret caret180":"caret"}></span>
    </div>    
    <div className={menu ? "show":"hide"}>
    <ul className="nav nav-collapse">
      {props.children}							
    </ul>
    </div>    
    </li>
  );
}

function SubItem(props){
  const location = useLocation();
  return (
  <li>
    <a href={"#"+props.url} className={props.url === location.pathname ? "active":null}>              
      <span className="sub-item">{props.title}</span>
    </a>
  </li>
  );
}