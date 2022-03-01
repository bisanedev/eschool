import React from 'react';
import PropTypes from 'prop-types';

function InputText(props) {
    return (
        <>
            <input name={props.name} value={props.value} placeholder={props.placeholder} readOnly={props.readonly} className={"input-reset ba b--black-20 pa2 db w-100 " + (props.errorMessage != "" ? "error":"")} type="text" onChange={props.onChange} style={props.style}/>
            {props.errorMessage != "" && (
                <span className="pesan-error">{props.errorMessage}</span>
            )}
        </>
    );
}

InputText.propTypes = {
    errorMessage: PropTypes.string    
};

InputText.defaultProps = {
    errorMessage: ""    
};

export default InputText;
