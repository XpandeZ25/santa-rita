import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import heroImage from "../assets/hero-enfermeria-uniformes-verde.webp";
import auditorioImage from "../assets/auditorio-salud.webp";
import ritaImage from "../assets/rita-asesora.webp";
import santaRitaVideo from "../assets/santa-rita-video.mp4";
import ImagenSistema from "../components/ImagenSistema.jsx";
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
          </div>
          <div className="image-stack">
            <ImagenSistema imageKey="about_imagen" fallback={heroImage} alt="Práctica en sala de simulación clínica" />
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
              <div className="table-row"><span>Carrera</span><strong>Técnico Medio en Enfermería</strong></div>
              <div className="table-row"><span>Nivel</span><strong>Técnico Medio</strong></div>
              <div className="table-row"><span>Duración</span><strong>2 años (4 semestres)</strong></div>
              <div className="table-row"><span>Modalidad</span><strong>Presencial</strong></div>
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

        <motion.section className="section split compact" {...entranceProps}>
          <div className="copy-block">
            <h2>Prácticas y Convenios</h2>
            <p>Garantizamos tu formación práctica mediante alianzas estratégicas con las instituciones de salud más importantes del país.</p>
            <div className="chips">
              <span>SEDES La Paz</span>
              <span>GAME</span>
              <span>Hosp. de la Mujer</span>
              <span>Inst. Nac. de Tórax</span>
              <span>Hospital Arco Iris</span>
            </div>
          </div>
          <ImagenSistema imageKey="servicio_1" className="wide-photo" fallback={auditorioImage} alt="Seminario académico de salud en auditorio" />
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
            <ImagenSistema imageKey="instalacion_1" className="tall" fallback={heroImage} alt="Laboratorio de simulación clínica" />
            <ImagenSistema imageKey="instalacion_2" fallback={heroImage} alt="Aula práctica de enfermería" />
            <ImagenSistema imageKey="instalacion_3" fallback={auditorioImage} alt="Biblioteca y espacios académicos" />
            <ImagenSistema imageKey="instalacion_4" className="wide" fallback={auditorioImage} alt="Auditorio de capacitación" />
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
              <span>Becas por excelencia académica</span>
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
