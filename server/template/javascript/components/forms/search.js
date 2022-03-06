import React from 'react';

function InputSearch(props) {

    return (
    <div className="flex">
    {props.disabled === true ?
    <div className="input-search">
        <input name={props.name} value={props.value} className="input-reset gray pa2 db" style={{width:"100%"}} type="text" disabled placeholder="Menu cari tidak aktif"/>        
    </div>
    :
    <div className="input-search">
        <input name={props.name} value={props.value} className="input-reset gray pa2 db" style={props.value != "" ?{width:"85%"}:{width:"100%"}} type="text" placeholder={props.placeholder} onChange={props.onChange} onKeyPress={props.onKeyPress}/>        
        {props.value != "" && 
            <div className="reset" onClick={props.onReset}>
                <i className="material-icons-outlined">close</i>  
            </div>
        }
    </div>
    }
    {props.disabled === true ?
    <button type="submit" style={{cursor: "no-drop",borderColor:"rgba(253, 253, 253, 0)"}} className="link br1 pa2 dib disable-primary bg-disableSecondary" onClick={props.onClick}>
        <i className="material-icons-outlined" style={{fontSize:"20px"}}>search</i> 
    </button>    
    :
    <button type="submit" className="pointer link dim br1 ba pa2 dib white bg-primary b--primary" onClick={props.onClick}>
        <i className="material-icons-outlined" style={{fontSize:"20px"}}>search</i> 
    </button>
    }
    </div>
    );  
}

export default InputSearch;