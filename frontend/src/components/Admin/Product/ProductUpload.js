import React from 'react';
// import './ProductUpload.css'; // Assuming you will create this CSS file
import '../Product/ProductUpload.css';

const ProductUpload = () => {
    return (
        <div className="product-upload">
            <div className="header">
                <h2>Product Upload</h2>
                <nav>
                    <span>Dashboard</span> / <span>Products</span> / <span>Product Upload</span>
                </nav>
            </div>

            <div className="form-container">
                <h3>Basic Information</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="product-name">Product Name</label>
                        <input type="text" id="product-name" name="productName" placeholder="Enter product name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description" placeholder="Enter product description"></textarea>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select id="category" name="category">
                                <option value="none">None</option>
                                {/* Add more options here */}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subcategory">Sub Category</label>
                            <select id="subcategory" name="subCategory">
                                <option value="none">None</option>
                                {/* Add more options here */}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <input type="number" id="price" name="price" placeholder="Enter price" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="old-price">Old Price</label>
                            <input type="number" id="old-price" name="oldPrice" placeholder="Enter old price" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="brand">Brand</label>
                            <input type="text" id="brand" name="brand" placeholder="Enter brand" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="discount">Discount</label>
                            <input type="number" id="discount" name="discount" placeholder="Enter discount" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="is-featured">Is Featured</label>
                            <select id="is-featured" name="isFeatured">
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="stock">Product Stock</label>
                            <input type="number" id="stock" name="stock" placeholder="Enter stock quantity" />
                        </div>

                        
                    </div>

                    <div className="form-group">
                        <label>Ratings</label>
                        <div className="ratings">
                            <span>&#9733;</span>
                            <span>&#9733;</span>
                            <span>&#9733;</span>
                            <span>&#9733;</span>
                            <span>&#9733;</span>
                        </div>
                    </div>
                        <div className="media-section">
                            <h4>Media and Published</h4>
                            <div className="media-upload">
                             <div className="uploaded-image">
                             <img src="placeholder.jpg" alt="Uploaded Product" />
                         </div>
                          <div className="image-upload-placeholder">
                               <span>Image Upload</span>
                          </div>
                        </div>
                    </div>

                    <button type="submit" className="submit-button">Publish and View</button>
                    {/* <button type="submit" className="submit-button">Submit</button> */}
                </form>
            </div>
        </div>
    );
};

export default ProductUpload;

