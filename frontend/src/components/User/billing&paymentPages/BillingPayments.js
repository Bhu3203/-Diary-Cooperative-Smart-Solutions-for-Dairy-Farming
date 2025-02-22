import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BillingPayments.css";

const BillingPayments = () => {
  const [data, setData] = useState([
    { id: 1, type: "Invoice", date: "2024-12-01", amount: 5000, status: "Paid", description: "Milk delivery for December", method: "UPI" },
    { id: 2, type: "Invoice", date: "2024-11-01", amount: 4000, status: "Pending", description: "Milk delivery for November", method: "Card" },
    { id: 3, type: "Payment", date: "2024-11-30", amount: 5000, method: "UPI" },
    { id: 4, type: "Payment", date: "2024-10-30", amount: 4000, method: "Card" },
    // Add more mock data here
  ]);

  const [searchMonth, setSearchMonth] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [showAllData, setShowAllData] = useState(false);

  const handleSearch = (e) => {
    setSearchMonth(e.target.value);
  };

  const handleViewDetails = (row) => {
    setSelectedRow(row);
  };

  const handleCloseModal = () => {
    setSelectedRow(null);
  };

  const handleShowAllToggle = () => {
    setShowAllData(!showAllData);
  };

  const filteredData = searchMonth
    ? data.filter((row) => {
        const rowMonth = new Date(row.date).toISOString().slice(0, 7);
        return rowMonth === searchMonth;
      })
    : data;

  const displayedData = showAllData ? data : filteredData;

  return (
    <Container className="mt-5 billing-container">
      <Row className="mb-4 text-center">
        <Col>
          <h1>Invoicing & Billing</h1>
          <p>Manage your invoices and track payment history seamlessly.</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Form.Control
            type="month"
            placeholder="Search by month"
            value={searchMonth}
            onChange={handleSearch}
            className="mb-3 search-container"
          />
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShowAllToggle} className="showAllContiner">
            {showAllData ? "Show Search Results" : "Show All Data"}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col className="col-cont">
          <Card className="shadow-sm border-0 billingCard">
            <Card.Body>
              <Card.Title className="cardTitle">Invoices & Payment History</Card.Title>
              <div className="table-container">
                <Table responsive hover>
                  <thead className="Billhead">
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount (₹)</th>
                      <th>Status/Method</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayedData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.date}</td>
                        <td>{row.type}</td>
                        <td>{row.amount}</td>
                        <td>
                          {row.type === "Invoice" ? (
                            <Badge bg={row.status === "Paid" ? "success" : "danger"}>
                              {row.status}
                            </Badge>
                          ) : (
                            row.method
                          )}
                        </td>
                        <td>
                          <Button
                            variant="info"
                            size="sm"
                            onClick={() => handleViewDetails(row)}
                          >
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}

                    {displayedData.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for Viewing Details */}
      <Modal show={!!selectedRow} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedRow?.type} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRow && (
            <>
              <p>
                <strong>Date:</strong> {selectedRow.date}
              </p>
              <p>
                <strong>Amount:</strong> ₹{selectedRow.amount}
              </p>
              {selectedRow.type === "Invoice" ? (
                <>
                  <p>
                    <strong>Status:</strong> {selectedRow.status}
                  </p>
                  <p>
                    <strong>Description:</strong> {selectedRow.description}
                  </p>
                </>
              ) : (
                <p>
                  <strong>Payment Method:</strong> {selectedRow.method}
                </p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BillingPayments;















