import React from 'react';

function Checkbox(props) {
    return (
        <label className="checkbox-container">{props.text}
              <input name={props.name} type="checkbox" checked={props.checked} onChange={props.onChange}/>
              <span className="checkmark"></span>
        </label>
    );
}

export default Checkbox;
