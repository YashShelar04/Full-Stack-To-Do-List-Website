import React, {useState, useEffect} from 'react'
import { TodoForm } from './TodoForm'
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import {Link} from "react-router-dom";
uuidv4();

export const TodoWrapperLocalStorage = () => {
    const [todos, setTodos] = useState([]);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const parsedUserData = JSON.parse(localStorage.getItem('userData'));

        const fetchTodosFromBackend = async (username) => {
            try {
                const response = await fetch(`http://localhost:3000/todo/${username}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch todos from the backend');
                }
                const data = await response.json();
                setTodos(data.todos);
            } catch (error) {
                console.error('Error fetching todos from the backend:', error);
            }
        };

        if (parsedUserData) {
            setUserData(parsedUserData);
            fetchTodosFromBackend(parsedUserData.username);
        }
    }, []);

    const addTodo = async (todo) => {
        const newTodo = { id: uuidv4(), task: todo, completed: false, isEditing: false };
        const newTodos = [...todos, newTodo];

        try {
            const response = await fetch(`http://localhost:3000/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userData.username, todos: newTodos }),
            });
            if (!response.ok) {
                const error = await response.text();
                alert(error);
                return;
            }
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
        } catch (err) {
            console.error('Error adding todo:', err);
            alert('Please try again later.');
        }
    };

    const toggleComplete = async (id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);

        try {
            const response = await fetch(`http://localhost:3000/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userData.username, todos: newTodos }),
            });
            if (!response.ok) {
                const error = await response.text();
                alert(error);
                return;
            }
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
        } catch (err) {
            console.error('Error toggling todo:', err);
            alert('Please try again later.');
        }
    };

    const deleteTodo = async (id) => {
        const newTodos = todos.filter(todo => todo.id !== id);

        try {
            const response = await fetch(`http://localhost:3000/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userData.username, todos: newTodos }),
            });
            if (!response.ok) {
                const error = await response.text();
                alert(error);
                return;
            }
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
        } catch (err) {
            console.error('Error deleting todo:', err);
            alert('Please try again later.');
        }
    };

    const editTodo = (id) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    };

    const editTask = async (task, id) => {
        const newTodos = todos.map(todo => todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo);

        try {
            const response = await fetch(`http://localhost:3000/todo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: userData.username, todos: newTodos }),
            });
            if (!response.ok) {
                const error = await response.text();
                alert(error);
                return;
            }
            setTodos(newTodos);
            localStorage.setItem('todos', JSON.stringify(newTodos));
        } catch (err) {
            console.error('Error editing todo:', err);
            alert('Please try again later.');
        }
    };

    const handlelogout = async () => {
        const parsedUserData = JSON.parse(localStorage.getItem('userData'));

        if (!parsedUserData) {
            alert('User data not found in local storage.');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/login/${parsedUserData.username}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to logout');
            }
            // Update local storage
            parsedUserData.isLoggedIn = false
            localStorage.setItem('userData',JSON.stringify(parsedUserData));

            // Redirect to login page
            window.location.href = '/login';
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Error logging out. Please try again later.');
        }
    };


    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            <Link to={`/login/${userData.username}`} style={{color:"red",backgroundColor:"black",padding:7,borderRadius:10}} onClick={handlelogout}>Logout</Link>
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodoForm editTodo={editTask} task={todo} key={index} />
                ) : (
                    <Todo task={todo} key={index} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
                )
            ))}
        </div>
    );
};
