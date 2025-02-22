import React, { useState } from "react";
import "./Add_Milk_Record.css";
import axios from "axios";

const Add_Milk_Record = () => {
  const [formData, setFormData] = useState({
    farmerId: "",
    farmerName: "",
    time: "M",
    cattle: "cow",
    litre: 0,
    fat: 0,
    snf: 0,
   
  });

  const [errorMessage, setErrorMessage] = useState("");


  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };

   

      return updatedData;
    });
  };

  // Fetch Farmer Name based on Farmer ID
  const fetchFarmer = async () => {
    const token = localStorage.getItem("token");
    if (!formData.farmerId) {
      alert("Please enter a Farmer ID!");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:6969/api/farmer/getFarmerName/${formData.farmerId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`,
          },
        }
      );

      setFormData((prev) => ({
        ...prev,
        farmerName: response.data,
      }));
    } catch (error) {
      console.error("Error fetching farmer data:", error);
      alert("Farmer not found or server error.");
      setFormData((prev) => ({
        ...prev,
        farmerName: "",
      }));
    }
  };

  // Handle Submit (Submit Milk Record to Backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    if (!formData.farmerId || !formData.farmerName) {
      setErrorMessage("Please fetch a valid Farmer ID before submitting.");
      return;
    }

   
      const milk_record = {
        farmerId: formData.farmerId,
        time: formData.time,
        cattle: formData.cattle,
        litre: formData.litre,
        fat: formData.fat,
        snf: formData.snf,
      
      };

      axios
      .post("http://localhost:6969/api/farmer/addRecord", milk_record, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Milk Record Added:", milk_record); 
          alert("Milk record saved successfully!");
    
         
          setFormData({
            farmerId: "",
            farmerName: "",
            time: "M",
            cattle: "cow",
            litre: 0,
            fat: 0,
            snf: 0,
          });
        } else {
          setErrorMessage("Error saving the milk record. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error submitting the record:", error);
        const errorMsg = error.response?.data;
        setErrorMessage(typeof errorMsg === "string" ? errorMsg : "Something went wrong. Please try again.");
      });
    
  }

  return (
    <div className="milk-collection">
      <form onSubmit={handleSubmit}>
        <h2>Add Milk Record</h2>

        {/* Farmer ID Input */}
        <label htmlFor="farmerId">Farmer ID:</label>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            id="farmerId"
            name="farmerId"
            value={formData.farmerId}
            onChange={handleInputChange}
            placeholder="Enter Farmer ID"
            required
          />
          <button type="button" onClick={fetchFarmer} className="btn-fetch">
            Fetch Farmer
          </button>
        </div>
        {errorMessage && <p style={{ color: "red", marginTop: "5px" }}>{errorMessage}</p>}

        {/* Farmer Name */}
        <label htmlFor="farmerName">Farmer Name:</label>
        <input
          type="text"
          id="farmerName"
          name="farmerName"
          value={formData.farmerName}
          readOnly
          placeholder="Farmer Name"
        />

        {/* Time */}
        <label htmlFor="time">Time:</label>
        <select id="time" name="time" value={formData.time} onChange={handleInputChange} required>
          <option value="M">Morning</option>
          <option value="E">Evening</option>
        </select>

        {/* Cattle */}
        <label htmlFor="cattle">Cattle:</label>
        <select id="cattle" name="cattle" value={formData.cattle} onChange={handleInputChange} required>
          <option value="cow">Cow</option>
          <option value="buffalo">Buffalo</option>
        </select>

        {/* Litre */}
        <label htmlFor="litre">Litre:</label>
        <input type="number" id="litre" name="litre" value={formData.litre} onChange={handleInputChange} />

        {/* Fat */}
        <label htmlFor="fat">Fat:</label>
        <input type="number" id="fat" name="fat" value={formData.fat} onChange={handleInputChange} />

        {/* SNF */}
        <label htmlFor="snf">SNF:</label>
        <input type="number" id="snf" name="snf" value={formData.snf} onChange={handleInputChange} />

        {/* Submit Button */}
        <button type="submit" className="btn1">
          Save
        </button>
      </form>
    </div>
  );
};

export default Add_Milk_Record;
