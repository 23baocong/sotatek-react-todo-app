import React, { useState, useContext } from 'react'
import Input from 'components/Input'
import Label from 'components/Label'
import TextArea from 'components/TextArea'
import Options from 'components/Options'
import Button from 'components/Button'
import moment from 'moment'
import { updateTodo } from 'services/TodoService'
import { BulkActionContext } from 'contexts/BulkActionContext'

export default function TodoItem(props) {
  const [openTodoInfo, setOpenTodoInfo] = useState(false)
  const [todoChecked, setTodoChecked] = useState(false)

  const bulkActionContext = useContext(BulkActionContext)

  const toggleTodoInfoHandle = () => {
    setOpenTodoInfo(!openTodoInfo)
  }

  const handleTodoChecked = () => {
    const action = !todoChecked
    setTodoChecked(!todoChecked)
    if (action) {
      bulkActionContext.setListTodoChecked([
        ...bulkActionContext.listTodoChecked,
        props.todo.id,
      ])
    } else {
      const currentListTodoChecked = bulkActionContext.listTodoChecked
      const removeIndex = currentListTodoChecked.findIndex(
        (id) => id === props.todo.id
      )
      currentListTodoChecked.splice(removeIndex, 1)
      bulkActionContext.setListTodoChecked([...currentListTodoChecked])
    }
  }

  const [title, setTitle] = useState(props.todo.title)
  const [description, setDescription] = useState(props.todo.description)
  const [priority, setPriority] = useState(props.todo.priority)
  const [dueDateValue, setDueDateValue] = useState(
    moment(props.todo.due).local().format(moment.HTML5_FMT.DATE)
  )

  const handleOnTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleOnDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleOnPriorityChange = (e) => {
    setPriority(e.target.value)
  }

  const resetValue = () => {
    setTitle(props.todo.title)
    setDescription(props.todo.description)
    setPriority(props.todo.priority)
    setDueDateValue(
      moment(props.todo.due).local().format(moment.HTML5_FMT.DATE)
    )
  }

  const handleOnUpdateTodoClick = () => {
    if (title === null || title === '') {
      alert('Task title is a required field.')
      resetValue()
      return
    }

    const todo = {
      id: props.todo.id,
      title: title,
      description: description,
      due: dueDateValue,
      priority: priority,
      completed: false,
    }

    updateTodo(todo)
    alert('Update todo success')
  }

  return (
    <div className="todo-wrapper">
      <div className="todo-item">
        <div className="checkbox">
          <Input
            inputType="checkbox"
            handleOnChange={handleTodoChecked}
            checked={todoChecked}
          />
          <Label type={props.todo.completed ? 'line-through' : ''}>
            {title}
          </Label>
        </div>
        <div>
          <Button buttonType="detailBtn" handleOnClick={toggleTodoInfoHandle}>
            Detail
          </Button>
          <Button
            buttonType="removeBtn"
            handleOnClick={props.handleOnTodoDeleteClick}
          >
            Remove
          </Button>
        </div>
      </div>
      {openTodoInfo ? (
        <div className="info-todo">
          <Input
            inputType="text"
            class="input title-todo"
            value={title}
            handleOnChange={handleOnTitleChange}
          />
          <div className="description">
            <Label>Description</Label>
            <TextArea
              id="description"
              rows="8"
              content={description}
              handleOnChange={handleOnDescriptionChange}
            />
          </div>
          <div className="select">
            <div className="due-date">
              <Label>Due Date</Label>
              <Input
                inputType="date"
                value={dueDateValue}
                handleOnChange={(e) => {
                  setDueDateValue(e.target.value)
                }}
              />
            </div>
            <div className="priority">
              <Label>Priority</Label>
              <Options
                value={priority}
                handleOnChange={handleOnPriorityChange}
              />
            </div>
          </div>
          <Button buttonType="primary" handleOnClick={handleOnUpdateTodoClick}>
            Update
          </Button>
        </div>
      ) : null}
    </div>
  )
}
