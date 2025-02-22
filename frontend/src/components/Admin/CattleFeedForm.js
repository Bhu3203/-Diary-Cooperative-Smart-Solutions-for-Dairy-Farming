import React, { useState } from "react";
import "./CattleFeedForm.css";
import axios from "axios";

const CattleFeedForm = () => {
  const [formData, setFormData] = useState({
    farmerId: "",
    farmerName: "",
    feedName: "",
    quantity: "",
    supplierName: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    console.log(token);
    if (!formData.farmerId || !formData.farmerName) {
      setErrorMessage("Please fetch a valid Farmer ID before submitting.");
      return;
    }

    const feed_record = {
      farmerId: parseInt(formData.farmerId),
      feedName: formData.feedName,
      quantity: parseInt(formData.quantity) || 0,
      supplierName: formData.supplierName,
    };

    console.log("Sending:", feed_record);

    axios
      .post("http://localhost:6969/api/farmer/addFeed", feed_record, {
        headers: {
          // "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Response:", response.data);
        if (response.status === 200 || response.status === 201) {
          console.log("Feed Record Added:", feed_record);
          alert("Feed record saved successfully!");

          setFormData({
            farmerId: "",
            farmerName: "",
            feedName: "",
            quantity: "",
            supplierName: "",
          });
        } else {
          setErrorMessage(`Error saving the feed record. Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Error submitting the record:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          setErrorMessage(error.response.data.message || "Server Error");
        } else if (error.request) {
            console.error("Request error:", error.request);
            setErrorMessage("No response from the server.");
        } else {
            console.error("Axios setup error:", error.message);
            setErrorMessage("Request setup error.");
        }
      });
  };

  return (
    <div className="cattle-feed-container">
      <h2>Cattle Feed Record Form</h2>
      <form onSubmit={handleSubmit} className="cattle-feed-form">
        <label>
          Farmer ID:
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              name="farmerId"
              value={formData.farmerId}
              onChange={handleChange}
              placeholder="Enter Farmer ID"
              required
            />
            <button type="button" onClick={fetchFarmer} className="btn-fetch">
              Fetch Farmer
            </button>
          </div>
          {errorMessage && <p style={{ color: "red", marginTop: "5px" }}>{errorMessage}</p>}
        </label>

        <label>
          Farmer Name:
          <input type="text" name="farmerName" value={formData.farmerName} readOnly placeholder="Farmer Name" />
        </label>

        <label>
          Feed Type:
          <select name="feedName" value={formData.feedName} onChange={handleChange} required>
            <option value="">Select Feed Type</option>
            <option value="Grain Feed">Grain Feed</option>
            <option value="Silage">Silage</option>
            <option value="Hay">Hay</option>
            <option value="Concentrate Feed">Concentrate Feed</option>
          </select>
        </label>

        <label>
          Quantity (kg):
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </label>

        <label>
          Supplier Name:
          <input
            type="text"
            name="supplierName"
            value={formData.supplierName}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-btn">
          Save Record
        </button>
      </form>
    </div>
  );
};

export default CattleFeedForm;