import React, { useState, useEffect } from "react";
import "./FarmerLoan.css";

const FarmerLoan = () => {
  const [farmerName, setFarmerName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanReason, setLoanReason] = useState("");
  const [loans, setLoans] = useState([]);


  useEffect(() => {
    const storedLoans = JSON.parse(localStorage.getItem("farmerLoans")) || [];
    setLoans(storedLoans);
  }, []);


  useEffect(() => {
    localStorage.setItem("farmerLoans", JSON.stringify(loans));
  }, [loans]);

  const handleAddLoan = (e) => {
    e.preventDefault();

    if (!farmerName || !loanAmount || !loanReason) {
      alert("Please fill all fields!");
      return;
    }

    const newLoan = {
      id: Date.now(),
      farmerName,
      loanAmount: parseFloat(loanAmount),
      loanReason,
      date: new Date().toLocaleDateString(),
    };

    setLoans((prev) => [...prev, newLoan]);
    setFarmerName("");
    setLoanAmount("");
    setLoanReason("");
    alert("Loan information saved successfully!");
  };

  const handleDeleteLoan = (id) => {
    const updatedLoans = loans.filter((loan) => loan.id !== id);
    setLoans(updatedLoans);
  };

  return (
    <div className="farmer-loan-container col-xl-4">
      <h2 className="text-center">Farmer Loan Manager</h2>
      <form className="farmer-loan-form" onSubmit={handleAddLoan}>
        <div className="form-group">
          <label htmlFor="farmerName">Farmer Name</label>
          <input
            type="text"
            id="farmerName"
            className="form-control"
            value={farmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            placeholder="Enter farmer name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loanAmount">Loan Amount (₹)</label>
          <input
            type="number"
            id="loanAmount"
            className="form-control"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="loanReason">Reason for Loan</label>
          <textarea
            id="loanReason"
            className="form-control"
            value={loanReason}
            onChange={(e) => setLoanReason(e.target.value)}
            placeholder="Enter reason for loan"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Add Loan
        </button>
      </form>

      <h3 className="text-center mt-4">Loan Records</h3>
      <div className="loan-records">
        {loans.length > 0 ? (
          loans.map((loan) => (
            <div key={loan.id} className="loan-record">
              <p>
                <strong>Name:</strong> {loan.farmerName}
              </p>
              <p>
                <strong>Amount:</strong> ₹{loan.loanAmount}
              </p>
              <p>
                <strong>Reason:</strong> {loan.loanReason}
              </p>
              <p>
                <strong>Date:</strong> {loan.date}
              </p>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDeleteLoan(loan.id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No loan records available.</p>
        )}
      </div>
    </div>
  );
};

export default FarmerLoan;
