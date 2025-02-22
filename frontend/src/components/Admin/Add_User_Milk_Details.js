import React, { useState } from "react";
import "../Admin/AddusermilkDetail.css";
import axios from "axios";

export default function Add_User_Milk_Details() {
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    time: "M",
    cattle: "cow",
    litre: 0,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomerFetched, setIsCustomerFetched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage("");
    setIsCustomerFetched(false);
  };

  const fetchCustomer = async () => {
    const token = localStorage.getItem("token");
    if (!formData.customerId) {
      alert("Please enter a Customer ID!");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.get(
        `http://localhost:6969/api/customer/getCustomerName/${formData.customerId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`,
          },
        }
      );

      setFormData((prev) => ({ ...prev, customerName: response.data }));
      setIsCustomerFetched(true);
    } catch (error) {
      console.error("Error fetching Customer data:", error);
      alert("Customer not found or server error.");
      setFormData((prev) => ({ ...prev, customerName: "" }));
      setErrorMessage("Customer not found or server error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    if (!isCustomerFetched) {
      setErrorMessage("Please fetch a valid Customer ID before submitting.");
      return;
    }

    const cust_milk_record = {
      customerId: formData.customerId,
      time: formData.time,
      cattle: formData.cattle,
      litre: formData.litre,
    };

    try {
      const response = await axios.post(
        "http://localhost:6969/api/customer/add",
        cust_milk_record,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Milk Record Added:", cust_milk_record);
        alert("Milk record saved successfully!");
        setFormData({
          customerId: "",
          customerName: "",
          time: "M",
          cattle: "cow",
          litre: 0,
        });
        setIsCustomerFetched(false); // Reset after successful submission
      } else {
        setErrorMessage("Error saving the milk record. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the record:", error);
      const errorMsg = error.response?.data;
      setErrorMessage(typeof errorMsg === "string" ? errorMsg : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="milk-collection">
      <form onSubmit={handleSubmit}>
        <h2>Add Customer Milk Record</h2>

        <label htmlFor="customerId">Customer ID:</label>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleInputChange}
            placeholder="Enter Customer ID"
            required
          />
          <button
            type="button"
            onClick={fetchCustomer}
            className="btn-fetch"
            disabled={isLoading}
          >
            {isLoading ? "Fetching..." : "Fetch Customer"}
          </button>
        </div>
        {errorMessage && <p style={{ color: "red", marginTop: "5px" }}>{errorMessage}</p>}

        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          readOnly
          placeholder="Customer Name"
        />

        <label htmlFor="time">Time:</label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          required
        >
          <option value="M">Morning</option>
          <option value="E">Evening</option>
        </select>

        <label htmlFor="cattle">Cattle:</label>
        <select
          id="cattle"
          name="cattle"
          value={formData.cattle}
          onChange={handleInputChange}
          required
        >
          <option value="cow">Cow</option>
          <option value="buffalo">Buffalo</option>
        </select>

        <label htmlFor="litre">Litre:</label>
        <input
          type="number"
          id="litre"
          name="litre"
          value={formData.litre}
          onChange={handleInputChange}
        />

        <button type="submit" className="btn1" disabled={!isCustomerFetched || isLoading}>
          Save
        </button>
      </form>
    </div>
  );
}