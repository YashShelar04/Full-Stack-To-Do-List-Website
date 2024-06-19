import '../CSS/Login.css'
import {Link, NavLink} from 'react-router-dom'
import {TodoWrapperLocalStorage} from "./TodoWrapperLocalStorage.jsx";
import {useState, useEffect} from 'react'
export default function Signup(){
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        console.log(username);
    }, [username]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/`, {
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
                window.location.href = '/login';
            } else {
                // Signup failed, show error message
                const error = await response.text();
                alert(`Sign up failed: ${error}`);
            }
        } catch (err) {
            console.error('Error signing up:', err);
            alert('Sign up failed. Please try again later.');
        }
    };

    return (
        <div className= "Login-rec">
            <h1 className="login-title">SignUp</h1>

            <form onSubmit={handleSubmit}>
                <label className="font-bold text-4xl">Username</label>
                <br/>
                <input type="text" className="username" placeholder="Username" onChange={handleUsernameChange} required/>
                <div style={{height: 50}}></div>
                <label className="font-bold text-4xl">Password</label>
                <br/>
                <input type="password" className="password" placeholder="Password" onChange={handlePasswordChange} required/>

                <div style={{height: 50}}></div>
                <input type="submit" className="login-submit bg-black text-white p-3 rounded-3xl w-64 mt-10" value="Sign Up"/>
            </form>

            <h2 className="text-white inline">Already have an account?  </h2>
            <Link to="/login">Login</Link>

        </div>
    )
}