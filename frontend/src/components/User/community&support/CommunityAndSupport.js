// Import React and required modules
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./CommunityAndSupport.css";

const CommunityAndSupport = () => {
  return (
    <div className="container mt-5 communitySupport-Cont">
      {/* Page Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Community and Support</h1>
        <p className="text-muted">Connect with veterinary experts, access resources, and learn best practices.</p>
      </div>

      {/* Connect with Veterinary Doctors Section */}
      <div className="card shadow-sm mb-5 communitySCard">
        <div className="card-header bg-primary text-white">
          <h4>Connect with Veterinary Doctors</h4>
        </div>
        <div className="card-body">
          <p>Get professional advice from veterinary experts for your cattle's health.</p>
          <button className="btn btn-primary">Find a Vet</button>
        </div>
      </div>

      {/* Resources and Articles Section */}
      <div className="card shadow-sm mb-5 communitySCard">
        <div className="card-header bg-success text-white">
          <h4>Resources and Articles</h4>
        </div>
        <div className="card-body">
          <p>Access a curated collection of articles, best practices, and training materials to enhance your knowledge.</p>
          <button className="btn btn-success">Explore Resources</button>
        </div>
      </div>

      {/* Video Support Section */}
      <div className="card shadow-sm communitySCard">
        <div className="card-header bg-info text-white">
          <h4>Video Support</h4>
        </div>
        <div className="card-body">
          <p>Watch videos to understand complex topics and improve your skills.</p>
          {/* <div className="mb-3">
            <label htmlFor="videoUpload" className="form-label">Upload a Video</label>
            <input type="file" className="form-control" id="videoUpload" accept="video/*" />
          </div>
          <button className="btn btn-info">Upload Video</button> */}
        </div> 
      </div>
    </div>
  );
};

export default CommunityAndSupport;
