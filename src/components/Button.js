import React from 'react'

function Button(props) {
  return (
    <button className={props.buttonType} onClick={props.handleOnClick}>
      {props.children}
    </button>
  )
}

export default Button
