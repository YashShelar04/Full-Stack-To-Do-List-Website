import '../CSS/Login.css'
import {Link} from 'react-router-dom'
import {useEffect, useState} from "react";
export default function Login(){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))

        // Accessing specific attributes in allItems
        const isLoggedIn = userData.isLoggedIn; // Assuming 'isLoggedIn' is stored as a string "true" or "false"
        const username = userData.username; // Example attribute

        console.log('isLoggedIn:', isLoggedIn);
        console.log('username:', username);

        if (isLoggedIn) {
            window.location.href = '/todo';
        }
    }, []);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                // Signup successful, redirect or handle as needed
                localStorage.setItem('userData',JSON.stringify(data.user));
                window.location.href = '/todo';
            } else {
                // Signup failed, show error message
                const error = await response.text();
                alert(`Login failed: ${error}`);
            }
        } catch (err) {
            console.error('Error signing up:', err);
            alert('Login failed. Please try again later.');
        }
    };

    return (
        <div className= "Login-rec">
            <h1 className="login-title">Login</h1>

            <form onSubmit={handleSubmit}>
                <label className="font-bold text-4xl">Username</label>
                <br/>
                <input type="text" className="username" placeholder="Username" onChange={handleUsernameChange} required/>
                <div style={{height: 50}}></div>
                <label className="font-bold text-4xl">Password</label>
                <br/>
                <input type="password" className="password" placeholder="Password" onChange={handlePasswordChange} required/>

                <div style={{height: 50}}></div>
                <input type="submit" className="login-submit bg-black text-white p-3 rounded-3xl w-64 mt-10" value="Login"/>
            </form>

            <h2 className="text-white inline" >New to the website?  </h2>
            <Link to="/">Signup</Link>
        </div>
    )
}