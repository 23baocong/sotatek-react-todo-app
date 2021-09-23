export const TODO_LOCAL_STORAGE_KEY = 'todo'

function setNewTodo(newTodo) {
  localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(newTodo))
}

export function createTodo(todo) {
  let currentTodoList = listTodo() || []
  currentTodoList.push(todo)
  setNewTodo(currentTodoList)
}

export function updateTodo(todo) {
  const currentTodoList = listTodo()
  const indexToUpdate = currentTodoList.findIndex(
    (element) => element.id === todo.id
  )
  currentTodoList[indexToUpdate] = todo
  setNewTodo(currentTodoList)
}

export function listTodo() {
  return JSON.parse(localStorage.getItem(TODO_LOCAL_STORAGE_KEY))
}

export function deleteTodo(id) {
  const currentTodoList = listTodo()
  const indexToDelete = currentTodoList.findIndex(
    (element) => element.id === id
  )
  currentTodoList.splice(indexToDelete, 1)
  setNewTodo(currentTodoList)
}

export function searchByTitle(title) {
  const currentTodoList = listTodo()
  return currentTodoList.filter((ele) =>
    ele.title
      .toLowerCase()
      .replace(/ +/g, '')
      .includes(title.toLowerCase().replace(/ +/g, ''))
  )
}

export function removeTodoByListID(listID) {
  listID.forEach((element) => {
    deleteTodo(element)
  })
}

export function completeTodoByListID(listID) {
  const currentTodoList = listTodo()
  listID.forEach((id) => {
    const indexToDelete = currentTodoList.findIndex(
      (element) => element.id === id
    )
    currentTodoList[indexToDelete].completed = true
  })
  setNewTodo(currentTodoList)
}
