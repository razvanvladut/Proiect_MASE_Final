import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Attractions from "./components/Attractions";
import Gallery from "./components/Gallery";
import AdminPanel from "./components/AdminPanel";
import Map from "./components/Map";
import Accommodations from "./components/Accommodations";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UploadImage from './components/UploadImage';

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/map" element={<Map />} />
          <Route path="/accommodations" element={<Accommodations />} />
          <Route path="/upload" element={<UploadImage />} />
          {/* 🔒 Rută protejată: doar utilizatori autentificați și admin */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
