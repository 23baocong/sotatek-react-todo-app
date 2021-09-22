import React from 'react'

function TextArea(props) {
  return (
    <textarea
      id={props.id}
      name={props.name}
      rows={props.rows}
      cols={props.cols}
      value={props.value}
      onChange={props.handleOnChange}
    >
      {props.content}
    </textarea>
  )
}

export default TextArea
