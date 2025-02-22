
import React, { useState } from "react";
import "./Product.css";

const products = [
  {
    id: 1,
    name: "Farm Fresh Homogenised Cow Milk",
    category: "Milk",
    price: "₹37 / 500ml",
    img: "img1.png",
  },
  {
    id: 2,
    name: "Farm Fresh Non Homogenised Cow Milk",
    category: "Milk",
    price: "₹37 / 500ml",
    img: "img2.png",
  },
  {
    id: 3,
    name: "Buffalo Toned Milk",
    category: "Milk",
    price: "₹35 / 500ml",
    img: "img3.png",
  },
  {
    id: 4,
    name: "Farm Fresh Buffalo Milk",
    category: "Milk",
    price: "₹47 / 500ml",
    img: "img4.png",
  },
  {
    id: 5,
    name: "Natural Cow Ghee",
    category: "Ghee",
    price: "₹500 / 500ml",
    img: "img5.png",
  },
  {
    id: 6,
    name: "Buffalo Ghee",
    category: "Ghee",
    price: "₹400 / 500ml",
    img: "img6.png",
  },
  {
    id: 7,
    name: "Pravarsha Natural Paneer",
    category: "Paneer",
    price: "₹100 / 200gms",
    img: "img7.png",
  },
  {
    id: 8,
    name: "Farm Fresh Homogenised Cow Milk",
    category: "Milk",
    price: "₹37 / 500ml",
    img: "img1.png",
  },
  {
    id: 9,
    name: "Farm Fresh Non Homogenised Cow Milk",
    category: "Milk",
    price: "₹37 / 500ml",
    img: "img2.png",
  },
  {
    id: 10,
    name: "Buffalo Toned Milk",
    category: "Milk",
    price: "₹35 / 500ml",
    img: "img3.png",
  },
  {
    id: 11,
    name: "Farm Fresh Buffalo Milk",
    category: "Milk",
    price: "₹47 / 500ml",
    img: "img4.png",
  },
  {
    id: 12,
    name: "Natural Cow Ghee",
    category: "Ghee",
    price: "₹500 / 500ml",
    img: "img5.png",
  },
  {
    id: 13,
    name: "Buffalo Ghee",
    category: "Ghee",
    price: "₹400 / 500ml",
    img: "img6.png",
  },
  {
    id: 14,
    name: "Pravarsha Natural Paneer",
    category: "Paneer",
    price: "₹100 / 200gms",
    img: "img7.png",
  },
];

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];


  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="product-app">
      <h1>Product Catalog</h1>
      <div className="filter-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="product-containers">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-cards">
            <img
              src={product.img}
              alt={product.name}
              className="products-image"
            />
            <h5>{product.name}</h5>
            <p>{product.price}</p>
            <p className="in-stock">In Stock</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;





// import React, { useState, useMemo } from "react";
// import { useSelector } from "react-redux";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import "./Product.css";

// const Product = () => {
//     const products = useSelector((state) => state.allProducts.products);
//     const [selectedCategory, setSelectedCategory] = useState("All");

//     // Use useMemo to prevent unnecessary calculations on re-renders
//     const categories = useMemo(() => ["All", ...new Set(products.map((product) => product.category))], [products]);

//     const filteredProducts =
//         selectedCategory === "All"
//             ? products
//             : products.filter((product) => product.category === selectedCategory);

//     return (
//         <Container className="mt-4 product-app">
//             <h1 className="text-center mb-4">Product Catalog</h1>

//             {/* Category Filter Buttons */}
//             <div className="filter-container">
//                 {categories.map((category) => (
//                     <Button
//                         key={category}
//                         variant={selectedCategory === category ? "primary" : "outline-primary"}
//                         className={`filter-btn ${selectedCategory === category ? "active" : ""}`}
//                         onClick={() => setSelectedCategory(category)}
//                     >
//                         {category}
//                     </Button>
//                 ))}
//             </div>

//             {/* Product Display */}
//             <Row className="product-grid product-row-container">
//                 {filteredProducts.map((product) => {
//                     const { id, name, category, price, img, sellerName, mobileNo, breed, image } = product;
//                     // md={3} sm={6} xs={12}
//                     return (
//                         <Col key={id || sellerName} md={3} sm={6} xs={12} className="mb-4 ">
//                             <Card className="h-100 shadow product-card">
//                                 <div className="product-image-container">
//                                     <Card.Img
//                                         variant="top"
//                                         src={img || image}
//                                         className="product-image"
//                                         alt="Product"
//                                     />
//                                 </div>
//                                 <Card.Body>
//                                     <Card.Title className="product-title">{name || sellerName}</Card.Title>
//                                     <Card.Text className="product-price">₹ {price}</Card.Text>
//                                     {mobileNo && <Card.Text className="product-info">📞 {mobileNo}</Card.Text>}
//                                     {breed && <Card.Text className="product-info">🐄 {breed}</Card.Text>}
//                                     <Button variant="success" className="buy-btn">Buy Now</Button>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     );
//                 })}
//             </Row>
//         </Container>
//     );
// };

// export default Product;




// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { setProducts } from "./redux/actions/productActions";
// import "./Product.css";

// const Product = () => {
//     const dispatch = useDispatch();
//     const products = useSelector((state) => state.allProducts.products);
//     const [selectedCategory, setSelectedCategory] = useState("All");

//     const categories = ["All", ...new Set(products.map((product) => product.category))];

//     const filteredProducts =
//         selectedCategory === "All"
//             ? products
//             : products.filter((product) => product.category === selectedCategory);

//     return (
//         <Container className="mt-4 product-app">
//             <h1 className="text-center mb-4">Product Catalog</h1>

//             {/* Category Filter Buttons */}
//             <div className="filter-container text-center mb-3">
//                 {categories.map((category) => (
//                     <Button
//                         key={category}
//                         variant={selectedCategory === category ? "primary" : "outline-primary"}
//                         className="m-1 filter-btn"
//                         onClick={() => setSelectedCategory(category)}
//                     >
//                         {category}
//                     </Button>
//                 ))}
//             </div>

//             {/* Product Display */}
//             <Row>
//                 {filteredProducts.map((product) => {
//                     const { id, name, category, price, img, sellerName, mobileNo, breed, image } = product;
//                     console.log(sellerName);
//                     return (
//                         <Col key={id || sellerName} md={3} sm={6} xs={12} className="mb-4">
//                             <Card className="h-100 shadow card-data">
//                                 <Card.Img
//                                     variant="top"
//                                     src={img || image}
//                                     style={{ height: "200px", objectFit: "contain" }}
//                                 />
//                                 <Card.Body>
//                                     <Card.Title>{name || sellerName}</Card.Title>
//                                     <Card.Text>{price}</Card.Text>
//                                     {mobileNo && <Card.Text>Contact: {mobileNo}</Card.Text>}
//                                     {breed && <Card.Text>Breed: {breed}</Card.Text>}
//                                     <Button variant="primary">Buy Now</Button>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     );
//                 })}
//             </Row>
//         </Container>
//     );
// };

// export default Product;






// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import "./Product.css";

// const Product = () => {
//     const products = useSelector((state) => state.allProducts.products);
//     const [selectedCategory, setSelectedCategory] = useState("All");

//     const categories = ["All", ...new Set(products.map((product) => product.category))];

//     const filteredProducts =
//         selectedCategory === "All"
//             ? products
//             : products.filter((product) => product.category === selectedCategory);

//     return (
//         <Container className="mt-4 product-app">
//             <h1 className="text-center mb-4">Product Catalog</h1>

//             {/* Category Filter Buttons */}
//             <div className="filter-container text-center mb-3">
//                 {categories.map((category) => (
//                     <Button
//                         key={category}
//                         variant={selectedCategory === category ? "primary" : "outline-primary"}
//                         className="m-1"
//                         onClick={() => setSelectedCategory(category)}
//                     >
//                         {category}
//                     </Button>
//                 ))}
//             </div>

//             {/* Product Display */}
//             <Row>
//                 {filteredProducts.map((product) => {
//                     const { id, name, category, price, img, sellerName, mobileNo, breed, image } = product;

//                     return (
//                         <Col key={id || sellerName} md={3} sm={6} xs={12} className="mb-4">
//                             <Card className="h-100 shadow card-data">
//                                 <Card.Img
//                                     variant="top"
//                                     src={img || image}
//                                     style={{ height: "200px", objectFit: "contain" }}
//                                 />
//                                 <Card.Body>
//                                     <Card.Title>{name || sellerName}</Card.Title>
//                                     <Card.Text>{price}</Card.Text>
//                                     {mobileNo && <Card.Text>Contact: {mobileNo}</Card.Text>}
//                                     {breed && <Card.Text>Breed: {breed}</Card.Text>}
//                                     <Button variant="primary">Buy Now</Button>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     );
//                 })}
//             </Row>
//         </Container>
//     );
// };

// export default Product;








// // Updated Product.js for React Filtering

// import React, { useState } from 'react';
// import './Product.css';

// const products = [
//     { id: 1, name: "Farm Fresh Homogenised Cow Milk", category: "Milk", price: "₹37 / 500ml", img: "img1.png" },
//     { id: 2, name: "Farm Fresh Non Homogenised Cow Milk", category: "Milk", price: "₹37 / 500ml", img: "img2.png" },
//     { id: 3, name: "Buffalo Toned Milk", category: "Milk", price: "₹35 / 500ml", img: "img3.png" },
//     { id: 4, name: "Farm Fresh Buffalo Milk", category: "Milk", price: "₹47 / 500ml", img: "img4.png" },
//     { id: 5, name: "Natural Cow Ghee", category: "Ghee", price: "₹500 / 500ml", img: "img5.png" },
//     { id: 6, name: "Buffalo Ghee", category: "Ghee", price: "₹400 / 500ml", img: "img6.png" },
//     { id: 7, name: "Pravarsha Natural Paneer", category: "Paneer", price: "₹100 / 200gms", img: "img7.png" },
// ];

// const Product = () => {
//     const [selectedCategory, setSelectedCategory] = useState('All');
//     const categories = ['All', ...new Set(products.map(product => product.category))];

//     const filteredProducts = selectedCategory === 'All'
//         ? products
//         : products.filter(product => product.category === selectedCategory);

//     return (
//         <div className="product-app">
//             <h1>Product Catalog</h1>
//             <div className="filter-container">
//                 {categories.map(category => (
//                     <button
//                         key={category}
//                         className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
//                         onClick={() => setSelectedCategory(category)}
//                     >
//                         {category}
//                     </button>
//                 ))}
//             </div>
//             <div className="product-container">
//                 {filteredProducts.map(product => (
//                     <div key={product.id} className="product-card">
//                         <img src={product.img} alt={product.name} className="product-image" />
//                         <h3>{product.name}</h3>
//                         <p>{product.price}</p>
//                         <p className="in-stock">In Stock</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Product;
