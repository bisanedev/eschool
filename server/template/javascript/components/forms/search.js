import React from 'react';

function InputSearch(props) {

    return (
    <>
    <div className="input-search">
        <input name={props.name} value={props.value}  className="input-reset gray pa2 db" style={props.value != "" ?{width:"85%"}:{width:"100%"}} type="text" placeholder={props.placeholder} onChange={props.onChange} onKeyPress={props.onKeyPress}/>        
        {props.value != "" && 
            <div className="reset" onClick={props.onReset}>
                <i className="material-icons-outlined">close</i>  
            </div>
        }
    </div>
    <button type="submit" style={{cursor: "pointer",borderColor:"#0191d7"}} className="link dim br1 ba pa2 dib white bg-primary" onClick={props.onClick}>
        <i className="material-icons-outlined" style={{fontSize:"20px"}}>search</i> 
    </button>    
    </>
    );  
}

export default InputSearch;