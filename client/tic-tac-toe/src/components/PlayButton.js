import React from 'react'
import "./ResetButton.css";

export const PlayButton = ({play}) => {
  return (
    <button className="reset-btn" onClick={play}>Hacer jugada</button>
  )
}
