import React from 'react';
import Modal from 'react-modal';

function LogoutDialog(props) {
    return (
    <Modal isOpen={props.show} closeTimeoutMS={500}
        className={{base: 'dialog shadow-3',afterOpen: 'dialog-base_after-open',beforeClose: 'dialog-base_before-close'}}
        overlayClassName={{base: 'overlay-base',afterOpen: 'overlay-base_after-open',beforeClose: 'overlay-base_before-close'}}
    >    
     <i className="material-icons-outlined dialog-icon bg-dark-red">power_settings_new</i>
     <div className="dialog-close dim" onClick={props.close}><i className="material-icons-outlined">close</i></div>
     <div className="dialog-data fr">
        <div className="dialog-body">
            <span className="dialog-title pb2">Logout</span>
            <span className="dialog-subtitle">Apakah anda yakin logout ??</span>                    
        </div>                  
        <div className="dialog-button">
            <button type="button" style={{cursor: "pointer"}} className="w3 tc f7 link dim br2 ba ph3 pv2 dib" onClick={props.close}>Batal</button>
            <button type="button" style={{cursor: "pointer",borderColor:"red"}} className="w4 tc b ml2 f7 link dim br2 ba ph3 pv2 dib white bg-dark-red" onClick={props.onClick}>Logout</button>
        </div>
     </div>
    </Modal>
    );
}

export default LogoutDialog;