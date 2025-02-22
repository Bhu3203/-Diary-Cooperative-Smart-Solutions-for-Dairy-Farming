import React, { useRef, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "./UserLogin.css";
export default function UserLogin() {
    const user = useRef();
    const pass = useRef();
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = (e) => {
      e.preventDefault();
      const userVal = user.current.value.trim();
      const passVal = pass.current.value.trim();
  
      if (!userVal || !passVal) {
        setError("Username and password cannot be empty.");
        return;
      }
  
      if (userVal === "user" && passVal === "password") {
        setError("");
        navigate("/");
      } else {
        setError("Please enter valid credentials");
      }
    };
   

    return (
        <div className="unique-login-page">
            <div className="unique-login-container">
                <div className="unique-form-container">
                <Link to="/login" className="signup-link">Back</Link>
                   <h1 className="unique-form-title">User</h1>
                    <h2 className="unique-form-title">Sign In</h2>
                    <form className="unique-form unique-signin-form"
                    onSubmit={handleLogin}
                    >
                        <div className="unique-form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                className="unique-form-input"
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                ref={user}
                               
                            />
                        </div>
                        <div className="unique-form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="unique-form-input"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                ref={pass}
                                
                               
                            />
                        </div>
                        <div className="unique-form-options">
                            <label className="unique-checkbox-label">
                                <input type="checkbox" id="keepSignedIn" />
                                Keep me signed in
                            </label>
                        </div>
                        <button type="submit" className="unique-form-submit-button" >Sign In</button>
                    </form>
                    {/* {error && <p className="error-message">{error}</p>} */}
                    <div className="unique-signup-link">
                                            <p>New to Sadguru? <Link to="/sign-up">Sign Up</Link></p>
                                        </div>
                </div>
            </div>
        </div>
    );
}
