import React, { useEffect, useState } from 'react'
import Text from 'components/Text'
import Input from 'components/Input'
import TodoItem from 'components/TodoItem'
import BulkAction from 'components/BulkAction'
import {
  listTodo,
  searchByTitle,
  deleteTodo,
  removeTodoByListID,
  completeTodoByListID,
} from 'services/TodoService'
import { useBulkActionContext } from 'contexts/BulkActionContext'
import { Link } from 'react-router-dom'

function EmptyTodoList() {
  return (
    <Text>
      Empty Todo please visit <Link to="/create">create todo</Link>
    </Text>
  )
}

function List() {
  const [currentTodoList, setCurrentTodoList] = useState(listTodo())
  const [searchValue, setSearchValue] = useState('')
  const [bulkActionOpen, setBulkActionOpen] = useState(false)

  const { listTodoChecked, setListTodoChecked } = useBulkActionContext()

  const handleSearchByTitle = (e) => {
    setSearchValue(e.target.value)
    const resultSearch = searchByTitle(e.target.value)
    setCurrentTodoList(resultSearch)
  }

  const handleOnDeleteTodo = (id) => {
    deleteTodo(id)
    alert('Remove todo success')
    setCurrentTodoList(listTodo())
  }

  useEffect(() => {
    if (listTodoChecked.length !== 0) {
      setBulkActionOpen(true)
    } else {
      setBulkActionOpen(false)
    }
  }, [listTodoChecked])

  const handleRemoveListTodo = () => {
    removeTodoByListID(listTodoChecked)
    alert('Remove todo success')
    setCurrentTodoList(listTodo())
    setListTodoChecked([])
  }

  const handleCompleteListTodo = () => {
    completeTodoByListID(listTodoChecked)
    alert('Todo completed')
    setCurrentTodoList(listTodo())
    setListTodoChecked([])
  }

  return (
    <div className="container">
      <Text textType="title">To Do List</Text>
      <Input
        inputType="text"
        class="input search"
        placeholder="Search..."
        value={searchValue}
        handleOnChange={handleSearchByTitle}
      />
      {currentTodoList ? (
        currentTodoList.map((element) => {
          return (
            <TodoItem
              key={element.id}
              todo={element}
              handleOnTodoDeleteClick={() => handleOnDeleteTodo(element.id)}
            />
          )
        })
      ) : (
        <EmptyTodoList />
      )}
      {bulkActionOpen ? (
        <BulkAction
          handleOnRemoveTodoListClick={handleRemoveListTodo}
          handleOnCompleteTodoListClick={handleCompleteListTodo}
        />
      ) : null}
    </div>
  )
}

export default List
