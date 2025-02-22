
import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import Header from "./header/Header";
import Loginc from "./loginContainer/Loginc";
// import LoginPage from "./farmerLogin/LoginPage";
import AdminLogin from "./adminLogin/AdminLogin";
import SignUpPage from "./signup-page/SignUpPage";
// import Admin from "./components/Admin/Admin";
import Add_Milk_Record from "./components/Admin/Add_Milk_Record";
// import Dashboard from "./components/Admin/Dashboard";
import Add_User_Milk_Details from "./components/Admin/Add_User_Milk_Details";
import FarmerRecord from "./components/Admin/FarmerRecord";
import LoanAndFeedRecord from "./components/Admin/LoanAndFeedRecord";
import AddMilkRecord from "./components/Admin/AddMilkRecord";
import AdminHeader from "./components/Admin/AdminHeader";

import SideBar from "./components/User/siderBar/SideBar";
import BuyAndSellCattle from "./components/User/cattelListingPages/BuyAndSellCattle";

import Dashboard from "./components/User/dashboard/Dashboard";
import NavigationBar from "./components/User/navBar/NavigationBar";
import MyProfile from "./components/User/profile/MyProfile";
import Settings from "./components/User/settingComponent/Settings";
import HomeUser from "./components/User/HomeUser";
import UserLogin from "./userLogin/UserLogin";
import ProductUpload from "./components/Admin/Product/ProductUpload";
import AdminDashboard from "./components/Admin/AdminDashboard";
import BankDetailsPage from "./BankDetailsPage";
// import UpperNavbar from "./components/Admin/UpperNavbar";
import Admin from "./components/Admin/Admin";
import AboutUs from "./aboutUsPage/AboutUs";
import Main from "./mainHomePage/Main";
import MilkReport from "./components/Admin/MilkReport";
import FarmerLoan from "./components/Admin/FarmerLoan";
import Product from "./Product";
import CattleFeedForm from "./components/Admin/CattleFeedForm";
import CustMilkDetails from "./components/Admin/CustMilkDetails";
import Footer from "./footer/Footer";
import BillingPayments from "./components/User/billing&paymentPages/BillingPayments";
import PaymentManagement from "./components/User/milkqualituReport/QualityPricingInfo";
import CommunityAndSupport from "./components/User/community&support/CommunityAndSupport";
import ProductComponents from "./components/User/product/ProductComponents";
import ProductListing from "./components/User/product/ProductListing";
import AdminProfile from  "./components/Admin/AdminProfile";
import PaymentPage from "./paymentPage/PaymentPage";
import LoginPage from "./loginPage/LoginPage";


const customRoute = createBrowserRouter([
  {
    path: "/",
    element: (
    <>
    <App />
    
    </>),
    children: [
     
      {
        path: "header",
        element: <Header />,
      },
      {
        path: "Main",
        element: <Main />,
      },
   
      {
        path: "loginc",
        element: <Loginc />,
      },
   
      {
        path: "bankdetails",
        element: <BankDetailsPage />,
      },
      {
        path: "PaymentPage",
        element: <PaymentPage />,
      },
      
      
    ],
  },{
    path:"login",
    // path: "about/login",
    element:(
      <>
      <Header/>
      <LoginPage/>
      <Footer/>

      </>
    ),
    children :[
      {
        path: "login",
        element: <LoginPage />,
      },

    ],
    
   


  },
  {
    path: "signup",
    element: <SignUpPage />,
 },
  {
    path:"about",
    element:(
      <>
      <Header/>
      <AboutUs />
      <Footer/>

      </>
    )
  }
  ,{
    path:"product",
    element:(
      <>
      <Header/>
      <Product/>
      <Footer/>

      </>
    )
  }
  ,{
    path:"admin",
    element:(
      <>
      <Header/>
      <AdminLogin />
      <Footer/>

      </>
    )
  },
  {
    path:"farmer",
    element:(
      <>
      <Header/>
      <LoginPage />
      <Footer/>
     

      </>
    )
  },
  {
    path:"user",
    element:(
      <>
      <Header/>
      <UserLogin />
      <Footer/>
      

      </>
    )
  },
  {
    path:"sign-up",
    element:(
      <>
      <Header/>
      <SignUpPage />
      <Footer/>
      

      </>
    )
  },


  {
    path: "admindash",
    element: (
      <>
        <AdminDashboard/>
      </>
    ),
    children: [
      { path: "milkreport", element: <MilkReport /> },
      { path: "adminprofile", element: <AdminProfile /> },
      { path: "addMilk", element: <AddMilkRecord /> },
      { path: "addmilkrecord", element: <AddMilkRecord /> },
      { path: "uesrmilkrecord", element: <Add_User_Milk_Details /> },
      { path: "custmilkrecord", element: <CustMilkDetails /> },
      { path: "farmerrecord", element: <FarmerRecord /> },
      { path: "cattlefeed", element: <CattleFeedForm /> },
      { path: "farmerloan", element: <FarmerLoan /> },
      { path: "loanfeed", element: <LoanAndFeedRecord /> },
    ],
  },




  {
    path: "userdash",
    element: (
      <>
      {/* <HomeUser/> */}
        <SideBar />

        <NavigationBar />
        {/* <ProductListing/> */}
        <Outlet/>
      </>
    ),
    children: [
      {
        path: "buyandsell",
        element: <BuyAndSellCattle />,
      },
      {
        path: "sidebar",
        element: <SideBar />,
      },
      {
        path: "Dashboard",
        element: <Dashboard/>
      },
      {
        path: "myProfile",
        element: <MyProfile/>
      },
      {
        path: "settings",
        element: <Settings/>
      },

      {
        path: "billingpayments",
        element: <BillingPayments/>
      },
      {
        path: "paymentsManagement",
        element: <PaymentManagement/>
      },
      {
        path: "community&support",
        element: <CommunityAndSupport/>
      },
      {
        path: "productPage",
        element: <ProductListing/>
      },
      
    ],
  },
]);

export default customRoute;
