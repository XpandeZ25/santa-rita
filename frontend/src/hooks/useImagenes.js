import { useContext } from "react";
import { ImagenesContext } from "../context/ImagenesContext.jsx";

export default function useImagenes() {
  const context = useContext(ImagenesContext);
  if (!context) throw new Error("useImagenes debe usarse dentro de ImagenesProvider");
  return context;
}
