import {createContext, useContext} from 'react'

export const TodoContext = createContext({
    todos : [
        {
            id: 1,
            todo: 'Task 1',
            completed: false
        }
    ],
    addTodo: (todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
    updateTodo: (id, todos) => {}
})


export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider =  TodoContext.Provider
