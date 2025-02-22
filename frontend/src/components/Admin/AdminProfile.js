import React from "react";

const AdminProfile = () => {
  const admin = {
    name: "Bhushan Jadhav",
    idNo: "A98765",
    photo: "https://via.placeholder.com/150",
    mobile: "+1-987-654-3210",
    email: "Bhushanjadhav@example.com",
    role: "Administrator",
    experience: "2 years",
  };

  return (
    <div className="admin-profile">
      <h2 className="heading">Admin Profile</h2>
      <div className="card">
        <div className="card-left">
          <img src={admin.photo} alt="Admin" className="profile-photo" />
        </div>
        <div className="card-right">
          <h3>{admin.name}</h3>
          <p>
            <strong>ID No:</strong> {admin.idNo}
          </p>
          <p>
            <strong>Mobile:</strong> {admin.mobile}
          </p>
          <p>
            <strong>Email:</strong> {admin.email}
          </p>
          <p>
            <strong>Role:</strong> {admin.role}
          </p>
          <p>
            <strong>Experience:</strong> {admin.experience}
          </p>
        </div>
      </div>

      <style jsx>{`
        .admin-profile {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 8px;
          background-color: #f9f9f9;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .heading {
          text-align: center;
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }

        .card {
          display: flex;
          flex-direction: row;
          padding: 20px;
          border-radius: 8px;
          background-color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .card-left {
          flex: 1;
          text-align: center;
        }

        .profile-photo {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
        }

        .card-right {
          flex: 2;
          padding-left: 20px;
        }

        .card-right h3 {
          margin-bottom: 10px;
          font-size: 20px;
          color: #333;
        }

        .card-right p {
          margin: 5px 0;
          font-size: 16px;
        }

        .card-right strong {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default AdminProfile;
