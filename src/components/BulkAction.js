import Text from 'components/Text'
import Button from 'components/Button'

export default function BulkAction() {
  return (
    <div className="bulk-action">
      <Text>Bulk Action:</Text>
      <div>
        <Button buttonType="doneBtn">Done</Button>
        <Button buttonType="removeBtn">Remove</Button>
      </div>
    </div>
  )
}
