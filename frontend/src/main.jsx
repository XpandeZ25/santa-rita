import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./pages/App.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import PreInscripcion from "./pages/PreInscripcion.jsx";
import "./styles.css";
import { ImagenesProvider } from "./context/ImagenesContext.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin" replace />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ImagenesProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/preinscripcion" element={<PreInscripcion />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      </ImagenesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
