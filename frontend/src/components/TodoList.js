import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import { deleteTodo, editTodo } from '../api/api';

function TodoList({ todos, setTodos, userData }) {
  const handleDelete = async (id) => {
    let deletedTodo = await deleteTodo(id);
    if (!deletedTodo) {
      console.error("deleteTodo returned null");
      return;
    }
    setTodos(p => p.filter(todo => todo._id !== deletedTodo._id));
  };

  const handleComplete = async (id) => {
    console.log("Complete button clicked for ID:", id);
    if (!userData || !userData._id) {
      console.error("User data is not available");
      return;
    }
    let todoToEdit = todos.find(todo => todo._id === id);
    if (!todoToEdit) {
      console.error("Todo not found");
      return;
    }
    console.log("Before updating:", todoToEdit);
  
    let updatedTodo = await editTodo(todoToEdit._id, todoToEdit.title, !todoToEdit.completed, userData._id);
    
    if (!updatedTodo) {
      console.error("editTodo returned null");
      return;
    }
    console.log("Updated Todo:", updatedTodo);
  
    setTodos(p => p.map(todo => todo._id === updatedTodo._id ? updatedTodo : todo));
  };
  

  return (
    <ul>
      {todos ? (
        todos.map(todo => (
          <Todo 
            key={todo._id} 
            todo={todo} 
            onDelete={(id) => handleDelete(id)}
            onComplete={(id) => handleComplete(id)}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
    </ul>
  );
}

export default TodoList;
