import React , { useRef } from 'react';
import MathView from 'react-math-view';

function InputMath(props) {
    const ref = useRef(null);    
    return (       
    <MathView ref={ref} value={props.value}
      onFocus={() => {
        ref.current.executeCommand('showVirtualKeyboard');
      }}
      onBlur={() => {        
        ref.current.executeCommand('hideVirtualKeyboard');
      }} 
      onContentDidChange={() => {props.onChange(ref.current.getValue('latex'))}}    
    />               
    );
}

export default InputMath;