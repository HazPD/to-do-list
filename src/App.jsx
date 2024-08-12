import { useState, useEffect } from "react";
import TodoInput from "./components/Todoinput";
import TodoList from "./components/TodoList";

function App() {
 
    const [todos,setTodos] = useState ([
        ])
    const [todoValue, setTodoValue] = useState('')

    function handleAddTodos(newTodo) {
        const newTodoList = [...todos, newTodo]
        persistData(newTodoList)
        setTodos(newTodoList)
    }

    function deleteTodo(index){
        const newTodoList = todos.filter((todo,todoIndex) => {
            return todoIndex !== index
        })
        persistData(newTodoList)
        setTodos(newTodoList)
    }
    function editTodo(index){
        const todoToBeEdited  = todos[index]
        setTodoValue(todoToBeEdited)
        deleteTodo(index)
    }

    function persistData(newList) {
        localStorage.setItem('todos', JSON.stringify({todos: newList }))
    }
    useEffect(() => {
        if (!localStorage) {
            return
        }

        let localTodos = localStorage.getItem('todos')
        if (!localTodos) {
            return            
        }
        localTodos = JSON.parse(localTodos).todos
        setTodos(localTodos)})
        
        return (
        <>
            <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
            <TodoList editTodo={editTodo} deleteTodo={deleteTodo} todos={todos} />  
        </>
    );
}
export default App;
