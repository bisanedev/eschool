import React from 'react';

export default class Navbar extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLogin:false
    }    
  }

  componentDidMount() {     
    
  }

  componentWillUnmount() {
    
  }

  render() {
    const {isLogin} = this.state;
    return (
    <div className="navbar" id="navbar">                   
        <div className="menu">
          <div className="floatLeft">
            <div className="menu-button">
              <button className="iconButton" onClick={() => this.toggleshowMenu()}>
                <i className="las la-bars"></i>
              </button>
            </div>
            <div className="menu-title">
              Halaman Dashboard
            </div>
          </div>
          <div className="floatRight">
            <div className="menu-user dropdown notifikasi"> 
              <span className="icon">
                <i className="las la-bell"></i>
              </span>
              <div className="dropdown-content">
                <div className="title">Notifikasi</div> 
                <div className="list">
                  <span className="kosong">Kosong</span>
                  <a className="dropdown-item" href="#">Malaria menyebar melalui gigitan nyamuk Anopheles betina yang sudah terinfeksi oleh parasit.</a>
                  <a className="dropdown-item" href="#">Notifikasi 2</a>
                  <a className="dropdown-item" href="#">Notifikasi 3</a>
                  <a className="dropdown-item" href="#">Notifikasi 4</a>
                  <a className="dropdown-item" href="#">Notifikasi 5</a>
                  <a className="dropdown-item" href="#">Notifikasi 6</a>
                  <a className="dropdown-item" href="#">Notifikasi 7</a>
                  <a className="dropdown-item" href="#">Notifikasi 8</a>
                  <a className="dropdown-item" href="#">Notifikasi 9</a>
                  <a className="dropdown-item" href="#">Notifikasi 10</a>
                  <a className="dropdown-item" href="#">Notifikasi 11</a>
                  <a className="dropdown-item" href="#">Notifikasi 12</a>
                  <a className="dropdown-item" href="#">Notifikasi 13</a>
                  <a className="dropdown-item" href="#">Notifikasi 14</a>
                  <a className="dropdown-item" href="#">Notifikasi 15</a>                                    
                </div>
                <div className="more">
                  <a  href="#/notifikasi"> 
                  <span>See all notifications</span>
                  <i className="las la-angle-right"></i>
                  </a> 
                </div>                           
              </div>
            </div>
            <div className="menu-user dropdown profile">
            <div className="user-info">              
              <img src="profile.webp"/>              
            </div>
            <div className="dropdown-content">
              <div className="user-box">
                <div className="avatar">
                  <img src="profile.webp"/>
                </div>
                <div className="info">
                  <span className="nama">SITI WAFIROTUL KAROMAH AL ROMDLANIYAH TAUFIQ</span>
                  <span className="user">ROMDLANIYAH</span>
                </div>
              </div>
              <div className="list">                                  
									<a className="dropdown-item" href="#">My Profile</a>
									<a className="dropdown-item" href="#">My Balance</a>
									<a className="dropdown-item" href="#">Inbox</a>									
									<a className="dropdown-item" href="#">Account Setting</a>                  
              </div>
              <div className="logout">
                <a href="#/logout"> 
                  <span>Logout</span>
                  <i className="las la-sign-out-alt"></i>
                </a>
              </div>
            </div>
            </div>
          </div>   
        </div>
    </div>
    );
  }
  // ---------------------------- script 

  //----------------
  toggleshowMenu = () =>{    
    if(this.state.showMenu){
      this.setState({ showMenu: false });
      document.getElementById("menu").style.width = "0";
      document.getElementById("main").style.marginLeft = "0";
      document.getElementById("navbar").style.width = "100%";   
      document.getElementById("navbar").style.maxWidth = "1920px";   
    }else{
      this.setState({ showMenu: true });      
      document.getElementById("menu").style.width = "250.1px";
      document.getElementById("main").style.marginLeft = "250.1px"; 
      document.getElementById("navbar").style.width = "81.46%";
      document.getElementById("navbar").style.maxWidth = "1669.9px";      
    }
  } 
  // ---------------------------- end of script
}