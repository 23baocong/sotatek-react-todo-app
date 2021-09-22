import React from 'react'

function Text(props) {
  return <p className={props.textType}>{props.children}</p>
}

export default Text
