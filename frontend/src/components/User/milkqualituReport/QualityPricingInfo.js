


import React, { useState } from "react";
import "./QualityPricingInfo.css";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Tooltip,
  OverlayTrigger,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const QualityPricingInfo = () => {
  const [qualityData, setQualityData] = useState([
    { id: 1, date: "2024-12-27", fatContent: 4.5, snf: 8.8, totalSolids: 13.3, pricePerLiter: 50 },
    { id: 2, date: "2024-12-26", fatContent: 4.0, snf: 8.5, totalSolids: 12.5, pricePerLiter: 48 },
    { id: 3, date: "2024-12-14", fatContent: 4.0, snf: 8.5, totalSolids: 12.5, pricePerLiter: 48 },
    { id: 4, date: "2024-12-11", fatContent: 4.0, snf: 8.5, totalSolids: 12.5, pricePerLiter: 48 },
    { id: 5, date: "2024-12-23", fatContent: 4.0, snf: 8.5, totalSolids: 12.5, pricePerLiter: 48 },
    { id: 6, date: "2024-10-26", fatContent: 4.0, snf: 8.5, totalSolids: 12.5, pricePerLiter: 48 },
    { id: 7, date: "2024-12-22", fatContent: 4.0, snf: 8.5, totalSolids: 12.5, pricePerLiter: 48 },
    { id: 8, date: "2024-11-26", fatContent: 4.0, snf: 8.5, totalSolids: 12.5, pricePerLiter: 48 },
  ]);

  const [searchDate, setSearchDate] = useState("");
  const [showAll, setShowAll] = useState(false);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Pricing is calculated based on fat content, SNF, and total solids.
    </Tooltip>
  );

  const handleDateChange = (e) => setSearchDate(e.target.value);

  const filteredData = searchDate
    ? qualityData.filter((data) => data.date === searchDate)
    : showAll
    ? qualityData
    : qualityData.slice(0, 5);

  return (
    <Container className="mt-5 report-container">
      <Row className="mb-4 text-center">
        <Col>
          <h1>Quality-Based Pricing Info</h1>
          <p>Transparency in milk quality and pricing determination.</p>
        </Col>
      </Row>

      {/* Search Bar */}
      <Row className="mb-4">
        <Col md={{ span: 4, offset: 2 }}>
          <Form.Control
            type="date"
            value={searchDate}
            onChange={handleDateChange}
            placeholder="Search by Date"
            className="qualitydata-search"
          />
        </Col>
        <Col md={4}>
          <Form.Check
            type="checkbox"
            label="Show All Records"
            checked={showAll}
            onChange={() => setShowAll(!showAll)}
            className="allRecord-checkbox"
          />
        </Col>
      </Row>

      <Row>
        <Col className="col-container">
          <Card
            className="shadow-sm border-0 Qcard"
            style={{ background: "rgba(255, 255, 255, 0.9)" }}
          >
            <Card.Body className="qualityTableData">
              <Card.Title className="Qr-title">
                Milk Quality Reports & Pricing
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
              <div className="table-container">
                <Table responsive hover>
                  <thead className="table-light">
                    <tr className="Qr-headingRow">
                      <th className="qtr-datath">Date</th>
                      <th>Fat (%)</th>
                      <th>SNF (%)</th>
                      <th>Total Solids (%)</th>
                      <th>Price (₹/Liter)</th>
                    </tr>
                  </thead>
                  
                  <tbody >
                    {filteredData.map((data) => (
                      <tr key={data.id} className="tbodyData">
                        <td className="qtr-data">{data.date}</td>
                        <td className="qtr-data">{data.fatContent}</td>
                        <td className="qtr-data" >{data.snf}</td>
                        <td className="qtr-data">{data.totalSolids}</td>
                        <td className="qtr-data">{data.pricePerLiter}</td>
                      </tr>
                    ))}

                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No records found for the given date.
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
    </Container>
  );
};

export default QualityPricingInfo;

