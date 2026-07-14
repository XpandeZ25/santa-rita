import { useEffect, useMemo, useState } from "react";
import { GripVertical, Pencil, Plus, Search, Trash2, Upload, X } from "lucide-react";
import { carruselApi } from "../services/carruselApi.js";

const emptyForm = { key: "", titulo: "", descripcion: "", seccion: "slider", activo: true, imagen: null, archivos: [] };
const sections = ["header", "favicon", "hero", "slider", "about", "servicios", "instalaciones", "testimonios", "contacto", "footer", "fondo", "equipo", "galeria"];

export default function AdminCarrusel({ onCountChange }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [preview, setPreview] = useState("");
  const [query, setQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState("todas");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState(null);
  const [dragged, setDragged] = useState(null);

  const notify = (text, type = "success") => { setToast({ text, type }); setTimeout(() => setToast(null), 3200); };
  const load = async () => {
    setLoading(true);
    try { const { data } = await carruselApi.getAll(); setImages(data); onCountChange?.(data.length); }
    catch { notify("No se pudieron cargar las imágenes.", "error"); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => images.filter((item) => ((item.titulo || "") + item.key).toLowerCase().includes(query.toLowerCase()) && (sectionFilter === "todas" || item.seccion === sectionFilter)), [images, query, sectionFilter]);
  const pages = Math.max(1, Math.ceil(filtered.length / 10));
  const visible = filtered.slice((page - 1) * 10, page * 10);

  const open = (image = null) => {
    setIsOpen(true);
    setEditing(image);
    setForm(image ? { key: image.key, titulo: image.titulo || "", descripcion: image.descripcion || "", seccion: image.seccion || "slider", activo: image.activo, imagen: null, archivos: [] } : emptyForm);
    setPreview(image?.url || "");
  };
  const close = () => { setIsOpen(false); setEditing(null); setForm(emptyForm); setPreview(""); };
  const chooseFile = (file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return notify("La imagen no puede superar 5 MB.", "error");
    setForm((value) => ({ ...value, imagen: file }));
    setPreview(URL.createObjectURL(file));
  };
  const chooseFiles = (fileList) => {
    const files = Array.from(fileList || []).filter((file) => file.type.startsWith("image/") && file.size <= 5 * 1024 * 1024);
    if (!files.length) return notify("Selecciona imágenes válidas de hasta 5 MB.", "error");
    setForm((value) => ({ ...value, imagen: files[0], archivos: files }));
    setPreview(URL.createObjectURL(files[0]));
  };
  const save = async (event) => {
    event.preventDefault();
    if (!editing && !form.imagen) return notify("Selecciona una imagen.", "error");
    setSaving(true);
    try {
      const files = editing ? [form.imagen].filter(Boolean) : (form.archivos.length ? form.archivos : [form.imagen]);
      if (editing) {
        const data = new FormData();
        [["key", form.key], ["titulo", form.titulo], ["descripcion", form.descripcion], ["activo", String(form.activo)], ["seccion", form.seccion]].forEach(([key,value]) => data.append(key,value));
        if (form.imagen) data.append("imagen", form.imagen);
        await carruselApi.update(editing.id, data);
      } else {
        await Promise.all(files.map((file, index) => {
          const data = new FormData();
          data.append("key", files.length === 1 && form.key ? form.key : `${form.seccion}-${Date.now()}-${index + 1}`);
          data.append("titulo", files.length === 1 ? form.titulo : (form.titulo || file.name.replace(/\.[^.]+$/, "")));
          data.append("descripcion", form.descripcion); data.append("activo", String(form.activo)); data.append("seccion", form.seccion); data.append("imagen", file);
          return carruselApi.create(data);
        }));
      }
      close(); await load(); notify(editing ? "Imagen actualizada." : `${files.length} imagen${files.length > 1 ? "es agregadas" : " agregada"} exitosamente.`);
    } catch (error) { notify(error.response?.data?.error || "No se pudo guardar la imagen.", "error"); }
    finally { setSaving(false); }
  };
  const remove = async (image) => {
    if (!window.confirm(`¿Eliminar definitivamente “${image.titulo || "esta imagen"}”?`)) return;
    try { await carruselApi.remove(image.id); await load(); notify("Imagen eliminada."); }
    catch { notify("No se pudo eliminar la imagen.", "error"); }
  };
  const drop = async (target) => {
    if (!dragged || dragged.id === target.id) return;
    const ordered = [...images];
    const from = ordered.findIndex((item) => item.id === dragged.id);
    const to = ordered.findIndex((item) => item.id === target.id);
    ordered.splice(to, 0, ordered.splice(from, 1)[0]);
    const normalized = ordered.map((item, posicion) => ({ ...item, posicion }));
    setImages(normalized); setDragged(null);
    try { await carruselApi.reorder(normalized.map(({ id, posicion }) => ({ id, posicion }))); notify("Orden actualizado."); }
    catch { await load(); notify("No se pudo cambiar el orden.", "error"); }
  };

  return <section className="carousel-admin">
    {toast && <div className={`toast ${toast.type}`}>{toast.text}</div>}
    <div className="carousel-admin-head"><div><h2>Gestor de imágenes del sitio</h2><p>Administra logos, portada, carrusel y todas las secciones.</p></div><button className="btn primary" onClick={() => open()}><Plus size={18} /> Nueva imagen</button></div>
    <div className="admin-filter-row"><label className="admin-search"><Search size={18} /><input value={query} onChange={(e) => { setQuery(e.target.value); setPage(1); }} placeholder="Buscar por título o clave..." /></label><select value={sectionFilter} onChange={(e) => { setSectionFilter(e.target.value); setPage(1); }}><option value="todas">Todas las secciones</option>{sections.map((section) => <option value={section} key={section}>{section}</option>)}</select><button onClick={load}>Actualizar</button></div>
    {loading ? <div className="carousel-admin-grid">{[1,2,3].map((n) => <div className="image-skeleton" key={n} />)}</div> :
      visible.length ? <div className="carousel-admin-grid">{visible.map((image, index) => <article className="carousel-admin-card" key={image.id} draggable onDragStart={() => setDragged(image)} onDragOver={(e) => e.preventDefault()} onDrop={() => drop(image)}>
        <div className="admin-image-wrap"><img src={image.url} alt={image.titulo || "Imagen del carrusel"} /><span className="drag-handle"><GripVertical size={20} /></span><span className={`status-badge ${image.activo ? "active" : "inactive"}`}>{image.activo ? "Activo" : "Inactivo"}</span></div>
        <div className="admin-image-body"><strong>{image.titulo || image.key}</strong><p>{image.descripcion || "Sin descripción"}</p><span>{image.seccion} · {image.key} · Pos. {image.posicion}</span><div><button className="edit-action" onClick={() => open(image)}><Pencil size={16}/> Editar</button><button className="delete-action" onClick={() => remove(image)}><Trash2 size={16}/> Eliminar</button></div></div>
      </article>)}</div> : <div className="empty-carousel"><Upload size={42}/><h3>No hay imágenes disponibles</h3><p>Agrega la primera imagen para activar el carrusel.</p></div>}
    {pages > 1 && <div className="pagination"><button disabled={page === 1} onClick={() => setPage(page - 1)}>Anterior</button><span>Página {page} de {pages}</span><button disabled={page === pages} onClick={() => setPage(page + 1)}>Siguiente</button></div>}
    {isOpen && <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && close()}><form className="image-modal" onSubmit={save}><button type="button" className="modal-close" onClick={close}><X /></button><h2>{editing ? "Editar imagen" : "Agregar imagen"}</h2>
      <label className={`drop-zone ${preview ? "has-preview" : ""}`} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); editing ? chooseFile(e.dataTransfer.files[0]) : chooseFiles(e.dataTransfer.files); }}>{preview ? <><img src={preview} alt="Previsualización" />{form.archivos.length > 1 && <strong>{form.archivos.length} imágenes seleccionadas</strong>}</> : <><Upload/><strong>Arrastra una o varias imágenes aquí</strong><span>o haz clic para seleccionar (máx. 5 MB cada una)</span></>}<input type="file" multiple={!editing} accept="image/jpeg,image/png,image/webp,image/gif" onChange={(e) => editing ? chooseFile(e.target.files[0]) : chooseFiles(e.target.files)}/></label>
      <div className="form-row"><label>Sección<select value={form.seccion} onChange={(e) => setForm({...form, seccion:e.target.value})}>{sections.map((section) => <option value={section} key={section}>{section}</option>)}</select></label><label>Clave única<input value={form.key} disabled={Boolean(editing)} onChange={(e) => setForm({...form, key:e.target.value.replace(/[^a-z0-9_\-]/gi, "_").toLowerCase()})} placeholder="Ej: logo_principal" /></label></div>
      <label>Título<input value={form.titulo} maxLength="120" onChange={(e) => setForm({...form, titulo:e.target.value})} placeholder="Título visible" /></label>
      <label>Descripción<textarea value={form.descripcion} maxLength="500" onChange={(e) => setForm({...form, descripcion:e.target.value})} placeholder="Descripción opcional" /></label>
      <label className="active-check"><input type="checkbox" checked={form.activo} onChange={(e) => setForm({...form, activo:e.target.checked})}/> Mostrar esta imagen en el sitio</label>
      <div className="modal-actions"><button type="button" className="btn cancel" onClick={close}>Cancelar</button><button className="btn primary" disabled={saving}>{saving ? "Guardando..." : "Guardar"}</button></div>
    </form></div>}
  </section>;
}
