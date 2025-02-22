import React, { useEffect, useState } from "react";
import "./Add_Milk_Record.css";
import axios from "axios";

const AddMilkRecord = () => {
    const [records, setRecords] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchMilkRecords = async () => {
            setLoading(true);
            setErrorMessage("");

            try {
                const response = await axios.get("http://localhost:6969/api/farmer/allRecord", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                setRecords(response.data);
            } catch (error) {
                console.error("Error fetching milk records:", error);
                if (error.response) {
                    setErrorMessage(`Error: ${error.response.status} - ${error.response.data?.message || "Failed to fetch records."}`);
                } else if (error.request) {
                    setErrorMessage("Error: No response from the server.");
                } else {
                    setErrorMessage("Error: Request setup failed.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchMilkRecords();
    }, []);

    const totalMilk = records.reduce((sum, record) => sum + parseFloat(record.litre || 0), 0);
    const totalAmount = records.reduce((sum, record) => sum + parseFloat(record.totalAmount || 0), 0);
    const avgFat = records.length > 0
        ? (records.reduce((sum, record) => sum + parseFloat(record.fat || 0), 0) / records.length).toFixed(2)
        : "0.00";
    const avgSNF = records.length > 0
        ? (records.reduce((sum, record) => sum + parseFloat(record.snf || 0), 0) / records.length).toFixed(2)
        : "0.00";

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(records.length / recordsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    if (loading) {
        return <div className="loading">Loading milk records...</div>;
    }

    if (errorMessage) {
        return <div className="error-message">{errorMessage}</div>;
    }

    return (
        <div className="container5">
            <h2 className="text-center">Milk Records</h2>
            <div className="col">
            
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Animal</th>
                            <th>Milk (Ltr)</th>
                            <th>Fat</th>
                            <th>SNF</th>
                            <th>Farmer</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((record, index) => (
                            <tr key={index}>
                                <td>{record.date}</td>
                                <td>{record.time}</td>
                                <td>{record.cattle}</td>
                                <td>{record.litre}</td>
                                <td>{record.fat}</td>
                                <td>{record.snf}</td>
                                <td>{record.farmerName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           

            {/* Pagination Controls */}
            <ul className="pagination">
                <li className={currentPage === 1 ? "disabled" : ""}>
                    <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                </li>
                {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i} className={currentPage === i + 1 ? "active" : ""}>
                        <button onClick={() => paginate(i + 1)}>
                            {i + 1}
                        </button>
                    </li>
                ))}
                <li className={currentPage === totalPages ? "disabled" : ""}>
                    <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                        Next
                    </button>
                </li>
            </ul>
            <div>
                <p>Total Milk: {totalMilk.toFixed(2)} Ltr</p>
                <p>Average Fat: {avgFat}</p>
                <p>Average SNF: {avgSNF}</p>
            </div>
        </div>
    );
};

export default AddMilkRecord;