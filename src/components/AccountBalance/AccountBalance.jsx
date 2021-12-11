//rcc tab for class-based component
import React from 'react';
import styled from 'styled-components'
//rccp
import PropTypes from 'prop-types'

// show balance button and font
const Section = styled.section`
background-color: #000000;

  `;

// spacing for show balance when it appears
// background-color: #000000;
const Balance = styled.div`
background-color: #000000;
position: absolute;
  left: 137px;
  min width: 20px;
  margin: .5rem 0 0 2.5rem;
  font-size: 2rem;
  `;

// helicopter button
const Button = styled.button`
  margin: 30px 9px;
  `;

// inheritance with style components and used as a function
// show balance button width
const BalanceToggleButton = styled(Button)`
  width: 255px;
  `;


var formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

// rewrite account balance class component into a functional component
export default function AccountBalance(props) {

  const buttonText = props.showBalance ? "Hide Balance" : "Show Balance";
  let content = "\u00A0"; // place holder so page does not "jump"
  if (props.showBalance) {
    content = <>{formatter.format(props.amount)}</>
  }
  const buttonClass = "btn" + (props.showBalance ? "btn btn-warning" : "btn btn-primary");

  return (
    // all is wrapped into component fragments in order to render two seperate components in the same level
    <>
      <Balance>{content}</Balance>
      <Section>
        <BalanceToggleButton
          onClick={props.handleToggleChange}
          className={buttonClass}>
          {buttonText}
        </BalanceToggleButton>
        <Button className="btn btn-success"
          //we print a callback function
          onClick={props.handleBrrr}>
          <i className="fas fa-helicopter"></i>
        </Button>
      </Section>

    </>

  );

}


AccountBalance.propTypes = {
  amount: PropTypes.number.isRequired
}