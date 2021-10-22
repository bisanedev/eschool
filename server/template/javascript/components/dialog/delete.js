import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function DeleteDialog(props) {
    return (
    <Modal isOpen={props.show} closeTimeoutMS={500}
        onRequestClose={props.close}
        className={{base: 'dialog dialog-delete shadow-3',afterOpen: 'dialog-base_after-open',beforeClose: 'dialog-base_before-close'}}
        overlayClassName={{base: 'overlay-base',afterOpen: 'overlay-base_after-open',beforeClose: 'overlay-base_before-close'}}
    >     
     <div className="dialog-close dim" onClick={props.close}><i className="fas fa-times"/></div>
     <div className="dialog-data fr">
        <div className="dialog-body">            
            <span className="dialog-title pb2">{props.title}</span>
            <span className="dialog-subtitle">{props.subtitle}</span>                    
        </div>                  
        <div className="dialog-button">
            <button type="button" style={{cursor: "pointer"}} className="w3 tc f7 link dim br2 ba ph3 pv2 dib" onClick={props.close}>BATAL</button>
            <button type="button" style={{cursor: "pointer"}} className="w4 tc b ml2 f7 link dim br2 ba ph3 pv2 dib white bg-dark-red" onClick={props.onClick}>
            <i className="fas fa-trash white pr2"/>
                HAPUS
            </button>
        </div>
     </div>
    </Modal>
    );
}

export default DeleteDialog;