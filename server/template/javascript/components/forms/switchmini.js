import React from 'react';

function SwitchMini(props) {

    return (
        <label className="switchToggle">
            <input type="checkbox" name={props.name} checked={props.value} onChange={props.onChange}/>
            <span className="slider round"></span>
        </label>
    );
}
export default SwitchMini;