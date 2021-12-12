import React from 'react';

function InputNumber(props) {
    return (
        <input type="text" name={props.name} pattern="[0-9]*" value={props.value} placeholder={props.placeholder} className="input-reset ba b--black-20 pa2 db w-100" onChange={props.onChange}/>           
    );
}

export default InputNumber;
