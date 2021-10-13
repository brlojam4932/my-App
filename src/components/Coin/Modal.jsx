import React from "react";
import reactDom from "react-dom";
import {useState} from "react";

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'transate( -50%, -50% )',
  backgroundColor: "#3E434F",
  color: "white",
  padding: '100px',
  zIndex: 1000,
}



const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,.7)',
  zIndex: 1000
}

export default function Modal({ open, children, onClose }) {
  const [coinAmmount, setCoinAmountInput] = useState(1);

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("submitted");
  }
  */

  if (!open) return null;

  return reactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES} >
        <h4>How many tokens</h4>
        <input 
        type="number"
        required
        value={coinAmmount}
        onChange={(e) => setCoinAmountInput(e.target.value)}
        />
        <button onClick={onClose}>Close</button>
        {children}
        <p>Amount of tokens to buy: { coinAmmount } </p>
      </div>

    </>,
    document.getElementById('portal')
  )
}

