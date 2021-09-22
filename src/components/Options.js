import React from 'react'

function Options(props) {
  return (
    <select onChange={props.handleOnChange} value={props.value}>
      <option value="low">Low</option>
      <option value="normal">Normal</option>
      <option value="high">High</option>
    </select>
  )
}

export default Options
