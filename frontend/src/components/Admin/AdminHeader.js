
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi"; // Using react-icons for the hamburger menu
// import { ImCross } from "react-icons/im";
// import "./AdminHeader.css"; // CSS for styling

// export default function AdminHeader() {
//   const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <div>
//       <nav className="navbar navbar-expand-lg bg-body-tertiary">
//         <div className="container-fluid">
//           <button className="btn btn-light" onClick={toggleSidebar}>
//             {isSidebarOpen ? <ImCross /> : <GiHamburgerMenu />}
//           </button>

//           <Link to="/admindash/productupload" className="navbar-brand ms-3">
//             <img
//               src="/path-to-farmer-logo.png"
//               alt="Farmer Logo"
//               style={{ height: "40px" }}
//             />
//           </Link>

//           <Link to="/admindash/dashboard" className="navbar-brand ms-3">
//             <img
//               src="/path-to-user-logo.png"
//               alt="User Logo"
//               style={{ height: "40px" }}
//             />
//           </Link>

//           <div className="collapse navbar-collapse" id="navbarSupportedContent">
//             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//               <li className="nav-item">
//                 <Link className="nav-link active" aria-current="page" to="/">
//                   Home
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link className="nav-link" to="/link">
//                   Link
//                 </Link>
//               </li>
//             </ul>

//             <button
//               className="btn btn-danger ms-2"
//               onClick={() => {
//                 alert("Logged out!");
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </nav>

//       <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
//         <ul className="list-unstyled">
//           <li>
//             <Link to="/admindash/addmilkrecord" onClick={toggleSidebar}>
//               Loan and Feed
//             </Link>
//           </li>
//           <li className="nav-item dropdown">
//             <a
//               className="nav-link dropdown-toggle"
//               href="#"
//               id="getRecordDropdown"
//               role="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             >
//               GetRecord
//             </a>
//             <ul className="dropdown-menu" aria-labelledby="getRecordDropdown">
//               <li>
//                 <Link
//                   to="/admindash/farmerrecord"
//                   className="dropdown-item"
//                   onClick={toggleSidebar}
//                 >
//                   Farmer
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   to="/admindash/loanfeed"
//                   className="dropdown-item"
//                   onClick={toggleSidebar}
//                 >
//                   About Customer
//                 </Link>
//               </li>
//             </ul>
//           </li>
//           <li>
//             <Link to="/dashboard" onClick={toggleSidebar}>
//               Settings
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }


// import React from 'react';
// import "../Admin/Admin.css"; // Your custom styles

// import 
//  {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
//  from 'react-icons/bs'

// function AdminHeader({OpenSidebar}) {
//   return (
//     <header className='header'>
//         <div className='menu-icon'>
//             <BsJustify className='icon' onClick={OpenSidebar}/>
//         </div>
//         <div className='header-left'>
//             <BsSearch  className='icon'/>
//         </div>
//         <div className='header-right'>
//             <BsFillBellFill className='icon'/>
//             <BsFillEnvelopeFill className='icon'/>
//             <BsPersonCircle className='icon'/>
//         </div>
//     </header>
//   )
// }
// export default AdminHeader


import React from 'react';
import { Link } from 'react-router-dom';
// import '../Admin/AdminHeader';

const AdminHeader = () => {
  return (
    // <nav className="navbar">
    //   <div className="navbar-brand">Milkify</div>
    //   <div className="navbar-profile">
    //     <span>Test User</span>
    //     <span>Admin</span>
    //   </div>
    // </nav>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/admindash/addmilkrecord">Link</Link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"/></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
  );
};

export default AdminHeader;



