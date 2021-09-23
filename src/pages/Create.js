import React, { useState } from 'react'
import Text from 'components/Text'
import Input from 'components/Input'
import Label from 'components/Label'
import TextArea from 'components/TextArea'
import Options from 'components/Options'
import Button from 'components/Button'
import moment, { now } from 'moment'
import { createTodo } from 'services/TodoService'
import { uuid } from 'uuidv4'
import { Link } from 'react-router-dom'

function Create() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('normal')
  const [dueDateValue, setDueDateValue] = useState(
    moment(now()).local().format(moment.HTML5_FMT.DATE)
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

  const handleOnButtonAddNewClick = () => {
    if (title === null || title === '') {
      alert('Task title is a required field.')
      return
    }

    const newTodo = {
      id: uuid(),
      title: title,
      description: description,
      due: dueDateValue,
      priority: priority,
      completed: false,
    }

    createTodo(newTodo)
    setTitle('')
    setDescription('')
    setPriority('normal')
    setDueDateValue(moment(now()).local().format(moment.HTML5_FMT.DATE))
    alert('Create new todo success')
  }
  return (
    <div className="container">
      <Text textType="title">New Task</Text>
      <Input
        inputType="text"
        class="input title-todo"
        placeholder="Add new task..."
        value={title}
        handleOnChange={handleOnTitleChange}
      />
      <div className="description">
        <Label>Description</Label>
        <TextArea
          rows="8"
          value={description}
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
          <Options value={priority} handleOnChange={handleOnPriorityChange} />
        </div>
      </div>
      <Button buttonType="primary" handleOnClick={handleOnButtonAddNewClick}>
        Add
      </Button>

      <Text>
        To check todo list, please visit <Link to="/">todo list</Link>
      </Text>
    </div>
  )
}

export default Create
