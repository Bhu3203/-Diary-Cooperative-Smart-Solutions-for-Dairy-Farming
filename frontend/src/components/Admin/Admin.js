import React from 'react';


import AdHeader from './AdHeader';
import AdminDashboard from './AdminDashboard';
import AdFooter from './AdFooter';
// import "../Admin/Admin.css";  // Admin-specific styles

export default function Admin() {
  return (
    <>
      
     <AdHeader/>
     <AdminDashboard/>
     <AdFooter/>
    </>
  );
}
