import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BankDetails.css";

const BankDetailsPage = () => {
    const [errorMessage, setErrorMessage] = useState("");
    const accountHolderNameRef = useRef();
    const bankNameRef = useRef();
    const branchNameRef = useRef();
    const accountNumberRef = useRef();
    const ifscCodeRef = useRef();
    const swiftCodeRef = useRef();
    const navigate = useNavigate();
  
    const handleBankDetailsSubmit = (event) => {
      event.preventDefault();
      setErrorMessage("");
  
      const accountHolderName = accountHolderNameRef.current.value.trim();
      const bankName = bankNameRef.current.value.trim();
      const branchName = branchNameRef.current.value.trim();
      const accountNumber = accountNumberRef.current.value.trim();
      const ifscCode = ifscCodeRef.current.value.trim();
      const swiftCode = swiftCodeRef.current.value.trim();
  
      if (
        !accountHolderName ||
        !bankName ||
        !accountNumber ||
        !ifscCode ||
        !swiftCode
      ) {
        setErrorMessage("All fields are required!");
        return;
      }
  
      if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(accountHolderName)) {
        setErrorMessage("Please Enter a valid account holder name!");
        return;
      }
  
      if (!/^[0-9]{9,18}$/.test(accountNumber)) {
        setErrorMessage("Please Enter a valid account number!");
        return;
      }
  
      if (!/^[A-Za-z]{4}[0-9]{7}$/.test(ifscCode)) {
        setErrorMessage("Please Enter a valid IFSC code!");
        return;
      }
  
      if (!/^[A-Za-z]{4}[0-9]{2}[A-Za-z0-9]{10}$/.test(swiftCode)) {
        setErrorMessage("Please Enter a valid SWIFT/BIC code!");
        return;
      }
  
      console.log("Account Holder Name:", accountHolderName);
      console.log("Bank Name:", bankName);
      console.log("Branch Name:", branchName);
      console.log("Account Number:", accountNumber);
      console.log("IFSC Code:", ifscCode);
      console.log("SWIFT/BIC Code:", swiftCode);
  
      navigate("/farmerlogin"); // Navigate to a confirmation page or another route after successful submission
    };
  
    return (
      <>
        <div className="bankdetails-wrapper">
          <div className="bankdetails-card">
            <Link to="/signup" className="bankdetails-link">
              Back
            </Link>
            <br />
            <h2 className="bankdetails-header">Enter Bank Details</h2>
            <form className="bankdetails-form" onSubmit={handleBankDetailsSubmit}>
              {errorMessage && (
                <p className="bankdetails-error-message">{errorMessage}</p>
              )}
              <input
                className="bankdetails-input-field"
                type="text"
                placeholder="Account Holder Name"
                ref={accountHolderNameRef}
                required
              />
              <input
                className="bankdetails-input-field"
                type="text"
                placeholder="Bank Name"
                ref={bankNameRef}
                required
              />
              <input
                className="bankdetails-input-field"
                type="text"
                placeholder="Branch Name (Optional)"
                ref={branchNameRef}
              />
              <input
                className="bankdetails-input-field"
                type="text"
                placeholder="Account Number"
                ref={accountNumberRef}
                required
              />
              <input
                className="bankdetails-input-field"
                type="text"
                placeholder="IFSC Code"
                ref={ifscCodeRef}
                required
              />
              <input
                className="bankdetails-input-field"
                type="text"
                placeholder="SWIFT/BIC Code"
                ref={swiftCodeRef}
                required
              />
              <button type="submit" className="bankdetails-btn">
                Submit
              </button>
            </form>
            <div className="bankdetails-footer">
              <p>
                Need help?{" "}
                <Link to="/farmerlogin" className="bankdetails-link">
                  Contact Support
                </Link>
              </p>
            </div>
          </div>
        </div>
      </>
  
  );
};

export default BankDetailsPage;
