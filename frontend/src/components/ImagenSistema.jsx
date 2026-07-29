import useImagenes from "../hooks/useImagenes.js";

export default function ImagenSistema({ imageKey, fallback, alt = "", ...props }) {
  const { porClave } = useImagenes();
  return <img src={porClave[imageKey]?.url || fallback} alt={porClave[imageKey]?.titulo || alt} loading="lazy" decoding="async" {...props} />;
}
