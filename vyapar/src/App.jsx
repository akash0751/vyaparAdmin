import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLoginPage from "./components/AdminLoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminAddProduct from "./components/AdminAddProduct";
import AdminViewProduct from "./components/AdminViewProduct";
import AdminHome from "./components/AdminHome";
import AdminViewDetails from "./components/AdminViewDetails";
import AddProductMeta from "./components/AdminMetaProduct";
import AdminProductMetaView from "./components/AdminProductMetaView";

const App = () => {
  return (
   
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
    
  );
};

export default App;
