import React, { useState } from 'react'

export const BulkActionContext = React.createContext()

export default function BulkActionProvider(props) {
  const [listTodoChecked, setListTodoChecked] = useState([])

  return (
    <BulkActionContext.Provider value={{ listTodoChecked, setListTodoChecked }}>
      {props.children}
    </BulkActionContext.Provider>
  )
}

export const useBulkActionContext = () => {
  const context = React.useContext(BulkActionContext)
  if (context === undefined)
    throw new Error('useTemplate must be used within TemplateProvider')
  return context
}
