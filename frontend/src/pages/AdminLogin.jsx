import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.js";
import logo from "../assets/logo-santa-rita.webp";
import ImagenSistema from "../components/ImagenSistema.jsx";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@santarita.edu.bo");
  const [password, setPassword] = useState("admin12345");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/admin/login", { email, password });
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/dashboard");
    } catch (error) {
      setMessage(error.response?.data?.error || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin-login">
      <form className="login-card" onSubmit={handleLogin}>
        <ImagenSistema imageKey="logo_principal" className="login-logo" fallback={logo} alt="Santa Rita" />
        <h1>Panel Santa Rita</h1>
        <p>Accede para revisar pre-inscripciones y gestionar imágenes de la página.</p>
        <label>
          Correo
          <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required />
        </label>
        <label>
          Contraseña
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
        </label>
        <button className="btn primary full" type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        <span className="form-status">{message}</span>
      </form>
    </main>
  );
}
