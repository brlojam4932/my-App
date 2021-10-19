import React from "react";
import ReactDom from "react-dom";
//import {useState} from "react";

//https://youtu.be/7_67nxgw5W4
// npm install prop-types

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

 function Modal({ open, children, onClose }) {
  /*
  const handleSubmit = () => {
 
    setCoinAmountInput();
  }
  */
 
  // if not open, render nothing
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} /> {/* black overlay */}
      <div style={MODAL_STYLES} >
        {/*Define onClose in App */}
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
 
}


export default Modal;

