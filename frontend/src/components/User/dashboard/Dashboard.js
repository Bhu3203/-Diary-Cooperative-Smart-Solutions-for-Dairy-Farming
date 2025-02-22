import React, { useState } from "react";
import {
  Container, Row, Col, Card, Table, Button, Alert, Badge, Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import "../siderBar/SideBar.css";


const Dashboard = () => {
  const [notifications, setNotifications] = useState([
    "Payment of ₹5000 is due tomorrow.",
    "Milk collection scheduled for 7:00 AM on 30th Dec.",
  ]);

  const recentInvoices = [
    { id: 1, date: "2024-12-25", amount: 5000, status: "Paid" },
    { id: 2, date: "2024-12-20", amount: 3000, status: "Pending" },
  ];

  const upcomingSchedules = [
    { id: 1, date: "2024-12-30", time: "7:00 AM", quantity: "10 Liters" },
    { id: 2, date: "2024-12-31", time: "6:30 AM", quantity: "8 Liters" },
  ];


  const [qualityData, setQualityData] = useState([
    {
      id: 1,
      date: "2024-12-27",
      fatContent: 4.5,
      snf: 8.8,
      totalSolids: 13.3,
      pricePerLiter: 50,
    },
    {
      id: 2,
      date: "2024-12-26",
      fatContent: 4.0,
      snf: 8.5,
      totalSolids: 12.5,
      pricePerLiter: 48,
    },
  ]);
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Pricing is calculated based on fat content, SNF, and total solids.
    </Tooltip>
  );

  return (<>
   
    <Container className="mt-5 dashboard-Container">
      <Row className="mb-4 text-center">
        <Col>
          <h1>Member Dashboard</h1>
          <p>Overview of your recent activities and notifications.</p>
        </Col>
      </Row>





      <Row className="mb-4">
        <Col>
          <Card
            className=" border-0 Dcard"
            style={{ background: "rgba(255, 255, 240, 0.95)" }}
          >
            <Card.Body>
              <Card.Title className="Qr-title">
                Recent Milk Quality Reports & Pricing
                <OverlayTrigger placement="right" overlay={renderTooltip}>
                  <Badge
                    bg="info"
                    className="ms-2"
                    style={{ cursor: "pointer" }}
                  >
                    ?
                  </Badge>
                </OverlayTrigger>
              </Card.Title>
              <Table responsive hover>
                <thead className="table-light">
                  <tr className="Qr-headingRow">
                    <th>Date</th>
                    {/* <th>Fat (%)</th> */}
                    <th>SNF (%)</th>
                    <th>Total Solids (%)</th>
                    <th className="progress-cont">Fat (%)</th>
                    <th>Price (₹/Liter)</th>

                  </tr>
                </thead>
                <tbody>
                  {qualityData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.date}</td>
                     
                      <td>{data.snf}</td>
                      <td>{data.totalSolids}</td>
                      <td className="progress-cont">
                        <div className="progress" style={{ height: "15px", borderRadius: "8px" }}>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ 
                              width: `${Math.min(data.fatContent, 6) * 16.67}%`, // Assume max fat content is 6%
                              backgroundColor: data.fatContent >= 4.5 ? "#28a745" : "#ffc107",
                            }}
                            aria-valuenow={data.fatContent}
                            aria-valuemin="0"
                            aria-valuemax="6"
                          >
                            {data.fatContent}%
                          </div>
                        </div>
                      </td>
                      <td>{data.pricePerLiter}</td>


                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Notifications Section */}
      <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0 Dcard" style={{ background: "rgba(255, 255, 255, 0.8)" }}>
            <Card.Body>
              <Card.Title className="db-card-title">
                Notifications <Badge bg="info">{notifications.length}</Badge>
              </Card.Title>
              {notifications.length > 0 ? (
                notifications.map((note, index) => (
                  <Alert key={index} variant="warning" className="my-2">
                    {note}
                  </Alert>
                ))
              ) : (
                <p>No notifications at the moment.</p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Invoices Section */}
      {/* <Row className="mb-4">
        <Col>
          <Card className="shadow-sm border-0 Dcard" style={{ background: "rgba(255, 255, 255, 0.8)" }}>
            <Card.Body>
              <Card.Title className="db-card-title">Recent Invoices</Card.Title>
              <Table responsive hover>
                <thead className="table-light">
                  <tr className="Db-heading">
                    <th>Date</th>
                    <th>Amount (₹)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInvoices.map((invoice) => (
                    <tr key={invoice.id}>
                      <td>{invoice.date}</td>
                      <td>{invoice.amount}</td>
                      <td>
                        <Badge bg={invoice.status === "Paid" ? "success" : "danger"}>
                          {invoice.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row> */}

      {/* Upcoming Milk Schedules Section */}

    </Container>
    </>
  );
};

export default Dashboard;
