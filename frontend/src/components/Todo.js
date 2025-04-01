import React from 'react';
import styles from './Todo.module.css'

const Todo = ({ todo, onDelete, onComplete }) => {

  return (
    <li className={styles.bla}>
      <h3 className={todo.completed ? styles.completed : ''}>{todo.title}</h3>
      <p>completed: {todo.completed ? 'True' : 'False'} </p>
      <button onClick={() => onDelete(todo._id)}>delete</button>
      <button onClick={() => onComplete(todo._id)}>{todo.completed ? 'uncomplete' : 'complete'}</button>
    </li>
  )
}

export default Todo;
