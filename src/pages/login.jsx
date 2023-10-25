import React from "react";
import { Link } from "react-router-dom";
import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
    
    this.togglePassword = this.togglePassword.bind(this);
  }

  togglePassword() {  
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    const { showPassword } = this.state;

    return (
      <div className="login-page">
        <div className="login-container">
          <h1 className="heading">Ripple</h1>
          
          <form>
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              
              <input 
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="form-input" 
              />
              
              <div className="mb-3 form-check">
                <input 
                  type="checkbox"
                  onChange={this.togglePassword} 
                  className="form-check-input" 
                  id="togglePassword" 
                />
                
                <label className="form-check-label" htmlFor="togglePassword">
                  {showPassword ? "Hide password" : "Show password"}
                </label>
              </div>
              
            </div>
            
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
          
          <p className="login-create-account">
            Don't have an account?{" "}
            <Link to="/create-account" className="create-account-link">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;