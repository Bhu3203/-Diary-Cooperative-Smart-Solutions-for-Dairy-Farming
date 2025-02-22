import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./AdminDashboard.css";

import CattleFeedForm from "./CattleFeedForm";
import FarmerLoan from "./FarmerLoan";
import FarmerRecord from "./FarmerRecord";
import CustMilkDetails from "./CustMilkDetails";
import Add_Milk_Record from "./Add_Milk_Record";
import Add_User_Milk_Details from "./Add_User_Milk_Details";
import AddMilkRecord from "./AddMilkRecord";
import LoanAndFeedRecord from "./LoanAndFeedRecord";
import Dash from "./Dash";
import MilkReport from "./MilkReport";
import ProductUpload from "./Product/ProductUpload";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/admindash/adminprofile");
  };

  const handleLogoutClick = () => {
    setShowModal(true);
  };

  const handleLogoutConfirm = () => {
    setShowModal(false);
    navigate("/Main");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Add_Milk_Record":
        return <Add_Milk_Record />;
      case "CattleFeedForm":
        return <CattleFeedForm />;
      case "FarmerLoan":
        return <FarmerLoan />;
      case "AddMilkRecord":
        return <AddMilkRecord />;
      case "FarmerRecord":
        return <FarmerRecord />;
      case "LoanAndFeedRecord":
        return <LoanAndFeedRecord />;
      case "Add_User_Milk_Details":
        return <Add_User_Milk_Details />;
      case "CustMilkDetails":
        return <CustMilkDetails />;
      case "milkreport":
        return <MilkReport />;
      case "productupload":
        return <ProductUpload />;
      default:
        return <Dash />;
    }
  };

  return (
    <div className="admin-dashboard">
      <nav style={styles.navbar}>
        <div style={styles.left}>
          <h1 style={styles.logo}>Sadguru Digitalization</h1>
        </div>
        <div style={styles.right}>
          <FaUserCircle
            size={30}
            style={styles.profileIcon}
            onClick={handleProfileClick}
          />
          <button style={styles.logoutButton} onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      </nav>
      <ConfirmationModal
        isOpen={showModal}
        onClose={handleModalClose}
        onConfirm={handleLogoutConfirm}
      />
      {/* Sidebar */}
      <div className="dashboard-container">
        <aside className="sidebar">
          <button onClick={() => setActiveTab("Dash")}>Dashboard</button>
          <h5>Farmer</h5>
          <button onClick={() => setActiveTab("Add_Milk_Record")}>
            Add Milk Record
          </button>
          <button onClick={() => setActiveTab("CattleFeedForm")}>
            Cattle Feed Form
          </button>
          <button onClick={() => setActiveTab("FarmerLoan")}>
            Farmer Loan
          </button>
          <button onClick={() => setActiveTab("AddMilkRecord")}>
            Show Milk Record
          </button>
          <button onClick={() => setActiveTab("FarmerRecord")}>
            Farmer Record
          </button>
          <button onClick={() => setActiveTab("milkreport")}>
             Record
          </button>
          <button onClick={() => setActiveTab("LoanAndFeedRecord")}>
            Loan and Feed Record
          </button>

          <h5 className="mt-3">Customer</h5>
          <button onClick={() => setActiveTab("Add_User_Milk_Details")}>
            Add User Milk Details
          </button>
          <button onClick={() => setActiveTab("CustMilkDetails")}>
            Customer Milk Details
          </button>
          <h5 className="mt-3">Product</h5>
          <button onClick={() => setActiveTab("productupload")}>Product</button>
        </aside>

        {/* Main Content */}
        <main className="content">{renderContent()}</main>
      </div>
      Footer
      <footer className="footer">
        <p>© 2024 Sadguru Digitalization | Empowering Farmers</p>
      </footer>
    </div>
  );
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <h3>Are you sure you want to logout?</h3>
        <div style={modalStyles.buttons}>
          <button style={modalStyles.button} onClick={onConfirm}>
            Yes
          </button>
          <button style={modalStyles.button} onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#299",
    color: "#fff",
  },
  left: {
    flex: 1,
  },
  logo: {
    fontSize: "20px",
    margin: 0,
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  profileIcon: {
    color: "#fff",
    cursor: "pointer",
    marginRight: "10px",
  },
  logoutButton: {
    backgroundColor: "#f00",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "300px",
  },
  buttons: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default AdminDashboard;
