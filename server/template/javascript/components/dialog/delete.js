import React from 'react';
import Modal from 'react-modal';
import {decode} from 'html-entities';

function DeleteDialog(props) {
    return (
    <Modal isOpen={props.show} closeTimeoutMS={500}
        onRequestClose={props.close}
        className={{base: 'dialog dialog-delete shadow-3',afterOpen: 'dialog-base_after-open',beforeClose: 'dialog-base_before-close'}}
        overlayClassName={{base: 'overlay-base',afterOpen: 'overlay-base_after-open',beforeClose: 'overlay-base_before-close'}}
    >     
     <div className="dialog-close dim" onClick={props.close}><i className="material-icons-outlined">close</i></div>
     <div className="dialog-data fr">
        <div className="dialog-body">            
            <span className="dialog-title pb2">{props.title}</span>            
            <span className="dialog-subtitle" dangerouslySetInnerHTML={{ __html: decode(props.subtitle) }}/>
        </div>                  
        <div className="dialog-button">
            <button type="button" style={{cursor: "pointer"}} className="w3 tc f7 link dim br2 ba ph3 pv2 dib" onClick={props.close}>Batal</button>
            <button type="button" style={{cursor: "pointer",borderColor:"red"}} className="w4 tc b ml2 f7 link dim br2 ba ph3 pv2 dib white bg-dark-red flex items-center" onClick={props.onClick}>
            <i className="material-icons white pr3" style={{fontSize:20}}>delete</i>
                Hapus
            </button>
        </div>
     </div>
    </Modal>
    );
}

export default DeleteDialog;