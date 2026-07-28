import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import imgTorax from "../assets/convenio-torax.jpg";
import imgArcoIris from "../assets/convenio-arco-iris.jpg";
import imgCotahuma from "../assets/convenio-cotahuma.jpg";
import imgHospitalLaPaz from "../assets/convenio-hospital-lapaz.jpg";
import imgHospitalMujer from "../assets/convenio-hospital-mujer.jpg";

const imagenes = [
  {
    src: imgTorax,
    alt: "Hospital del Tórax",
    titulo: "Hospital del Tórax",
    descripcion: "Prácticas de especialización en neumología y cirugía de tórax."
  },
  {
    src: imgArcoIris,
    alt: "Hospital Arco Iris",
    titulo: "Hospital Arco Iris",
    descripcion: "Rotaciones clínicas en uno de los hospitales más modernos y equipados de La Paz."
  },
  {
    src: imgCotahuma,
    alt: "Hospital Municipal Cotahuma",
    titulo: "Hospital Municipal Cotahuma",
    descripcion: "Prácticas comunitarias y atención primaria en salud."
  },
  {
    src: imgHospitalLaPaz,
    alt: "Hospital Municipal La Paz",
    titulo: "Hospital Municipal La Paz",
    descripcion: "Experiencia en urgencias y atención médica general."
  },
  {
    src: imgHospitalMujer,
    alt: "Hospital de la Mujer",
    titulo: "Hospital de la Mujer",
    descripcion: "Especialización y prácticas en ginecología y obstetricia."
  }
];

export default function CarruselConvenios() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagenes.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imagenes.length) % imagenes.length);
  };

  // Autoplay
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, 4000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered]);

  return (
    <div
      className="convenios-carousel-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="convenios-carousel-track-container">
        <div
          className="convenios-carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {imagenes.map((img, idx) => (
            <div className="convenios-carousel-slide" key={idx}>
              <img src={img.src} alt={img.alt} />
              <div className="convenios-carousel-caption">
                <h3>{img.titulo}</h3>
                <p>{img.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flechas */}
      <button
        className="convenios-carousel-btn prev"
        onClick={prevSlide}
        aria-label="Imagen anterior"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="convenios-carousel-btn next"
        onClick={nextSlide}
        aria-label="Siguiente imagen"
      >
        <ChevronRight size={24} />
      </button>

      {/* Indicadores */}
      <div className="convenios-carousel-indicators">
        {imagenes.map((_, idx) => (
          <button
            key={idx}
            className={`convenios-carousel-dot ${idx === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Ir a la imagen ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
