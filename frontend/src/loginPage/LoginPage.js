import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { Mail, Lock } from "lucide-react";

import { jwtDecode } from "jwt-decode";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:6969/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data.userDto));

        setErrorMessage("");

        try {
          const decodedToken = jwtDecode(data.token);

          if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setErrorMessage("Your session has expired. Please log in again.");
            navigate("/login");
            return;
          }
        } catch (decodeError) {
          console.error("Token decode error:", decodeError);
        }

        const userRoles = data.userDto.roles.map((role) => role.name);

        if (userRoles.includes("Admin")) {
          navigate("/admindash");
        } else if (userRoles.includes("Farmer") || userRoles.includes("Customer")) {
          navigate("/userdash");
        } 
        // else {
        //   navigate("/Main"); 
        // }
      } else {
        setErrorMessage("Invalid credentials.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="unique-login-page">
      <div className="unique-login-container">
        <div className="unique-form-container">
          <Link to="/Main" className="signup-link">
            Back
          </Link>

          <h2 className="unique-form-title">Sign In</h2>
          <form className="unique-form unique-signin-form space-y-4" onSubmit={handleLogin}>
            <div className="unique-form-group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="unique-form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="unique-form-group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  className="unique-form-input block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="unique-form-submit-button w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
              Sign In
            </button>
            {errorMessage && <p className="error-message text-sm text-red-500">{errorMessage}</p>}
            <div className="unique-signup-link">
              <p>
                New to Sadguru? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;