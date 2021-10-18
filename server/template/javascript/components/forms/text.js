import React from 'react';

function InputText(props) {
    return (
        <input name={props.name} className="input-reset ba b--black-20 pa2 db w-100" type="text" onChange={props.onChange}/>           
    );
}

export default InputText;
