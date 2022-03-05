import React from 'react';
import { CustomPicker} from 'react-color';
import { Hue,Saturation} from "react-color/lib/components/common";
import PropTypes from 'prop-types';

function InputColor ({ hsl, hsv, onChange , errorMessage}) {

  const styles = {
    hue: {
      height: 12,
      position: "relative",      
      marginTop: 2,
      width: "100%"
    },
    saturation: {
      height: "160px",
      position: "relative",
      width: "100%"
    }   
  };

  return(
    <div>
      <div style={styles.saturation}>
        <Saturation
          hsl={hsl}
          hsv={hsv}
          onChange={onChange}
          pointer={MyPointer}
        />
      </div>
      <div style={styles.hue}>
        <Hue hsl={hsl} onChange={onChange} pointer={HuePointter} />
      </div>  
      {errorMessage != "" && (
        <span className="pesan-error">{errorMessage}</span>
      )}          
    </div>
  );
};

InputColor.propTypes = {
  errorMessage: PropTypes.string    
};

InputColor.defaultProps = {
  errorMessage: ""    
};

export default CustomPicker(InputColor);

const MyPointer = () => {
  return (
    <div
      style={{        
        height: "12px",
        width: "12px",        
        borderRadius: "6px",                
        boxShadow: "rgb(255, 255, 255) 0px 0px 0px 1px inset"
      }}
    />
  );
};

const HuePointter = () => {
  return (
    <div style={{
      width: "12px",
      height: "12px",
      borderRadius:"6px",      
      backgroundColor: "rgb(248, 248, 248)",
      boxShadow:"rgba(0, 0, 0, 0.37) 0px 1px 4px 0px"
    }}/>
  )
}