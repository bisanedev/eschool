import React from 'react';
import PropTypes from 'prop-types';

export default class InputPassword extends React.Component{

  constructor(props) {
    super(props); 
    this.state = {
        toggle:false
    }   
  }

  componentDidMount() {     

  }

  render() {
    const {toggle}  = this.state;   
    return (
    <>
    <div className={"input-password " + (this.props.errorMessage != "" ? "error":"")}>
      <input name={this.props.name} placeholder={this.props.placeholder} className="input-reset ba b--black-20 pa2 db w-100"  type={toggle ? "text" : "password"} onChange={this.props.onChange} />           
      <div className="view-password" onClick={this.toggleShow}>
        {toggle ? <i className="material-icons-outlined">visibility</i>:<i className="material-icons-outlined">visibility_off</i>}              
      </div> 
    </div>
    {this.props.errorMessage != "" && (
      <span className="pesan-error">{this.props.errorMessage}</span>
    )}
    </>
    );
  }

  toggleShow = () => {
    const {toggle} = this.state; 
    this.setState({toggle:  !toggle });
  };
}

InputPassword.propTypes = {
  errorMessage: PropTypes.string    
};

InputPassword.defaultProps = {
  errorMessage: ""    
};