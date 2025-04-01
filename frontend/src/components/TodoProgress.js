import React, { useEffect, useState } from 'react'

function TodoProgress({todos}) {

    const [completedTodos, setCompletedTodos] = useState([])

    useEffect(() => {
        const completedTodos = todos.filter(todo => todo.completed)
        setCompletedTodos(completedTodos)
    }, [todos])

    const getProgress = () => {
      if(todos.length === 0) {
        return 0
      }
      return (completedTodos.length/todos.length * 100).toFixed(1)
    }
    
  return (
    <p>Todo Progress = {getProgress()}%</p>
  )
}

export default TodoProgress