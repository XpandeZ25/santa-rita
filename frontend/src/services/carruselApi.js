import api from "./api.js";

export const carruselApi = {
  getPublicas: () => api.get("/carrusel/imagenes"),
  getAll: () => api.get("/admin/carrusel/imagenes"),
  create: (data) => api.post("/admin/carrusel/imagenes", data, { headers: { "Content-Type": undefined } }),
  update: (id, data) => api.put(`/admin/carrusel/imagenes/${id}`, data, { headers: { "Content-Type": undefined } }),
  remove: (id) => api.delete(`/admin/carrusel/imagenes/${id}`),
  reorder: (ordenes) => api.patch("/admin/carrusel/reordenar", { ordenes })
};
