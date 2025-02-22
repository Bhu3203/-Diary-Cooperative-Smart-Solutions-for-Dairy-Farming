import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./MilkReport.css";

const MilkReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { farmerRecords } = location.state || { farmerRecords: [] };


  const totalEntries = farmerRecords.length;
  const avgFat =
    totalEntries > 0
      ? (
          farmerRecords.reduce((sum, record) => sum + parseFloat(record.fat || 0), 0) /
          totalEntries
        ).toFixed(2)
      : "0.00";
  const avgSNF =
    totalEntries > 0
      ? (
          farmerRecords.reduce((sum, record) => sum + parseFloat(record.snf || 0), 0) /
          totalEntries
        ).toFixed(2)
      : "0.00";
  const avgRate =
    totalEntries > 0
      ? (
          farmerRecords.reduce((sum, record) => sum + parseFloat(record.totalAmount || 0), 0) /
          farmerRecords.reduce((sum, record) => sum + parseFloat(record.litre || 1), 1)
        ).toFixed(2)
      : "0.00";
  const totalWeight = farmerRecords.reduce(
    (sum, record) => sum + parseFloat(record.litre || 0),
    0
  );
  const totalAmount = farmerRecords.reduce(
    (sum, record) => sum + parseFloat(record.totalAmount || 0),
    0
  );

  return (
    <div className="milk-report">
      <header className="report-header">
        <h1>Milk Report for Farmer</h1>
        <button className="switch-lang">Switch to Marathi</button>
      </header>

      <section className="milk-totals">
        <h2>Milk Totals</h2>
        <table>
          <thead>
            <tr>
              <th>DATE</th>
              <th>SESSION</th>
              <th>FAT</th>
              <th>SNF</th>
              <th>RATE/LITER</th>
              <th>WEIGHT</th>
              <th>TOTAL BONUS</th>
              <th>TOTAL AMOUNT ₹</th>
            </tr>
          </thead>
          <tbody>
            {farmerRecords.map((record, index) => (
              <tr key={index}>
                <td>{record.date}</td>
                <td>{record.time}</td>
                <td>{record.fat}</td>
                <td>{record.snf}</td>
                <td>{(record.totalAmount / record.litre || 0).toFixed(2)}</td>
                <td>{record.litre}</td>
                <td>0</td>
                <td>₹ {record.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="averages-totals">
        <h2>Averages & Totals</h2>
        <table>
          <tbody>
            <tr>
              <td>Avg. Fat</td>
              <td>{avgFat}</td>
            </tr>
            <tr>
              <td>Avg. SNF</td>
              <td>{avgSNF}</td>
            </tr>
            <tr>
              <td>Avg. Rate/Liter</td>
              <td>{avgRate}</td>
            </tr>
            <tr>
              <td>Total Weight</td>
              <td>{totalWeight}</td>
            </tr>
            <tr>
              <td>Total Amount</td>
              <td>₹ {totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="report-footer">
        <button className="download-btn">Download PDF</button>
        <button className="cancel-btn" onClick={() => navigate(-1)}>
          Back
        </button>
        <p>Bill Generation Date: {new Date().toLocaleString()}</p>
      </footer>
    </div>
  );
};

export default MilkReport;
