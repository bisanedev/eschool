import React from "react";
import {withRouter} from "react-router";
import { Helmet } from "react-helmet";
import Forbidden from "../../other/forbidden";
import Breadcrumb from '../../../components/breadcrumb';
import Table from "../../../components/table";
import TableHeader from "../../../components/table/header";
import TableData from "../../../components/table/body";
import TableFooter from "../../../components/table/footer";
import Pagination from "../../../components/pagination";


class PageSekolahKelas extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        
    }    
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {

  }

  render() {     
    const {tokenData} = this.props;
    return (  
    <div className="konten"> 
      <Helmet>
        <title>Kelas - Nama Sekolah</title>
      </Helmet>
      {!tokenData.superuser ? (<Forbidden location={this.props.location}/>):(
      <>
        <div className="headings">
          <div className="title">Kelas</div>
          <div className="subtitle">Halaman informasi data kelas</div>
          <Breadcrumb homeUrl="/sekolah" homeText="Sekolah">
            <li><a href="#/sekolah/kelas"><span>Kelas</span></a></li>   
            <li><a href="#"><span>Data kelas</span></a></li>  
          </Breadcrumb>    
        </div>                
        <div className="mw9 center cf ph3 mb3">
        <Table>
          <TableHeader>
            <div className="w-50 ph2">
              <button type="submit" style={{cursor: "pointer",borderColor:"#0191d7"}} className="link dim br1 ba pa2 dib white bg-primary" onClick={this.tambahkan}>
                <i className="fas fa-plus" style={{fontSize:"18px"}}/> 
              </button>
            </div>
            <div className="w-50 ph2 flex" style={{justifyContent:"flex-end"}}>                                                        
              <select id="types" className="pa2 db gray" name="">
                <option label="5" value="5"/>
                <option label="10" value="10"/>
                <option label="15" value="15"/>
              </select>
              <div className="flex ml2">                
                <input name="search" className="input-reset gray pa2 db w-100" type="text" onChange={this.handleInputChange}/>             
                <button type="submit" style={{cursor: "pointer",borderColor:"#0191d7"}} className="link dim br1 ba pa2 dib white bg-primary" onClick={this.tambahkan}>
                  <i className="fas fa-search" style={{fontSize:"18px"}}/> 
                </button>
              </div>
            </div> 
          </TableHeader>       
          <TableData>

          </TableData>
          <TableFooter>
            <div className="w-50 ph2">
              <span className="f6" style={{fontStyle:"italic"}}>Total data : 30 entri</span>
            </div>
            <div className="w-50 ph2 flex" style={{justifyContent:"flex-end"}}>
              <Pagination/>              
            </div>
          </TableFooter>          
        </Table>
        </div>
      </>
      )}        
    </div>
    );
  }
  // ---------------------------- script 
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  } 

  tambahkan = () => {
    console.log("tambahkan");
  }
  // ---------------------------- end of script
}

export default withRouter(PageSekolahKelas);