import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useImagenes from "../hooks/useImagenes.js";

export default function Carrusel() {
  const { porSeccion, cargando: loading } = useImagenes();
  const slides = porSeccion("slider");
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return undefined;
    const timer = setInterval(() => setCurrent((value) => (value + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, [paused, slides.length]);

  if (loading) return <section className="carousel-shell carousel-loading" aria-label="Cargando carrusel" />;
  if (!slides.length) return null;
  const move = (step) => setCurrent((current + step + slides.length) % slides.length);

  return (
    <section className="carousel-shell" aria-roledescription="carrusel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => <article className="carousel-slide" key={slide.id} aria-hidden={index !== current}>
          <img src={slide.url} alt={slide.titulo || "Imagen del Instituto Santa Rita"} loading={index ? "lazy" : "eager"} />
          {(slide.titulo || slide.descripcion) && <div className="carousel-caption"><h2>{slide.titulo}</h2><p>{slide.descripcion}</p></div>}
        </article>)}
      </div>
      {slides.length > 1 && <><button className="carousel-arrow prev" onClick={() => move(-1)} aria-label="Imagen anterior"><ChevronLeft /></button><button className="carousel-arrow next" onClick={() => move(1)} aria-label="Imagen siguiente"><ChevronRight /></button><div className="carousel-dots">{slides.map((slide, index) => <button key={slide.id} className={index === current ? "active" : ""} onClick={() => setCurrent(index)} aria-label={`Ir a imagen ${index + 1}`} />)}</div></>}
    </section>
  );
}
