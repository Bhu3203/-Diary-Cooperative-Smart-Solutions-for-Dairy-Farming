// import React, { useEffect } from "react";
// import React,{useEffect} from "react";
// import Header from "./header/Header";
// import Footer from "./footer/Footer";
// import AboutUs from "./aboutUsPage/AboutUs";
// import Product from "./Product";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/js/bootstrap.js";
// import { Outlet } from "react-router-dom";

// export default function App() {
//   useEffect(() => {
//     document.body.setAttribute("data-bs-spy", "scroll");
//     document.body.setAttribute("data-bs-target", "#navbarNav");
//     document.body.setAttribute("data-bs-offset", "50");
//   }, []);

//   return (
//     <>
//       <Header />

//       {/* Scrollable sections */}
//       <div
//         data-bs-spy="scroll"
//         data-bs-target="#navbarNav"
//         data-bs-offset="50"
//         className="scrollspy-example"
//         tabIndex="0"
//       >
//         {/* <section id="home" className="container-fluid p-5" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
//           <h1>Home Section</h1>
//         </section> */}

//         <section id="about" className="container-fluid p-5" style={{ height: "100vh", backgroundColor: "#e9ecef" }}>
//           < AboutUs/>
//         </section>

//         <section id="product" className="container-fluid p-5" style={{ height: "100vh", backgroundColor: "#dee2e6" }}>
//          <Product/>
//         </section>
//       </div>

//       <Footer />
//       <Outlet />
//     </>
//   );
// }




import React from 'react';
import Header from './header/Header';
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Outlet } from 'react-router-dom';
import Main from './mainHomePage/Main';
import Footer from './footer/Footer'



export default function App() {
  return (
  
  <>
  <Header/>
  <Main/>
  <Footer/>
  <Outlet/>
  </>

  
 
  
  
  )
}


// import React from "react";
// import Header from "./Header";

// export default function App() {
//   return (
//     <>
//       <Header />
//       <div
//         data-bs-spy="scroll"
//         data-bs-target="#navbarNav"
//         data-bs-offset="50"
//         className="scrollspy-example"
//         tabIndex="0"
//       >
//         <section id="home" className="container-fluid p-5" style={{ height: "100vh", backgroundColor: "#f8f9fa" }}>
//           <h1>Home Section</h1>
//         </section>

//         <section id="about" className="container-fluid p-5" style={{ height: "100vh", backgroundColor: "#e9ecef" }}>
//           <h1>About Us Section</h1>
//         </section>

//         <section id="product" className="container-fluid p-5" style={{ height: "100vh", backgroundColor: "#dee2e6" }}>
//           <h1>Product Section</h1>
//         </section>
//       </div>
//     </>
//   );
// }
