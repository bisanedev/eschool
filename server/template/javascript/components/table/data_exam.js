import React from 'react';
import moment from "moment";
import { Link } from "react-router-dom";
import "moment/locale/id";

function DataExam(props) {     
    let foto = <img src={props.src} onError={(e)=>{e.target.onerror = null; e.target.src=props.data.jenis==="l" ? "assets/images/cowok.png":"assets/images/cewek.png"}} />;
    return (        
        <div className="wrapDataExam bg-white tc br2">
            <div className="flex" style={{height:"100%"}}>
            <div className="user">
                {foto}
                <span className="pendidik_nama ph1">
                    {props.data.pendidik}               
                </span>
            </div>
            <div className="data"> 
                <Link className="body link dim flex flex-column justify-center items-center ph1" to={props.onEdit}>
                    <div className="title flex items-center justify-center pa1 mb2">
                        <span className="elipsis">{props.nama}</span>
                    </div>
                    <div className="mb1 w-100">
                        <div className="flex justify-between title-waktu">
                            <span>Mulai</span>
                            <span className="jam bg-green ph1">{moment(props.data.mulai).format('HH:mm')}</span>
                        </div>
                        <span className="tgl">{moment(props.data.mulai).format('dddd')}, {moment(props.data.mulai).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className="mb1 w-100">
                        <div className="flex justify-between title-waktu">
                            <span>Selesai</span>
                            <span className="jam bg-red ph1">{moment(props.data.selesai).format('HH:mm')}</span>
                        </div>
                        <span className="tgl">{moment(props.data.selesai).format('dddd')}, {moment(props.data.selesai).format('DD/MM/YYYY')}</span>
                    </div>
                </Link>
                {moment().isAfter(props.data.selesai) ? 
                    <Link className="pa2 link dim pointer primary footer" style={{fontSize:11}} to={props.onLihat}>
                        <i className="material-icons" style={{fontSize:"11px"}}>leaderboard</i>&nbsp; Lihat nilai
                    </Link>       
                :
                    <div className="pa2 disable-secondary footer" style={{fontSize:11}}>
                        <i className="material-icons" style={{fontSize:"11px"}}>leaderboard</i>&nbsp; Lihat nilai
                    </div>
                }                
            </div>
            </div>
            <div onClick={() => props.onDelete()} className="link dim deleteButton flex justify-center items-center">
                <i className="material-icons-outlined" style={{fontSize:"14px"}}>close</i>
            </div>
            <label className="checkbox-exam">            
                <input type="checkbox" checked={props.checked} onChange={props.onChecked}/>
                <span className="checkmark"></span>
            </label>
            <div className="status">
                {moment().isBetween(props.data.mulai,props.data.selesai) &&
                    <label className="state ph2 br1 bg-green">Berlangsung</label>                
                }
                {moment().isBefore(props.data.mulai) && 
                    <label className="state ph2 br1 bg-orange">Belum dimulai</label>
                }
                {moment().isAfter(props.data.selesai) && 
                    <label className="state ph2 br1 bg-red">Selesai</label>
                }                
            </div>
        </div>        
    );
}

export default DataExam;