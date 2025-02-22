import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LoanAndFeedRecord() {
  const [feedRecords, setFeedRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const unitPrice = 30; // Price per unit (kg)
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
    const fetchFeedRecords = async () => {
      try {
        const response = await axios.get("http://localhost:6969/api/farmer/allFeedRecord",{
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${token}`,
          },
        });
        const enrichedFeeds = response.data.map((record) => ({
          farmerId: record.farmerId,
          farmerName: record.farmerName || "", // Handle missing farmerName
          feedType: record.feedName, // Use feedName from API
          quantity: record.quantity,
          unitPrice: unitPrice, // Set unit price
          totalCost: record.quantity * unitPrice,
          amountPaid: 0, // Initialize amountPaid
          amountLeft: record.quantity * unitPrice, // Initialize amountLeft
          supplier: record.supplierName,
          date: record.date, // Include date
          remarks: "Pending",
        }));
        setFeedRecords(enrichedFeeds);
      } catch (error) {
        console.error("Error fetching feed records:", error);
        // Handle error (e.g., display an error message)
      }
    };

    fetchFeedRecords();
  }, []);

  const filteredRecords = feedRecords.filter(
    (record) =>
      record.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.farmerId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAmountPaidChange = (index, value) => {
    const updatedRecords = [...feedRecords];
    const amountPaid = parseFloat(value) || 0;
    updatedRecords[index].amountPaid = amountPaid;
    updatedRecords[index].amountLeft = updatedRecords[index].totalCost - amountPaid;
    setFeedRecords(updatedRecords);
  };

  return (
    <div>
      <h1>Cattle Feed Management</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Farmer Name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "8px", width: "300px" }}
        />
      </div>

      <table
        border="1"
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Farmer ID</th>
            <th>Farmer Name</th>
            <th>Feed Type</th>
            <th>Quantity (kg)</th>
            <th>Unit Price (₹)</th>
            <th>Total Cost (₹)</th>
            <th>Amount Paid (₹)</th>
            <th>Amount Left (₹)</th>
            <th>Supplier</th>
            <th>Date</th> {/* Added Date column */}
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.farmerId}</td>
              <td>{record.farmerName}</td>
              <td>{record.feedType}</td>
              <td>{record.quantity}</td>
              <td>{record.unitPrice}</td>
              <td>{record.totalCost}</td>
              <td>
                <input
                  type="number"
                  value={record.amountPaid}
                  onChange={(e) => handleAmountPaidChange(index, e.target.value)}
                  style={{ width: "80px" }}
                />
              </td>
              <td>{record.amountLeft}</td>
              <td>{record.supplier}</td>
              <td>{record.date}</td> {/* Display date */}
              <td>{record.remarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}