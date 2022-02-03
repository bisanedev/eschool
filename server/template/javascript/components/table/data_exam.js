import React from 'react';
import moment from "moment";

function DataExam(props) {     
    let foto = <img src={props.src} onError={(e)=>{e.target.onerror = null; e.target.src=props.data.jenis==="l" ? "assets/images/cowok.png":"assets/images/cewek.png"}} />;
    return (        
        <div className="wrapDataExam bg-white tc br2 flex">
            <div className="user">
                {foto}
                <span className="pendidik_nama ph1">
                    {props.data.pendidik}               
                </span>
            </div>
            <div className="data">               
                <span className="title flex items-center justify-center pa1">{props.nama}</span>
                <div className="body flex flex-column justify-center items-center pa1">
                    <div className="mb1 w-100">
                        <div className="flex justify-between title-waktu">
                            <span>Mulai</span>
                            <span className="jam bg-green ph1">{moment(props.data.mulai).format('HH:mm')}</span>
                        </div>
                        <span className="tgl">{moment(props.data.mulai).format('DD/MM/YYYY')}</span>
                    </div>
                    <div className="w-100">
                        <div className="flex justify-between title-waktu">
                            <span>Selesai</span>
                            <span className="jam bg-red ph1">{moment(props.data.selesai).format('HH:mm')}</span>
                        </div>
                        <span className="tgl">{moment(props.data.selesai).format('DD/MM/YYYY')}</span>
                    </div>
                </div>  
                <div className="footer"></div>  
            </div>
        </div>        
    );
}

export default DataExam;