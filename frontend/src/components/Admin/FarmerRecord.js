import React, { useState, useEffect } from "react";
import "./FarmerRecord.css";
import { useNavigate } from "react-router-dom";
import MilkReport from "./MilkReport";
import axios from "axios";

export default function FarmerRecord() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFarmerId, setSelectedFarmerId] = useState("");
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
    console.log(token);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMilkRecords = async () => {
      setLoading(true);
      setError(null);
      setRecords([]);
      setFilteredRecords([]);

      try {
        if (selectedFarmerId.trim()) {
          const response = await axios.get(`http://localhost:6969/api/farmer/${selectedFarmerId}`,{
            headers: {
              "Content-Type": "application/json",
              "Authorization":`Bearer ${token}`,
            },
          });

          if (response.data && response.data.length > 0) {
            setRecords(response.data);
            setFilteredRecords(response.data);
          } else {
            setRecords([]);
            setFilteredRecords([]);
            setError("No records found for this farmer.");
          }
        } else {
          setRecords([]);
          setFilteredRecords([]);
        }
      } catch (err) {
        console.error("Error fetching records:", err);
        setError("Error loading milk records. Please check the Farmer ID.");
      } finally {
        setLoading(false);
      }
    };

    fetchMilkRecords();
  }, [selectedFarmerId]);

  useEffect(() => {
    let filtered = [...records];

    if (startDate && endDate) {
      filtered = filtered.filter((record) => {
        const recordDate = new Date(record.date);
        return recordDate >= new Date(startDate) && recordDate <= new Date(endDate);
      });
    }

    setFilteredRecords(filtered);
  }, [startDate, endDate, records]);

  const handleGenerateReport = () => {
    if (filteredRecords.length === 0) {
      alert("No records found to generate the report. Please refine your search criteria.");
      return;
    }
    alert("Generating the report");
    
    navigate("/admindash/milkreport", {
      state: { farmerRecords: filteredRecords },
    });
    return <MilkReport />;
  };

  if (loading) {
    return <div className="loading">Loading milk records...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="milk-record-container">
      <div className="filters">
        <label>
          Select Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Select End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <label>
          Search by Farmer ID:
          <input
            type="text"
            value={selectedFarmerId}
            onChange={(e) => setSelectedFarmerId(e.target.value)}
            placeholder="Enter Farmer ID"
          />
        </label>
        <button onClick={handleGenerateReport}>Generate Report</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Cattle</th>
              <th>Milk (Ltr)</th>
              <th>Fat</th>
              <th>SNF</th>
              <th>Total Amount</th>
              <th>Farmer ID</th>
              <th>Farmer Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.time}</td>
                  <td>{record.cattle}</td>
                  <td>{record.litre}</td>
                  <td>{record.fat}</td>
                  <td>{record.snf}</td>
                  <td>{record.totalAmount}</td>
                  <td>{record.farmerId}</td>
                  <td>{record.farmerName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  {selectedFarmerId.trim() ? "No records found for this farmer/date range." : "Enter a Farmer ID to view records."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="footer-stats">
        <table>
          <thead>
            <tr>
              <th>Total & Avg</th>
              <th>Total Entries</th>
              <th>Avg FAT</th>
              <th>Avg SNF</th>
              <th>Avg Degree/%</th>
              <th>Total Milk (Ltr)</th>
              <th>Total Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Summary</td>
              <td>{filteredRecords.length}</td>
              <td>
                {filteredRecords.length > 0
                  ? (
                      filteredRecords.reduce(
                        (sum, record) => sum + parseFloat(record.fat || 0),
                        0
                      ) / filteredRecords.length
                    ).toFixed(2)
                  : "0.00"}
              </td>
              <td>
                {filteredRecords.length > 0
                  ? (
                      filteredRecords.reduce(
                        (sum, record) => sum + parseFloat(record.snf || 0),
                        0
                      ) / filteredRecords.length
                    ).toFixed(2)
                  : "0.00"}
              </td>
              <td>--</td>
              <td>
                {filteredRecords.reduce(
                  (sum, record) => sum + parseFloat(record.litre || 0),
                  0
                )}
              </td>
              <td>
                {filteredRecords.reduce(
                  (sum, record) => sum + parseFloat(record.totalAmount || 0),
                  0
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}