import React from "react";
import { Link } from "react-router-dom";
import "./Loginc.css";
export default function Loginc() {
  return (
    <div className="login-container">
      <div className="login-header">
        <h1>Welcome to the Portal</h1>
        <p>Choose your role to proceed to the login page.</p>
      </div>
      <div className="login-options">
        <div className="login-card admin-card">
          <h2>Admin</h2>
          <p>Oversee system configurations and administrative tasks.</p>
          <button className="login-btn">
            <Link to="/admin">Login as Admin</Link>
          </button>
        </div>
        <div className="login-card employee-card">
          <h2>Farmer</h2>
          <p>Access resources and collaborate on tasks efficiently.</p>
          <button className="login-btn">
            <Link to="/farmer">Login as Farmer</Link>
          </button>
        </div>
        <div className="login-card customer-card">
          <h2>Customer</h2>
          <p>Explore products and manage your account seamlessly.</p>
          <button className="login-btn">
            <Link to="/user">Login as Customer</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
