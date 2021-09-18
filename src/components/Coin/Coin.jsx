import React, { Component } from 'react';
import "./Coin.css";
// imp tab
import PropTypes from 'prop-types';


//rcc tab
export default class Coin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: this.props.price
    }
    this.handleClick = this.handleClick(this); // this binding gives us access to handleClick, this.setState...
  }
  /*
  componentDidMount() {
    const callback = () => {
      // set the state to a new random value
      // we allow one percent upward change
      //const randomPercentage = 1.0 + Math.random() * 0.01;
      // here we allow a range up and down change
      const randomPercentage = 0.995 + Math.random() * 0.01;
      // DON'T DO THIS: (react won't allow this.state variable to be used more than once) hence you only use it in the constructor
      // this.state.price = this.state.price * randomPercentage;
      this.setState( function(oldState){
        return {
          price: oldState.price * randomPercentage
        };
      });
      // simpler code below but preferec code above, using a function
      //this.setState({price: oldState.price * randomPercentage})
    }
    setInterval(callback, 1000);
    //setInterval ( () => console.log('done'), 1000 ) instructor input in console of explorer
  }
  */
 handleClick(e) {
   // prevent form from reloading
   (e).preventDefault();
   console.log("you clicked");
   
   const randomPercentage = 0.995 + Math.random() * 0.01;
   this.setState(function(oldState){
    return {
      price: oldState.price * randomPercentage
    };
  });

 }
  render() {
    return (
      <tr className="coin-row">
        <td>{this.props.name}</td>
        <td>{this.props.ticker}</td>
        <td>${this.state.price}</td>
        <td>
          <form action="#" method="POST"> 
          <button onClick={this.handleClick}>Refresh</button>
          </form>
        </td>
      </tr>
    );
  }
}


Coin.propTypes = {
  name: PropTypes.string.isRequired,
  ticker: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
}
