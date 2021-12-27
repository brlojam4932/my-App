import React, { useState } from 'react';

// PROGRESS BAR
function Progress({ done }) {
 
 const [style, setStyle] = useState({});

 setTimeout(() => {
   const newStyle = {
     opacity: 1,
     width: `${done}%`
   }

   setStyle(newStyle);
 }, 100);

  return (
    <div className="progress">
    <div className="progress-done" style={style}>{done}%</div>
  </div>
  )
}

export default Progress;
