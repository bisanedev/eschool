import React from 'react';
import Modal from 'react-modal';

function EditModal(props) {
    return (
    <Modal isOpen={props.show} closeTimeoutMS={500}        
        className={{base: 'modal shadow-3',afterOpen: 'modal-base_after-open',beforeClose: 'modal-base_before-close'}}
        overlayClassName={{base: 'overlay-base',afterOpen: 'overlay-base_after-open',beforeClose: 'overlay-base_before-close'}}
        style={{
            content: {
                width:props.width,
                height:props.height
            }
        }}
    > 
     <div className="modal-header">
        <div className="title">{props.title}</div>
        <div className="modal-close dim" onClick={props.close}><i className="fas fa-times"/></div>
     </div>       
     <div className="modal-data fr">
        <div className="modal-body">            
          {props.children}                    
        </div>                  
        <div className="modal-button pa2">    
            <button type="button" style={{cursor: "pointer"}} className="w3 tc f7 link dim br2 ba ph3 pv2 dib" onClick={props.close}>Batal</button>        
            <button type="button" style={{cursor: "pointer"}} className="w30 flex tc b ml2 f7 link dim br2 ba ph3 pv2 dib white bg-primary b--primary" onClick={props.onClick}>
            <i className="material-icons white pr2" style={{fontSize:14}}>edit</i>
            Perbarui Data
            </button>
        </div>
     </div>
    </Modal>
    );
}

export default EditModal;