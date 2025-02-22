

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  async function login() {
    navigate("login");
  }

  async function aboutNavigate() {
    navigate("about");
    
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Sadguru Digitalization</a>
        
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="navM-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navM-link"  onClick={aboutNavigate}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navM-link" to="/product">
                  Product
                </Link>
              </li>
            </ul>
            <button
              className="btn btn-outline-success d-flex me-2 Headerlogin-btn"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </nav>  
      


    </>
  );
}





