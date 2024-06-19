import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, Routes, RouterProvider, createBrowserRouter } from 'react-router-dom'
import './CSS/index.css'
import Signup from "./Components/Signup.jsx";
import Login from "./Components/Login.jsx";
import {TodoWrapperLocalStorage} from "./Components/TodoWrapperLocalStorage.jsx";
import './CSS/Todo.css'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Signup />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/todo',
        element: <TodoWrapperLocalStorage />,
    }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)