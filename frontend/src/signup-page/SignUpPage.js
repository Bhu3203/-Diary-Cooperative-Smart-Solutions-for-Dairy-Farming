

import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoKeyOutline, IoPhonePortraitOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import "./SignupPage.css";

export default function SignUpPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [role, setRole] = useState("Select Role");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mobileRef = useRef();
  const confirmPasswordRef = useRef();
  const navigate = useNavigate();

  const roleMapping = {
    Farmer: 2,
    Customer: 3,
  };

  const handleSignupSuccess = (event) => {
    event.preventDefault();
    setErrorMessage("");

    const firstName = firstNameRef.current.value.trim();
    const lastName = lastNameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const mobile = mobileRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    if (!firstName || !lastName || !email || !mobile || !password || !confirmPassword) {
      setErrorMessage("All fields are required!");
      return;
    }
    if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
      setErrorMessage("Please enter a valid first and last name!");
      return;
    }
    if (!/^[6-9][0-9]{9}$/.test(mobile)) {
      setErrorMessage("Please enter a valid mobile number!");
      return;
    }
    if (!/^([a-zA-Z0-9]+)@([a-zA-Z0-9]+)\.([a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$/.test(email)) {
      setErrorMessage("Please enter a valid email!");
      return;
    }
    if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#\$])[A-Za-z0-9@#\$]{6,12}$/.test(password)) {
      setErrorMessage(
        "Password must be 6-12 characters, with at least one digit, one lowercase letter, one uppercase letter, and one special character (@, #, $)"
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }
    if (role === "Select Role") {
      setErrorMessage("Please select a role before registering.");
      return;
    }

    const roleId = roleMapping[role];
    if (!roleId) {
      setErrorMessage("Invalid role selected."); // Should not happen now
      return;
    }

    const user = {
      firstName,
      lastName,
      email,
      mobile,
      password,
      roles: [{ id: roleId, name: role }],
    };

    axios
      .post("http://localhost:6969/api/auth/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          alert("Registration Successful!");
          navigate("/login");
        } else {
          setErrorMessage("Registration failed! Please try again.");
        }
      })
      .catch((error) => {
        console.error("Registration Error:", error);
        const errorMsg = error.response?.data;
        setErrorMessage(typeof errorMsg === "string" ? errorMsg : "Something went wrong. Please try again.");
      });
  };

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
    setDropdownOpen(false);
  };

  return (
    <>
      <div className="signup-wrapper">
        <div className="signup-card">
          <Link to="/login" className="signup-link">
            Back
          </Link>
          <h2 className="signup-header">Create an Account</h2>
          <form className="signup-form" onSubmit={handleSignupSuccess}>
            {errorMessage && <p className="signup-error-message">{errorMessage}</p>}
            <div>
              <label>Role</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="signup-input-field"
                >
                  {role}
                </button>
                {dropdownOpen && (
                  <div className="role-dropdown">
                    {["Farmer", "Customer"].map((roleItem) => (
                      <div
                        key={roleItem}
                        onClick={() => selectRole(roleItem)}
                        className="role-option"
                      >
                        {roleItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <FaRegUser />
            <label>First Name</label>
            <input className="signup-input-field" type="text" placeholder="First Name" ref={firstNameRef} required />
            <FaRegUser />
            <label>Last Name</label>
            <input className="signup-input-field" type="text" placeholder="Last Name" ref={lastNameRef} required />
            <MdOutlineMailOutline />
            <label>Email</label>
            <input className="signup-input-field" type="email" placeholder="Email" ref={emailRef} required />
            <IoPhonePortraitOutline />
            <label>Phone</label>
            <input className="signup-input-field" type="tel" placeholder="Phone Number" ref={mobileRef} required />
            <IoKeyOutline />
            <label>Password</label>
            <input className="signup-input-field" type="password" placeholder="Password" ref={passwordRef} required />
            <IoKeyOutline />
            <label>Confirm Password</label>
            <input className="signup-input-field" type="password" placeholder="Confirm Password" ref={confirmPasswordRef} required />
            <button type="submit" className="signup-btn">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}