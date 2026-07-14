import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import api from "../services/api.js";

export const ImagenesContext = createContext(null);

export function ImagenesProvider({ children }) {
  const [lista, setLista] = useState([]);
  const [cargando, setCargando] = useState(true);
  const recargar = useCallback(async () => {
    try { const { data } = await api.get("/imagenes/publicas"); setLista(data); }
    finally { setCargando(false); }
  }, []);

  useEffect(() => { recargar(); }, [recargar]);
  useEffect(() => {
    const favicon = lista.find((image) => image.key === "favicon");
    if (favicon) {
      let link = document.querySelector("link[rel='icon']");
      if (!link) { link = document.createElement("link"); link.rel = "icon"; document.head.appendChild(link); }
      link.href = favicon.url;
    }
  }, [lista]);
  useEffect(() => {
    const base = (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(/\/api\/?$/, "");
    const socket = io(base);
    ["imagen:actualizada", "imagen:eliminada", "imagenes:reordenadas"].forEach((event) => socket.on(event, recargar));
    return () => socket.disconnect();
  }, [recargar]);

  const value = useMemo(() => ({
    lista, cargando, recargar,
    porClave: Object.fromEntries(lista.map((image) => [image.key, image])),
    porSeccion: (seccion) => lista.filter((image) => image.seccion === seccion).sort((a,b) => a.posicion - b.posicion)
  }), [lista, cargando, recargar]);
  return <ImagenesContext.Provider value={value}>{children}</ImagenesContext.Provider>;
}
