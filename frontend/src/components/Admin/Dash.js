import React, { useState, useEffect, useMemo } from "react";
import "./Dash.css";
import axios from "axios";
import { Eye, Trash2 } from "lucide-react";

function Dash() {
    const [filterCategory, setFilterCategory] = useState("");
    const [filterStatus, setFilterStatus] = useState("");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
          const token = localStorage.getItem("token");
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get("http://localhost:6969/api/user/all", {
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`,
                  },
                });
                setUsers(response.data);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    const filteredUsers = useMemo(() => {
        return users.filter(
            (user) =>
                (filterCategory === "" || user.roles?.[0]?.name === filterCategory) &&
                (filterStatus === "" || user.status === filterStatus)
        );
    }, [filterCategory, filterStatus, users]);

    const totalUsers = useMemo(() => users.length, [users]);

    const handleViewClick = (user) => {
        setSelectedUser(user);
    };

    const handleClosePopup = () => {
        setSelectedUser(null);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:6969/api/user/delete/${userId}`);
            const updatedUsers = users.filter(user => user.id !== userId);
            setUsers(updatedUsers);
            alert("User deleted successfully");

        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Error deleting user. Please try again.");
        }
    };

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="dashboard">
          
            <h1>Milk Rate Dashboard</h1>


<div className="stats">
  {/* <div className="stat-card">
    <h3>Total Registered Farmers</h3>
    <p>{totalRegisteredFarmers}</p>
  </div> */}
  <div className="stat-card">
    <h3>Total Registered Users</h3>
    <p>{totalUsers}</p>
  </div>
  <div className="stat-card">
    <h3>Total Milk Collected (Cow)</h3>
    <p> 1500  Litre</p>
    {/* <p>{totalMilkCow} Liters</p> */}
  </div>
  <div className="stat-card">
    <h3>Total Milk Collected (Buffalo)</h3>
    <p> 2000  Litre</p>
    {/* <p>{totalMilkBuffalo} Liters</p> */}
  </div>
  <div className="stat-card">
    <h3>Total SNF Collected</h3>
    <p> Liters</p>
    {/* <p>{totalSNF} Liters</p> */}
  </div>
  </div>
            <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="text-left px-4 py-2 border-b">No.</th>
                        <th className="text-left px-4 py-2 border-b">First Name</th>
                        <th className="text-left px-4 py-2 border-b">Last Name</th>
                        <th className="text-left px-4 py-2 border-b">Email</th>
                        <th className="text-left px-4 py-2 border-b">Role</th>
                        <th className="text-left px-4 py-2 border-b">Mobile No</th>
                        <th className="text-left px-4 py-2 border-b">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-4 py-2 border-b">{index + 1}</td>
                            <td className="px-4 py-2 border-b">{user.firstName}</td>
                            <td className="px-4 py-2 border-b">{user.lastName}</td>
                            <td className="px-4 py-2 border-b">{user.email}</td>
                            <td className="px-4 py-2 border-b">{user.roles?.[0]?.name || "N/A"}</td>
                            <td className="px-4 py-2 border-b">{user.mobile}</td>
                            <td className="px-4 py-2 border-b flex gap-2">
                                <button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => handleViewClick(user)}>
                                    <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete(user.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

    
            {selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-xl font-semibold mb-4">User Details</h2>
                        <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                        <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Mobile No:</strong> {selectedUser.mobileNo}</p>
                        <p><strong>Role:</strong> {selectedUser.roles?.[0]?.name || "N/A"}</p>
                        {/* ... other details */}
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleClosePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dash;