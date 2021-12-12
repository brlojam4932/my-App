//rcc tab for class-based component
import React from 'react';
import styled from 'styled-components'
//rccp
import PropTypes from 'prop-types'

// background-color: #000000;

var formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// rewrite account balance class component into a functional component
export default function AccountBalance(props) {

  let content = "\u00A0"; // place holder so page does not "jump"
  if (props.showBalance) {
    content = <>{formatter.format(props.amount)}</>
  }

  return (
    // all is wrapped into component fragments in order to render two seperate components in the same level
    <>
    <div>
        <h2>{content}</h2>
        <button type="button" class="btn btn-outline-primary"
          onClick={props.handleToggleChange}
        >
          {props.showBalance ? "Hide Balance" : "Show Acc Balance"}
        </button>

        <button type="button" class="btn btn-outline-secondary"
          //we print a callback function
          onClick={props.handleBrrr}
        >
          Add Funds
        </button>
      </div>

    </>

  );

}


AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired
}