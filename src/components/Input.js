import React from 'react'

function Input(props) {
  return (
    <input
      type={props.inputType}
      value={props.value}
      className={props.class}
      placeholder={props.placeholder}
      onChange={props.handleOnChange}
      checked={props.checked}
    />
  )
}

export default Input
