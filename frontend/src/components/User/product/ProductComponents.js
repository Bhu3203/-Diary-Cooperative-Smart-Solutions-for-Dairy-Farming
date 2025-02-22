

import { useSelector } from "react-redux";
import "./style.css";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

const ProductComponents = () => {
    const products = useSelector((state) => state.allProducts.products);


    return (
        <>
            <Container className="mt-4 product-l ">
                <Row>
                    {products.map((product) => {
                        const { sellerName, mobileNo, price, breed, image } = product;



                        console.log(sellerName);


                        return (
                            <Col key={sellerName} md={3} sm={6} xs={12} className="mb-4">
                                <Card className="h-100 shadow card-data">
                                    <Card.Img variant="top" src={image} style={{ height: "200px", objectFit: "contain" }} />
                                    <Card.Body>
                                        <Card.Title>{sellerName}...</Card.Title>
                                        <Card.Text>${price}</Card.Text>
                                        <Card.Text>{mobileNo}</Card.Text>
                                        <Card.Text>{breed}</Card.Text>
                                        <Button variant="primary">Buy Now</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};

export default ProductComponents;


//.substring(0, 20)
{/* 
<div className="row">
                 <div className="col">
                    <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={image} />
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>
                                This is a sample React Bootstrap card with some text.
                            </Card.Text>
                            <Button variant="primary">Go Somewhere</Button>
                        </Card.Body>
                    </Card>

                 </div>

             </div>

           
        </div> */}

