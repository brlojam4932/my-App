//rcc tab for class-based component
import React, { Component } from 'react';
import styled from 'styled-components'
//rccp
import PropTypes from 'prop-types'

const Section = styled.section`
  font-size: 2rem;
  text-align left;
  padding: 1.5rem 0 1.5rem 5rem;
  `;


export default class AccountBalance extends Component {

  render() {
    //prop drilling, lifting state up and conditional rendering is needed to make toggle work
   
    // if showBalance is true, hide; else - show balance
    //const [show, setShow] = this.props(true);
    const buttonText = this.props.showBalance ? "Hide Balance" : "Show Balance";
    let contents = null;
    if (this.props.showBalance) {
      // show contents in React fragments <></>
      contents = <> Account Balance: ${this.props.amount};</>
    }

    return (
      <Section>
        {contents}
        <button onClick={this.props.handleToggleChange}>{buttonText}</button>
      </Section>
    );
  }
}


AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired,
}