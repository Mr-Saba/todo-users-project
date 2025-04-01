import React, { useState } from 'react'
import { addTodo } from '../api/api'

function TodoForm({setTodos, userData}) {
    const [inputValue, setInputValue] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        let res = await addTodo(inputValue, userData._id)
        if(res.data) {
            setInputValue('')
            setTodos(p => [...p, res.data])
        } else if(res.err) {
            alert(res.err)
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='enter todo text...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button>add todo</button>
        </form>
    )
}

export default TodoForm