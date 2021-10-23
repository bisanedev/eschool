import React from 'react';
import Modal from 'react-modal';

function LogoutDialog(props) {
    return (
    <Modal isOpen={props.show} closeTimeoutMS={500}
        className={{base: 'dialog shadow-3',afterOpen: 'dialog-base_after-open',beforeClose: 'dialog-base_before-close'}}
        overlayClassName={{base: 'overlay-base',afterOpen: 'overlay-base_after-open',beforeClose: 'overlay-base_before-close'}}
    >
     <i className="fas fa-power-off dialog-icon bg-dark-red"/>
     <div className="dialog-close dim" onClick={props.close}><i className="fas fa-times"/></div>
     <div className="dialog-data fr">
        <div className="dialog-body">
            <span className="dialog-title pb2">Logout</span>
            <span className="dialog-subtitle">Apakah anda yakin logout ??</span>                    
        </div>                  
        <div className="dialog-button">
            <button type="button" style={{cursor: "pointer"}} className="w3 tc f7 link dim br2 ba ph3 pv2 dib" onClick={props.close}>BATAL</button>
            <button type="button" style={{cursor: "pointer"}} className="w4 tc b ml2 f7 link dim br2 ba ph3 pv2 dib white bg-dark-red" onClick={props.onClick}>LOGOUT</button>
        </div>
     </div>
    </Modal>
    );
}

export default LogoutDialog;