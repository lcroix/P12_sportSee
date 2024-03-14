import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Component/Header/header.js";
import VerticalNavBar from "../Component/verticalNavBar/verticalNavBar.js";
import HomePage from "../Pages/home.js";
import '../App.css'

const AppRoutes = () => {
    return (
      <BrowserRouter>
        <div className="main-container">
            <Header />
            <VerticalNavBar />
            <Routes>
            <Route path="/user/:id" element={<HomePage />} />
            </Routes>
        </div>
      </BrowserRouter>
    );
};
export default AppRoutes;
