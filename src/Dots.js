import React from 'react';

function Dots({selectedIndex, dotCount}) {
  let dotStyles = {backgroundColor: "rgba(255, 255, 255, 0.65)", margin: "0 0.25rem", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", height: "10px", width: "10px", borderRadius: "50px"}
  let selectedDotStyles = {backgroundColor: "#fff", margin: "0 0.25rem", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", height: "10px", width: "10px", borderRadius: "50px"}
  let dots = Array(dotCount).fill().map((_, index) => <div key={index} style={selectedIndex === index ? selectedDotStyles : dotStyles}></div>)
  return (
    <>
    <div style={{textAlign: "center"}}>
    { dots.map(dot => dot) }
    </div>
    </>
  )
}

export default Dots;