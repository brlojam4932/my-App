import React from "react";
import reactDom from "react-dom";

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'transate( -50%, -50% )',
  backgroundColor: '#33cc33',
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
  if (!open) return null;

  return reactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}

