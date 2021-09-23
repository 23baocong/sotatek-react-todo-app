import React from 'react'
import Text from 'components/Text'
import Button from 'components/Button'

export default function BulkAction(props) {
  return (
    <div className="bulk-action">
      <Text>Bulk Action:</Text>
      <div>
        <Button buttonType="doneBtn">Done</Button>
        <Button
          buttonType="removeBtn"
          handleOnClick={props.handleOnRemoveTodoListClick}
        >
          Remove
        </Button>
      </div>
    </div>
  )
}
