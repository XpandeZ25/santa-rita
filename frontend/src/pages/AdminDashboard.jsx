import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import logo from "../assets/logo-santa-rita.webp";
import ImagenSistema from "../components/ImagenSistema.jsx";
import AdminCarrusel from "../components/AdminCarrusel.jsx";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("solicitudes");
  const [leads, setLeads] = useState([]);
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [imageForm, setImageForm] = useState({ key: "", titulo: "", descripcion: "", imagen: null });

  const stats = useMemo(() => ({
    leads: leads.length,
    images: images.length,
    latest: leads[0]?.createdAt ? new Date(leads[0].createdAt).toLocaleDateString() : "Sin datos"
  }), [leads, images]);

  const loadData = async () => {
    const [leadsResponse, imagesResponse] = await Promise.all([
      api.get("/admin/pre-inscripciones"),
      api.get("/admin/imagenes")
    ]);

    setLeads(leadsResponse.data);
    setImages(imagesResponse.data);
  };

  useEffect(() => {
    loadData().catch(() => {
      localStorage.removeItem("adminToken");
      navigate("/admin");
    });
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin");
  };

  const deleteLead = async (id) => {
    await api.delete(`/admin/pre-inscripciones/${id}`);
    await loadData();
  };

  const deleteImage = async (id) => {
    await api.delete(`/admin/imagenes/${id}`);
    await loadData();
  };

  const uploadImage = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!imageForm.imagen) {
      setMessage("Selecciona una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("key", imageForm.key);
    formData.append("titulo", imageForm.titulo);
    formData.append("descripcion", imageForm.descripcion);
    formData.append("imagen", imageForm.imagen);

    await api.post("/admin/imagenes", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    setImageForm({ key: "", titulo: "", descripcion: "", imagen: null });
    event.target.reset();
    setMessage("Imagen subida correctamente.");
    await loadData();
  };

  return (
    <main className="dashboard">
      <aside className="dashboard-sidebar">
        <Link className="brand dashboard-brand" to="/">
          <ImagenSistema imageKey="logo_principal" className="dashboard-logo" fallback={logo} alt="Santa Rita" />
        </Link>
        <button className={tab === "solicitudes" ? "active" : ""} onClick={() => setTab("solicitudes")}>Pre-inscripciones</button>
        <button className={tab === "imagenes" ? "active" : ""} onClick={() => setTab("imagenes")}>Imágenes</button>
        <button onClick={logout}>Cerrar sesión</button>
      </aside>

      <section className="dashboard-main">
        <div className="dashboard-head">
          <div>
            <span className="eyebrow">Panel Administrativo</span>
            <h1>Gestión Instituto Santa Rita</h1>
          </div>
          <Link className="btn primary" to="/">Ver página</Link>
        </div>

        <div className="stat-grid">
          <article><span>Solicitudes</span><strong>{stats.leads}</strong></article>
          <article><span>Imágenes</span><strong>{stats.images}</strong></article>
          <article><span>Último registro</span><strong>{stats.latest}</strong></article>
        </div>

        {tab === "solicitudes" && (
          <section className="admin-card">
            <h2>Pre-inscripciones recibidas</h2>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Celular</th>
                    <th>Carrera</th>
                    <th>Turno</th>
                    <th>Contacto</th>
                    <th>Fecha</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.nombreApellido}</td>
                      <td>{lead.numeroCelular}</td>
                      <td>{lead.carrera}</td>
                      <td>{lead.turno}</td>
                      <td>{lead.horaContacto}</td>
                      <td>{new Date(lead.createdAt).toLocaleString()}</td>
                      <td><button className="danger" onClick={() => deleteLead(lead.id)}>Eliminar</button></td>
                    </tr>
                  ))}
                  {!leads.length && <tr><td colSpan="7">Aún no hay pre-inscripciones.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {tab === "imagenes" && <AdminCarrusel onCountChange={(count) => setImages(Array(count).fill({}))} />}
        {false && (
          <section className="admin-grid">
            <form className="admin-card image-upload" onSubmit={uploadImage}>
              <h2>Subir imagen</h2>
              <label>Clave<input value={imageForm.key} onChange={(event) => setImageForm({ ...imageForm, key: event.target.value })} placeholder="hero_image" required /></label>
              <label>Título<input value={imageForm.titulo} onChange={(event) => setImageForm({ ...imageForm, titulo: event.target.value })} placeholder="Imagen principal" /></label>
              <label>Descripción<textarea value={imageForm.descripcion} onChange={(event) => setImageForm({ ...imageForm, descripcion: event.target.value })} placeholder="Descripción opcional" /></label>
              <label>Archivo<input onChange={(event) => setImageForm({ ...imageForm, imagen: event.target.files[0] })} type="file" accept="image/*" required /></label>
              <button className="btn primary full" type="submit">Guardar Imagen</button>
              <p className="form-status">{message}</p>
            </form>

            <div className="admin-card">
              <h2>Imágenes guardadas</h2>
              <div className="image-list">
                {images.map((image) => (
                  <article key={image.id}>
                    <img src={image.url} alt={image.titulo || image.key} />
                    <div>
                      <strong>{image.titulo || image.key}</strong>
                      <span>{image.key}</span>
                      <button className="danger" onClick={() => deleteImage(image.id)}>Eliminar</button>
                    </div>
                  </article>
                ))}
                {!images.length && <p>No hay imágenes subidas todavía.</p>}
              </div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
