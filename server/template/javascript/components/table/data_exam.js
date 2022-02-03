import React from 'react';
import moment from "moment";
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
                <div className="title flex items-center justify-center pa1">
                    <span className="elipsis">{props.nama}</span>
                </div>
                <div className="body flex flex-column justify-center items-center ph1">
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
                    <div className="w-100">
                        <div className="flex w-100 justify-between title-waktu">
                            <span>KKM</span>
                            <span className="ph1 bg-gold">{props.data.nilai_minimal}</span>
                        </div>
                        <span className="db b" style={{fontSize:12}}>{props.data.paket_soal.length} paket soal</span>
                    </div>
                </div>  
                <div className="footer">
                    <a className="flex pa2 link dim pointer primary" style={{fontSize:11}} href={props.onLihat}>
                        <i className="material-icons" style={{fontSize:"11px"}}>leaderboard</i>&nbsp; Lihat nilai
                    </a>
                    <a className="flex pa2 link dim pointer primary" style={{fontSize:11}} href={props.onEdit}>
                        <i className="material-icons" style={{fontSize:"11px"}}>edit</i>&nbsp; Ubah
                    </a>
                </div>  
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