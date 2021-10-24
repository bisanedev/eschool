import React from 'react';

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
    <div className="input-password">
      <input name={this.props.name} placeholder={this.props.placeholder} className="input-reset ba b--black-20 pa2 db w-100"  type={toggle ? "text" : "password"} onChange={this.props.onChange} />           
      <div className="view-password" onClick={this.toggleShow}>
        {toggle ? <i className="far fa-eye"/>:<i className="far fa-eye-slash"/>}              
      </div> 
    </div>
    );
  }

  toggleShow = () => {
    const {toggle} = this.state; 
    this.setState({toggle:  !toggle });
  };
}