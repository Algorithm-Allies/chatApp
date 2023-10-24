import React from 'react';
import { useNavigate } from 'react-router-dom';

function Create() {
    let navigate = useNavigate();
    return (
        <div className="login-page">
            <div className="login-container">
                <h2 className="login-title">Create Account</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Full Name</label>
                        <input type="text" id="username" name="username" placeholder="Enter your full name" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" id="username" name="username" placeholder="Enter your username" className="form-input" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" placeholder="Enter your password" className="form-input" />
                    </div>
                    <button type="submit" className="login-button">Create Account</button>
                    <button onClick={()=> {navigate("/create-account")}}></button>
                </form>
            </div>
        </div>
    );
}

export default Create;