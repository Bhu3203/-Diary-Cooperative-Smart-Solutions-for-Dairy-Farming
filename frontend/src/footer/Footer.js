import React from 'react'
import "./Footer.css";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (<>
    <div className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h2>Products</h2>
            <Link to="/" className="footer-link">Milk</Link>
            <Link to="/" className="footer-link">Ghee</Link>
            <Link to="/" className="footer-link">Paneer</Link>
            <Link to="/" className="footer-link">Curd</Link>
            <Link to="/" className="footer-link">Buttermilk</Link>
          </div>

          <div className="footer-section">
            <h2>Policy</h2>
            <Link to="https://pravarshaindustries.com/privacy-policy" className="footer-link">Privacy Policy</Link>
            <Link to="https://pravarshaindustries.com/terms-and-conditions" className="footer-link">Terms & Conditions</Link>
            <Link to="https://pravarshaindustries.com/cancellaton-and-refund" className="footer-link">Cancellation/Refund Policy</Link>
          </div>

          <div className="footer-divider"></div>

          <div className="footer-contact">
            <h2>Contact Us</h2>
            <button
              className="footer-button"
              onClick={() => window.open("https://maps.google.com/?q=17.444403759632348,78.46287480803491")}
            >
              NANDGAON, TALUKA-SATARA, DISTRICT-SATARA, MAHARASHTRA
            </button>
            <Link to="mailto:support@pravarshaindustries.com" className="footer-link">support@sadguruindustries.com</Link>
            <div className="footer-phone">
              <button className="footer-button" onClick={() => window.open('tel:7702999900')}>7702999900</button> |
              <button className="footer-button" onClick={() => window.open('tel:7702666699')}>7702666699</button>
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <div>© Copyright 2024. All Rights Reserved.</div>
        </div>
      </div>

      <div className='foot-img'></div>
    
    </>
  )
}
