import React from 'react';

function InputText(props) {
    return (
        <input name={props.name} value={props.value} placeholder={props.placeholder} readOnly={props.readonly} className="input-reset ba b--black-20 pa2 db w-100" type="text" onChange={props.onChange} style={props.style}/>           
    );
}

export default InputText;
