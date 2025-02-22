import React from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { loadRazorpay } from "./razorpayHelper";
// import "./PaymentPage.css";

const PaymentPage = ({ order }) => {
    const navigate = useNavigate();

    const handlePayment = async () => {
        // const paymentResponse = await loadRazorpay(order.amount);
        // if (paymentResponse.success) {
        //     navigate("/success");
        // } else {
        //     alert("Payment failed. Try again.");
        // }
    };

    return (
        <Container className="payment-page mt-4">
            <Row>
                <Col md={8}>
                    <Card className="shadow-lg p-4">
                        <h3>Choose Payment Method</h3>
                        <Form>
                            <Form.Check type="radio" label="Credit / Debit Card" name="paymentMethod" defaultChecked />
                            <Form.Check type="radio" label="UPI / Wallets" name="paymentMethod" />
                            <Form.Check type="radio" label="Net Banking" name="paymentMethod" />
                        </Form>
                        <Button className="mt-4 btn-success w-100" onClick={handlePayment}>
                            Pay ₹{order.amount}
                        </Button>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow-lg p-4">
                        <h4>Order Summary</h4>
                        <p>Product: {order.productName}</p>
                        <p>Price: ₹{order.amount}</p>
                        <p>Seller: {order.sellerName}</p>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PaymentPage;
