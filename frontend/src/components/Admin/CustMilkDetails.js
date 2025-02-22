import React, { useState, useEffect } from "react";
import "../Admin/AddusermilkDetail.css";
import axios from "axios";

export default function CustMilkDetails() {
    const [milkData, setMilkData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10); // Number of records per page
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchMilkData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get("http://localhost:6969/api/customer/allRecord", {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const dataWithCalculatedAmounts = response.data.map(item => {
                    const pricePerLitre = item.cattle === "cow" ? 30 : (item.cattle === "buffalo" ? 42 : 0);
                    const totalAmount = item.litre * pricePerLitre;
                    return { ...item, pricePerLitre, totalAmount };
                });

                setMilkData(dataWithCalculatedAmounts);
            } catch (err) {
                console.error("Error fetching milk records:", err);
                setError(err.message || "Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchMilkData();
    }, []);

    const filteredData = milkData.filter((item) =>
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <div className="loading">Loading milk records...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="milk-display-container">
            <h2>Milk Details Records</h2>
            <input
                type="text"
                placeholder="Search by Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Cattle</th>
                        <th>Litre</th>
                        <th>P/Lit</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map((data, index) => (
                        <tr key={index}>
                            <td>{data.date}</td>
                            <td>{data.customerId}</td>
                            <td>{data.customerName}</td>
                            <td>{data.cattle}</td>
                            <td>{data.litre}</td>
                            <td>{data.pricePerLitre}</td>
                            <td>{data.totalAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination controls */}
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
        </div>
    );
}