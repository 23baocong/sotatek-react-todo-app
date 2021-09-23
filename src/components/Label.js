import React from 'react'

function Label(props) {
  return <label className={props.type}>{props.children}</label>
}

export default Label
