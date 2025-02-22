import React, { useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Image,
  Modal,
  Form,
} from "react-bootstrap";
// import "./FarmerMyProfile.css";
import "./FarmerMyPofile.css";

const MyProfile = () => {
  const [user, setUser] = useState({
    name: "Farmer",
    email: "farmer@example.com",
    phone: "+91912345678",
    address: "123 Main Street, City, Country",
    role: "Dudha Seller",
    image: "https://via.placeholder.com/150", // Placeholder image
  });

  const [editData, setEditData] = useState({ ...user });
  const [showImageModal, setShowImageModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleSaveChanges = () => {
    setUser({ ...editData });
    alert("Profile updated successfully!");
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setEditData({ ...editData, image: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleOpenImageModal = () => setShowImageModal(true);
  const handleCloseImageModal = () => setShowImageModal(false);

  return (
    <Container className="my-5 Farmer-Profile-Container">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg border-0 f-card bg-light FarmerProfile-Card">
            <Card.Body>
              <Row>
                {/* Profile Picture */}
                <Col md={4} className="d-flex justify-content-center align-items-center">
                  <Image
                    src={editData.image}
                    roundedCircle
                    fluid
                    style={{ width: "150px", height: "150px", objectFit: "cover" }}
                  />
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="mt-3 Pedit-btn"
                    onClick={handleOpenImageModal}
                  >
                    Edit Picture
                  </Button>
                </Col>

                {/* Profile Details */}
                <Col md={8}>
                  <h3 className="text-center text-md-start">Edit Profile</h3>
                  <hr />
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={editData.email}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone</Form.Label>
                      <Form.Control
                        type="text"
                        name="phone"
                        value={editData.phone}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        value={editData.address}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        type="text"
                        name="role"
                        value={editData.role}
                        onChange={handleInputChange}
                      />
                    </Form.Group>
                    <div className="text-end">
                      <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit Profile Picture Modal */}
      <Modal show={showImageModal} onHide={handleCloseImageModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Upload New Picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseImageModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseImageModal}>
            Save Picture
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MyProfile;





