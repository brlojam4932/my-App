//rcc tab for class-based component
import React from 'react';
import styled from 'styled-components'
//rccp
import PropTypes from 'prop-types'

const Section = styled.section`
  font-size: 2rem;
  text-align left;
  padding: 1.5rem 0 1.5rem 5rem;
  `;

  

// rewrite account balance class component into a functional component
export default function AccountBalance(props) {

    const buttonText = props.showBalance ? "Hide Balance" : "Show Balance"; // this action 
    let contents = null;
    if (props.showBalance) {
      contents = <> Balance: ${props.amount};</>
    }

    return (
      <Section>
        {contents}
        <button onClick={props.handleToggleChange}>{buttonText}</button>
      </Section>
    )

}


AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired
}