import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MallaCurricular from "../components/MallaCurricular.jsx";
import heroImage from "../assets/hero-enfermeria-uniformes-verde.webp";
import aboutStudentsImage from "../assets/estudiantes-santa-rita.png";
import auditorioImage from "../assets/auditorio-salud.webp";
import instalacionAulaAnatomia from "../assets/instalacion-aula-anatomia.png";
import instalacionConsultaExterna from "../assets/instalacion-consulta-externa.png";
import instalacionEvaluacion from "../assets/instalacion-evaluacion.png";
import instalacionSalaPractica from "../assets/instalacion-sala-practica.png";
import ritaImage from "../assets/rita-asesora.webp";
import santaRitaVideo from "../assets/santa-rita-video.mp4";
import ImagenSistema from "../components/ImagenSistema.jsx";
import CarruselConvenios from "../components/CarruselConvenios.jsx";
import { GradientBackground } from "../components/ui/gradient-backgrounds.jsx";
import ScrollExpandMedia from "../components/ui/scroll-expansion-hero.jsx";

const entranceVariants = {
  hidden: { opacity: 0, y: 44 },
  show: { opacity: 1, y: 0 }
};

export default function App() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const entranceProps = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.18 },
        variants: entranceVariants,
        transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] }
      };
  const [chatMessages, setChatMessages] = useState([
    "¡Hola! Soy Rita. ¿Tienes alguna duda sobre nuestra carrera de Enfermería? Haz clic en una opción o escríbeme."
  ]);
  const [chatInput, setChatInput] = useState("");

  const getAssistantReply = (message) => {
    const normalized = message.toLowerCase();

    if (normalized.includes("costo") || normalized.includes("precio") || normalized.includes("pago")) {
      return "Para conocer costos actualizados, completa la pre-inscripción y un asesor te enviará la información de mensualidades, inscripción y opciones de pago.";
    }

    if (normalized.includes("requisito") || normalized.includes("documento")) {
      return "Los requisitos principales son fotocopia de carnet, certificado de nacimiento, libreta o diploma de bachiller y fotografías. Un asesor puede confirmar la lista completa.";
    }

    if (normalized.includes("práctica") || normalized.includes("practica") || normalized.includes("convenio")) {
      return "La carrera incluye formación práctica mediante convenios con instituciones de salud como SEDES La Paz, Hospital de la Mujer, Instituto Nacional de Tórax y otros centros.";
    }

    if (normalized.includes("turno") || normalized.includes("horario")) {
      return "Tenemos turnos Mañana, Tarde y Noche. En el formulario puedes indicar tu turno preferido y el horario en el que deseas que te contacten.";
    }

    return "Gracias por tu consulta. Para darte una respuesta exacta, deja tu nombre y celular en la pre-inscripción y un asesor académico te contactará pronto.";
  };

  const sendChatMessage = (message) => {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    const reply = getAssistantReply(cleanMessage);
    setChatMessages((messages) => [...messages, `Tú: ${cleanMessage}`, `Rita: ${reply}`]);
    setChatInput("");
  };

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.55 }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  const toggleVideoAudio = () => {
    const video = videoRef.current;

    if (!video) return;

    const nextMutedState = !video.muted;
    video.muted = nextMutedState;
    setIsVideoMuted(nextMutedState);
    video.play().catch(() => {});
  };

  return (
    <>
      <Header />
      <main>
        <GradientBackground className="page-background-only" />
        <ScrollExpandMedia
          mediaType="image"
          mediaSrc={heroImage}
          bgImageSrc={heroImage}
          title={'INSTITUTO TECNICO EN SALUD "SANTA RITA" SRL'}
          date="Instituto Santa Rita"
          scrollToExpand="Desliza para descubrir la carrera"
          className="santa-intro"
        >
          <div className="intro-copy">
            <p>Mas de 25 anos formando profesionales de la salud en Bolivia, con excelencia tecnica, practica clinica y vocacion de servicio.</p>
            <div className="hero-actions">
              <Link className="btn primary" to="/preinscripcion">Inscribete ahora</Link>
              <a className="btn ghost" href="#oferta">Conoce nuestra oferta</a>
            </div>
          </div>
        </ScrollExpandMedia>

        <motion.section className="section split" id="nosotros" {...entranceProps}>
          <div className="copy-block">
            <span className="eyebrow">Trayectoria y compromiso</span>
            <h2>¿Quiénes somos?</h2>
            <p>Fundado en 1998, el Instituto Santa Rita ha consolidado su prestigio a través de décadas de dedicación a la formación de cuadros técnicos en salud. Bajo la Resolución Ministerial R.M. N° 085/2023, operamos con plena legalidad y compromiso académico.</p>
            <article className="info-note">
              <h3>Misión</h3>
              <p>Formar Técnicos Medios en Enfermería con alta competencia científica, técnica y profunda vocación de servicio humano, capaces de responder a los retos del sistema nacional de salud.</p>
            </article>
            <article className="info-note">
              <h3>Visión</h3>
              <p>Ser la institución líder y referente en Bolivia en la formación de profesionales técnicos de salud, reconocida por la excelencia académica y los valores éticos de sus egresados.</p>
            </article>
            <article className="info-note resolutions-note">
              <h3>Resoluciones institucionales</h3>
              <div className="resolution-list" aria-label="Resoluciones institucionales por año">
                <span>1999 · R.M. 290/99</span>
                <span>2008 · R.M. 933/08</span>
                <span>2010 · R.M. 530/2010</span>
                <span>2014 · R.M. 124/2014</span>
                <span>2014 · R.M. 975/2014</span>
                <span>2015 · R.A. 155/2015</span>
                <span>2017 · R.M. 2485/2017</span>
                <span>2019 · R.M. 0565/2019</span>
                <span>2020 · R.A. 0001/2020</span>
                <span>2023 · R.M. 0880/2023</span>
              </div>
            </article>
          </div>
          <div className="image-stack">
            <img src={aboutStudentsImage} alt="Estudiantes de enfermeria del Instituto Santa Rita en sala de practica clinica" />
            <div className="stat-card">
              <strong>25+</strong>
              <span>Años educando</span>
            </div>
          </div>
        </motion.section>

        <motion.section className="section academic" id="oferta" {...entranceProps}>
          <div className="section-heading">
            <h2>Oferta Académica</h2>
            <p>Programa curricular actualizado y aprobado para formar profesionales competentes desde el primer día.</p>
          </div>
          <div className="academic-grid">
            <div className="program-table">
              <div className="table-head"><span>Artículo</span><span>Detalle del Programa</span></div>
              <div className="table-row"><span>Carrera</span><strong>Técnico en Enfermería</strong></div>
              <div className="table-row"><span>Nivel</span><strong>Técnico Medio</strong></div>
              <div className="table-row"><span>Duración</span><strong>2 años (anual)</strong></div>
              <div className="table-row"><span>Modalidad</span><strong>70% presencial y 30% teórico</strong></div>
              <div className="table-row"><span>Carga Horaria</span><strong>2.400 horas académicas</strong></div>
            </div>
            <aside className="profile-card">
              <h3>Perfil del Egresado</h3>
              <ul>
                <li>Brindar cuidados de enfermería integrales al individuo, familia y comunidad.</li>
                <li>Prestar acciones de prevención y promoción de la salud.</li>
                <li>Asistir éticamente en procedimientos médico-quirúrgicos.</li>
              </ul>
              <Link className="btn light" to="/preinscripcion">Solicitar Información</Link>
            </aside>
          </div>
        </motion.section>

        <motion.div {...entranceProps}>
          <MallaCurricular />
        </motion.div>

        <motion.section className="section split compact" {...entranceProps}>
          <div className="copy-block">
            <h2>Prácticas y Convenios</h2>
            <p>Garantizamos tu formación práctica mediante alianzas estratégicas con las instituciones de salud más importantes del país.</p>
            <div className="chips">
              <span>Hospital Municipal Cotahuma</span>
              <span>Hospital Municipal La Paz</span>
              <span>Hospital Arco Iris</span>
              <span>Hospital del Tórax</span>
              <span>Hospital de la Mujer</span>
            </div>
          </div>
          <CarruselConvenios />
        </motion.section>

        <motion.section className="legal-band" {...entranceProps}>
          <div className="legal-inner">
            <h2>Respaldo y Garantía Legal</h2>
            <p>Cumplimos con todos los estándares nacionales para tu formación profesional.</p>
            <div className="legal-grid">
              <article><span className="line-icon">✓</span><h3>Ministerio de Educación</h3><p>Instituto legalmente reconocido por el Estado Plurinacional de Bolivia.</p></article>
              <article><span className="line-icon">§</span><h3>Resolución Ministerial</h3><p>R.M. N° 085/2023. Asegurando excelencia académica y legal.</p></article>
              <article><span className="line-icon">▣</span><h3>Títulos Oficiales</h3><p>Validez nacional para el ejercicio profesional inmediato.</p></article>
            </div>
          </div>
        </motion.section>

        <motion.section className="section" id="instalaciones" {...entranceProps}>
          <div className="section-title-left">
            <h2>Instalaciones de Primer Nivel</h2>
            <p>Ambientes modernos equipados para la enseñanza médica.</p>
          </div>
          <div className="gallery">
            <img className="tall" src={instalacionSalaPractica} alt="Sala de practica clinica con estudiantes de enfermeria" />
            <img src={instalacionAulaAnatomia} alt="Clase de anatomia con estudiantes del Instituto Santa Rita" />
            <img src={instalacionConsultaExterna} alt="Ambiente de consulta externa para practicas de enfermeria" />
            <img className="wide gallery-contain" src={instalacionEvaluacion} alt="Evaluacion academica con estudiantes del Instituto Santa Rita" />
          </div>
        </motion.section>

        <motion.section className="section testimonials" {...entranceProps}>
          <div className="section-heading">
            <span className="eyebrow">Voces Santa Rita</span>
            <h2>Lo que dicen nuestros estudiantes</h2>
            <p>Historias reales de confianza, práctica y acompañamiento durante su formación en enfermería.</p>
          </div>
          <div className="testimonial-grid">
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Al principio tenia miedo de no poder, pero en las practicas los licenciados te van guiando paso a paso. Eso me ayudo mucho a agarrar confianza."</p>
              <strong>Maria F.</strong>
              <span>Primer año</span>
            </article>
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Me gusta que no todo se queda en teoria. Practicamos, preguntamos, nos corrigen y poco a poco uno se siente mas preparado para atender bien."</p>
              <strong>Jose L.</strong>
              <span>Segundo año</span>
            </article>
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Lo que mas valoro es el ambiente. Hay exigencia, si, pero tambien apoyo. Si uno pone de su parte, aqui aprende de verdad."</p>
              <strong>Daniela R.</strong>
              <span>Estudiante en practicas</span>
            </article>
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Entre por recomendacion de una amiga y me quede tranquila. Me explicaron horarios, requisitos y siempre hay alguien que te orienta."</p>
              <strong>Camila S.</strong>
              <span>Turno tarde</span>
            </article>
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Las clases de primeros auxilios me gustaron bastante porque hacemos casos y simulaciones. Ahi uno entiende para que sirve cada procedimiento."</p>
              <strong>Kevin M.</strong>
              <span>Estudiante</span>
            </article>
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Yo buscaba estudiar algo que me permita ayudar a mi familia y trabajar en salud. Santa Rita me dio ese empujon para empezar."</p>
              <strong>Rocio V.</strong>
              <span>Turno noche</span>
            </article>
          </div>
        </motion.section>

        <motion.section className="section support" id="contacto" {...entranceProps}>
          <div className="copy-block">
            <h2>Resuelve tus dudas al instante</h2>
            <p>Nuestra asesora académica Rita está disponible para ayudarte con información sobre requisitos, costos y horarios.</p>
            <div className="mini-list">
              <span>Atención personalizada inmediata</span>
              <span>Horarios de oficina: 08:00 - 21:00</span>
            </div>
          </div>
          <div className="support-visual">
            <div className="rita-portrait">
              <ImagenSistema imageKey="contacto_imagen" fallback={ritaImage} alt="Rita, asesora académica virtual del Instituto Santa Rita" />
            </div>
            <div className="chat-card">
              <div className="chat-head"><div className="avatar">R</div><div><strong>Rita - Asesora Académica</strong><span>En línea ahora</span></div></div>
              <div className="chat-body">
                {chatMessages.map((message, index) => (
                  <div className={message.startsWith("Tú:") ? "message user-message" : "message"} key={`${message}-${index}`}>
                    {message}
                  </div>
                ))}
              </div>
              <div className="quick-replies">
                <button onClick={() => sendChatMessage("Costos")} type="button">Costos</button>
                <button onClick={() => sendChatMessage("Requisitos")} type="button">Requisitos</button>
                <button onClick={() => sendChatMessage("Prácticas")} type="button">Prácticas</button>
              </div>
              <form className="chat-form" onSubmit={(event) => {
                event.preventDefault();
                sendChatMessage(chatInput);
              }}>
                <input value={chatInput} onChange={(event) => setChatInput(event.target.value)} type="text" placeholder="Escribe tu mensaje..." />
                <button type="submit" aria-label="Enviar">›</button>
              </form>
            </div>
          </div>
        </motion.section>

        <motion.section className="section final-video" {...entranceProps}>
          <div className="final-video-copy">
            <span className="eyebrow">Vive la experiencia Santa Rita</span>
            <h2>Conoce de cerca nuestra formacion</h2>
            <p>Un vistazo real al ambiente academico, la energia de nuestros estudiantes y el camino profesional que puedes comenzar aqui.</p>
            <Link className="btn primary" to="/preinscripcion">Quiero pre-inscribirme</Link>
          </div>
          <div className="final-video-frame">
            <video
              ref={videoRef}
              src={santaRitaVideo}
              loop
              muted={isVideoMuted}
              preload="metadata"
              playsInline
              controls
              aria-label="Video institucional del Instituto Santa Rita"
            />
            <button className="video-audio-toggle" type="button" onClick={toggleVideoAudio}>
              {isVideoMuted ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
              <span>{isVideoMuted ? "Activar audio" : "Silenciar"}</span>
            </button>
          </div>
        </motion.section>

        <motion.section className="section enrollment" id="preinscripcion" {...entranceProps}>
          <div className="copy-block">
            <h2>Comienza tu camino hoy</h2>
            <p>Completa el formulario y asegura tu lugar. Nuestros asesores te guiarán en cada paso del proceso.</p>
            <div className="mini-list">
              <span>Cupos limitados por gestión</span>
              <span>Turnos Mañana, Tarde y Noche</span>
            </div>
          </div>
          <Link className="form-promo" to="/preinscripcion">Abrir formulario de pre-inscripción</Link>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
