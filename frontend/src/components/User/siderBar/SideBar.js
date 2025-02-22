




import React, { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ListIcon from "@mui/icons-material/List";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false); // Track collapsed state
  const [activeIndex, setActiveIndex] = useState(null); // Track active list item

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div
      className={`usideBar ${collapsed ? "collapsed" : ""}`}
      onMouseEnter={() => setCollapsed(false)} // Expand on hover
      onMouseLeave={() => setCollapsed(true)} // Collapse on mouse leave
    >
      <div className="sidebar-brandName">
        <span>Dairy</span>
      </div>
      <ul className="uSidebarList ulist-group">
        {[
          { path: "/userdash/Dashboard", title: "Dashboard", icon: <DashboardIcon /> },
          // { path: "/userdash/billingpayments", title: "Invoicing & Billing", icon: <ReceiptLongIcon /> },
          { path: "/userdash/paymentsManagement", title: "Quality Reports", icon: <SummarizeIcon /> },
          { path: "/userdash/buyandsell", title: "Cattel Listing", icon: <ListIcon /> },
          { path: "/userdash/community&support", title: "Community&Support", icon: <LiveHelpIcon /> },
        ].map((item, index) => (
          <>
          {/* <span className="hiddenIcon">{item.icon}</span> */}
          <li
            key={index}
            className={`ulist-group-item ${activeIndex === index ? "bg-primary text-white" : ""}`}
            onClick={() => handleClick(index)}
            style={{ cursor: "pointer", color:"white !important" }}
          ><div className="hiddenIcon">{item.icon}</div>
            
            
            <Link
              to={item.path}
              className="utitle"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              
              <span className="farmerSideIcon">{item.icon}</span>
              <span className="utitle">{item.title}</span>
            </Link>
          </li>
          </>
        ))}
      </ul>
    </div>
  );
}










{/* <div>SideBar</div> */}
            {/* <div className='sideBar'>
                <ul className="sidebarList">
                    
                    <li>
                        <Link to="/userdash/Dashboard" className="title">
                            <span>
                                <DashboardIcon />
                            </span>
                            <span className="title">Dashboard</span>
                        </Link>
                        
                    </li>

                   
                    
                    <li>
                        <Link to="/userdash/billingpayments" className="title">
                            <span>
                                <ReceiptLongIcon />
                            </span>
                            <span className="title">Invoicing & Billing</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/userdash/paymentsManagement" className="title">
                            <span>
                                <SummarizeIcon />
                            </span>
                            <span className="title">Quality Reports</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/userdash/buyandsell" className="title">
                            <span>
                                <ListIcon />
                            </span>
                            <span className="title">Cattel Listing</span>
                        </Link>
                    </li>




                </ul>

            </div> */}





