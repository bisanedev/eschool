import React from 'react';
import { Helmet } from 'react-helmet';
import {Breadcrumb,MenuCard} from '../../../components/menu';

class PageAplikasiQuiz extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      
    }    
  }

  componentDidMount() {     
    
  }

  render() {    
    return (  
    <div className="konten"> 
        <Helmet>
          <title>Kuis platform - Nama Sekolah</title>
        </Helmet>
        <div className="headings">
          <div className="title">Kuis platform</div>
          <div className="subtitle">Halaman modul kuis untuk ujian kelas , bank soal & paket soal</div>
          <Breadcrumb homeUrl="/aplikasi" homeText="Aplikasi">                                            
            <li><a href="#/aplikasi/quiz"><span>Kuis platform</span></a></li>   
            <li><a href="#"><span>Modul kuis</span></a></li>   
          </Breadcrumb>
        </div>        
        <div className="mw9 center">
        <div className="cf ph3 mb3 flex flex-wrap">
          <MenuCard url="/aplikasi/quiz/exam" icon="assets/images/menuButton.png" text="Ujian Kelas"/>
          <MenuCard url="/aplikasi/quiz/pilihan" icon="assets/images/menuButton.png" text="Bank Soal [Pilihan Ganda]"/>          
          <MenuCard url="/aplikasi/quiz/essay" icon="assets/images/menuButton.png" text="Bank Soal [Essay]"/>          
          <MenuCard url="/aplikasi/quiz/paket" icon="assets/images/menuButton.png" text="Paket Soal"/>             
        </div>
        </div>
    </div>
    );
  }
  // ---------------------------- script 
  
  // ---------------------------- end of script
}

export default PageAplikasiQuiz;