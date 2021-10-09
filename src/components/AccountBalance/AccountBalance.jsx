//rcc tab for class-based component
import React from 'react';
import styled from 'styled-components'
//rccp
import PropTypes from 'prop-types'

// show balance
const Section = styled.section`
  font-size: 2rem;
  text-align: center;
  margin-botton: 2rem;
  line-height: 3rem;
  display: inline black;
  `;

  // spacing for show balance div
const Balance = styled.div`
  min width: 250px;
  margin: 0.5rem 0 0 2.5rem;
  font-size: 1.5rem;
  verticle align: middle;
  text align: left;
  `;

  // helicopter button
const Button = styled.button`
  margin: 0 8px;
  `;

  // inheritance with style components and used as a function
const BalanceToggleButton = styled(Button)`
  with: 150px;
  `;


var formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

//<button type="button" class="btn btn-info">Info</button>
//<button type="button" class="btn btn-warning">Warning</button>
// rewrite account balance class component into a functional component
export default function AccountBalance(props) {

  const buttonText = props.showBalance ? "Hide Balance" : "Show Balance";
  let content = "\u00A0"; // place holder so page does not "jump"
  if (props.showBalance) {
    content = <>{formatter.format(props.amount)}</>
  }
  const buttonClass = "btn" + (props.showBalance ? "btn btn-warning" : "btn btn-info");
 
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