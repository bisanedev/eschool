import React from 'react';

function Switcher(props) {
    return (
        props.disabled ? 
            <div className="switcher relative">                
                <div className="switch switch-disable">
                    <label htmlFor="yes">{props.yesLabel}</label>
                    <label htmlFor="no">{props.noLabel}</label>
                    <span></span>
                </div> 
            </div>  
        :   <div className="switcher relative">
                <input type="radio" name="rdo" id="yes" checked={props.value} onChange={(e) => console.log("yes")}/>
                <input type="radio" name="rdo" id="no" checked={props.value ? false:true} onChange={(e) => console.log("NO")}/>                  
                <div className="switch">
                    <label htmlFor="yes" onClick={props.yesClick}>{props.yesLabel}</label>
                    <label htmlFor="no" onClick={props.noClick}>{props.noLabel}</label>
                    <span></span>
                </div> 
            </div>        
    );
}

export default Switcher;