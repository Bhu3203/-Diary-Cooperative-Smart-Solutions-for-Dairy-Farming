



import React from 'react';
import './Main.css';
import { Link } from 'react-router-dom';


export default function Main() {
  return (
    <div className="main">
      {/* Main Container */}
      {/* Other sections of the code remain unchanged */}

      <img
        src="https://ananda.in/wp-content/uploads/2022/04/banner4-min.webp" 
        className="slideimage"
        loading="lazy"
        width="100%"
        height="605"
        alt=""
      ></img>


{/* New Farm Fresh Products Section */}
<div className="products-container text-center">
        <h1>All Farm Fresh Products At One Place...</h1>
        <div className="products-grid">
          <div className="product-item">
            <img src="https://pravarshaindustries.com/storage/subcategories/RoGa67tN2sfhnQNoXXKpQgZdZMkXJQWdwk8LEuiW.png" alt="Milk" />
            <p>Milk</p>
          </div>
          <div className="product-item">
            <img src="https://pravarshaindustries.com/storage/subcategories/RoGa67tN2sfhnQNoXXKpQgZdZMkXJQWdwk8LEuiW.png" alt="Ghee" />
            <p>Ghee</p>
          </div>
          <div className="product-item">
            <img src="https://pravarshaindustries.com/storage/subcategories/RoGa67tN2sfhnQNoXXKpQgZdZMkXJQWdwk8LEuiW.png" alt="Paneer" />
            <p>Paneer</p>
          </div>
          <div className="product-item">
            <img src="https://pravarshaindustries.com/storage/subcategories/RoGa67tN2sfhnQNoXXKpQgZdZMkXJQWdwk8LEuiW.png" alt="Curd" />
            <p>Curd</p>
          </div>
          <div className="product-item">
            <img src="https://pravarshaindustries.com/storage/subcategories/RoGa67tN2sfhnQNoXXKpQgZdZMkXJQWdwk8LEuiW.png" alt="Buttermilk" />
            <p>Buttermilk</p>
          </div>
          <div className="product-item">
            <img src="https://pravarshaindustries.com/storage/subcategories/RoGa67tN2sfhnQNoXXKpQgZdZMkXJQWdwk8LEuiW.png" alt="Combo Products" />
            <p>Combo Products</p>
          </div>
        </div>
      </div>





      <div className="row justify-content-center">
        {Array(4)
          .fill(null)
          .map((_, index) => (
            <div
              className="col-xl-2 col-lg-3 col-md-6 col-sm-12 product-card mx-3"
              key={index}
            >
              <Link to="/">
                <img
                  src="https://pravarshaindustries.com/storage/products/hUsQXJFK2k39OlQCfIdbVEtwpOtAZRbQ9uS68uB5.png"
                  className="img-fluid product-image"
                  alt="Farm Fresh Buffalo Milk"
                />
              </Link>
              <div className="product-details text-center">
                <div className="product-title">Farm Fresh Buffalo Milk</div>
                <p className="product-price text-xs mt-1">
                  <span className="line-through mr-2">&#8377;50</span>
                  <span>&#8377;47 / 500ml</span>
                </p>
                <div className="stock-container d-flex align-items-center justify-content-between mt-4">
                  <span className="in-stock-text pd-text-green text-sm md:text-lg">
                    In Stock
                  </span>
                  <Link to="/" className="add-button">
                    <img
                      alt="add to cart"
                      className="add-icon"
                      src="https://pravarshaindustries.com/img/plus-icon.png"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      

    
    </div>
  );
}
