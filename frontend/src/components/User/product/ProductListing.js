import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductComponents from "./ProductComponents";
import { setProducts } from "../../../redux/actions/productActions";
import axios from "axios";
import Product from "../../../Product";
import Footer from "../../../footer/Footer";
import "./ProductListing.css";


const ProductListing = () =>{
    const products = useSelector((state) => state);
    const dispatch = useDispatch();
    const fetchProduct =  async () =>{
        const response = await axios
        .get("https://fakestoreapi.com/products")
        .catch((err) =>{
            console.log("Error",err);
        })
        dispatch(setProducts(response.data));

    };
    useEffect(() =>{
        fetchProduct();
    },[])
    console.log(products);
    return(
        <div className="productpage-container">
           {/* <ProductComponents/> */}
           <Product/>
           <Footer/>
        </div>

    );
};

export default ProductListing;