import React , {useState} from 'react';
import { Toast } from 'react-bootstrap';

function ToastMsg(props) {
    const [show, setShow] = useState(false);    
  
    const toggleShow = () => setShow(!show);    
  
    return (      
        <Toast show={show} onClose={toggleShow}>
            <Toast.Header>              
              <strong className="me-auto">Bootstrap</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>        
    );
}

export default ToastMsg;