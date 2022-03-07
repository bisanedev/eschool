import React from 'react';
import PropTypes from 'prop-types';

function InputNumber(props) {
    return (
    <>
        <input type="number" name={props.name} pattern="[0-9]*" value={props.value} placeholder={props.placeholder} className={"input-reset ba b--black-20 pa2 db w-100 " + (props.errorMessage != "" ? "error":"")} onChange={props.onChange}/>
        {props.errorMessage != "" && (
            <span className="pesan-error">{props.errorMessage}</span>
        )}
    </>
    );
}
InputNumber.propTypes = {
    errorMessage: PropTypes.string    
};

InputNumber.defaultProps = {
    errorMessage: ""    
};
export default InputNumber;
