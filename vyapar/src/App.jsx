import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import Signup from "./components/Signup";
import AdminLoginPage from "./components/AdminLoginPage";
import AdminSignup from "./components/AdminSignup";
import Details from "./components/Details";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/LoginPage.css";
import OtpVerificationPage from "./components/OtpVerificationPage";
import SetNewPasswordPage from "./components/SetNewPasswordPage";
import ForgotOtp from "./components/ForgotOtp";
import EmailComponent from "./components/EmailComponent";
import AdminAddProduct from "./components/AdminAddProduct";
import AdminViewProduct from "./components/AdminViewProduct";
import AdminHome from "./components/AdminHome";
import AdminViewDetails from "./components/AdminViewDetails";
import AddProductMeta from "./components/AdminMetaProduct";
import AdminProductMetaView from "./components/AdminProductMetaView";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminLoginPage />} />
          <Route path="/adminproduct" element={<AdminAddProduct />} />
          <Route path="/adminview" element={<AdminViewProduct />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/admindetials" element={<AdminViewDetails />} />
          <Route path="/productMeta" element={<AddProductMeta />} />
          <Route path="/viewMeta" element={<AdminProductMetaView />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
