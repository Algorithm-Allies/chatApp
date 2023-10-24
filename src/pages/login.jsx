import React from 'react';
import { Link } from 'react-router-dom';
import './login.css'

function Login() {
    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="heading">Ripple</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" className="form-input" />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="login-create-account">Don't have an account?{' '}<Link to='/create-account' className="create-account-link">Create an account</Link></p>
            </div>
        </div>
    );
}

export default Login;