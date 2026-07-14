import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { GradientBackground } from "../components/ui/gradient-backgrounds.jsx";
import api from "../services/api.js";

const initialForm = {
  nombreApellido: "",
  numeroCelular: "",
  carrera: "Técnico Medio en Enfermería",
  turno: "Mañana",
  horaContacto: ""
};

export default function PreInscripcion() {
  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await api.post("/pre-inscripciones", formData);
      setMessage("Pre-inscripción enviada con éxito. Te contactaremos pronto.");
      setFormData(initialForm);
    } catch (error) {
      setMessage(error.response?.data?.error || "No se pudo enviar la pre-inscripción.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="page-shell">
        <GradientBackground className="page-background-only" />
        <motion.section
          className="section enrollment standalone"
          initial={{ opacity: 0, y: 38 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="copy-block">
            <span className="eyebrow">Pre-inscripción</span>
            <h2>Comienza tu camino hoy</h2>
            <p>Completa tus datos y el equipo académico del Instituto Santa Rita se comunicará contigo para confirmar requisitos, costos y horarios.</p>
            <div className="mini-list">
              <span>Cupos limitados por gestión</span>
              <span>Turnos Mañana, Tarde y Noche</span>
              <span>Formación presencial con práctica clínica</span>
            </div>
          </div>
          <form className="lead-form" onSubmit={handleSubmit}>
            <label>
              Nombre y Apellido
              <input name="nombreApellido" value={formData.nombreApellido} onChange={handleChange} type="text" placeholder="Ej: María López" required />
            </label>
            <div className="form-row">
              <label>
                Número de Celular
                <input name="numeroCelular" value={formData.numeroCelular} onChange={handleChange} type="tel" placeholder="+591 70000000" required />
              </label>
              <label>
                Carrera
                <select name="carrera" value={formData.carrera} onChange={handleChange} required>
                  <option>Técnico Medio en Enfermería</option>
                </select>
              </label>
            </div>
            <div className="form-row">
              <label>
                Turno
                <select name="turno" value={formData.turno} onChange={handleChange} required>
                  <option>Mañana</option>
                  <option>Tarde</option>
                  <option>Noche</option>
                </select>
              </label>
              <label>
                Hora de contacto
                <input name="horaContacto" value={formData.horaContacto} onChange={handleChange} type="text" placeholder="Ej: 10:00 AM - 12:00 PM" required />
              </label>
            </div>
            <button className="btn primary full" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Solicitud"}
            </button>
            <p className="form-status">{message}</p>
          </form>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
