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
import reconocimiento1 from "../assets/reconocimiento-1.jpg";
import reconocimiento5 from "../assets/reconocimiento-5.jpg";
import reconocimiento6 from "../assets/reconocimiento-6.jpg";
import reconocimiento7 from "../assets/reconocimiento-7.jpg";
import { GradientBackground } from "../components/ui/gradient-backgrounds.jsx";
import ScrollExpandMedia from "../components/ui/scroll-expansion-hero.jsx";
import logo from "../assets/logo-santa-rita.webp";

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
  const [isChatOpen, setIsChatOpen] = useState(false);

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
          title={'INSTITUTO TECNICO EN SALUD "SANTA RITA" S.R.L.'}
          className="santa-intro"
        >
          <div className="intro-copy">
            <p>Más de 25 años formando profesionales de la salud en Bolivia, con excelencia técnica, práctica clínica y vocación de servicio.</p>
            <div className="hero-actions">
              <Link className="btn primary" to="/preinscripcion">Inscríbete ahora</Link>
              <a className="btn ghost" href="#oferta">Conoce nuestra oferta</a>
            </div>
          </div>
        </ScrollExpandMedia>

        {/* Santa Rita Slogan/Brand Banner (Customized like Señor de Mayo banner) */}
        <section className="brand-hero-banner">
          <div className="banner-content">
            <img src={logo} className="banner-logo" alt="Logo Instituto Santa Rita" />
            <h2 className="banner-title">INSTITUTO TECNICO EN SALUD</h2>
            <h1 className="banner-subtitle">"SANTA RITA" S.R.L.</h1>
            <p className="banner-slogan">Formando profesionales en salud con excelencia y vocación.</p>
            
            {/* Metric Cards Section */}
            <div className="banner-metrics-grid">
              <div className="metric-card">
                <span className="metric-number">+25</span>
                <span className="metric-title">AÑOS DE TRAYECTORIA</span>
                <span className="metric-desc">Formando profesionales en salud desde 1998</span>
              </div>
              <div className="metric-card">
                <span className="metric-number">+10</span>
                <span className="metric-title">CONVENIOS DE SALUD</span>
                <span className="metric-desc">Prácticas en hospitales de 1er, 2do y 3er nivel</span>
              </div>
              <div className="metric-card">
                <span className="metric-number">100%</span>
                <span className="metric-title">ACREDITACIÓN MINISTERIAL</span>
                <span className="metric-desc">Resolución Ministerial R.M. 0880/2023 (09/10/2023)</span>
              </div>
            </div>
          </div>
        </section>

        <motion.section className="section split" id="nosotros" {...entranceProps}>
          <div className="copy-block">
            <span className="eyebrow">Trayectoria y compromiso</span>
            <h2>¿Quiénes somos?</h2>
            <p>Fundado en 1998, el Instituto Santa Rita ha consolidado su prestigio a través de décadas de dedicación a la formación de cuadros técnicos en salud. Bajo la Resolución Ministerial R.M. N° 290/1999, operamos con plena legalidad y compromiso académico.</p>
            <article className="info-note">
              <h3>Misión</h3>
              <p>Contribuir al Desarrollo de los Bachilleres del departamento de La Paz, ofertando la oportunidad de Formación de Técnicos Medios en Enfermería, orientando a la excelencia académica y el desarrollo de las competencias laborales en el área de salud acordes a los avances científicos – tecnológicos y el modelo SAFCI, con un valor agregado de generar en los docentes y estudiantes principios de disciplina humanización del servicio y responsabilidad social sostenible.</p>
            </article>
            <article className="info-note">
              <h3>Visión</h3>
              <p>Constituirse a ser un referente educativo, modelo de organización dinámica e innovadora, en base a un proceso de gestión que coordine e implique a todos los participantes con un sentido académico e Institucional, que cumpla con los estándares de excelencia académica y de gestión con presencia a nivel local y departamental, dirigida a la formación integral de profesionales Técnicos Medios en Enfermería.</p>
            </article>
            <article className="info-note resolutions-note">
              <h3>Resoluciones institucionales</h3>
              <div className="resolution-list" aria-label="Resoluciones institucionales por año">
                <span>R.M. 290/1999 (20/08/1998)</span>
                <span>R.M. 933/2008 (07/11/2008)</span>
                <span>R.M. 124/2014 (24/02/2014)</span>
                <span>R.M. 976/2014 (10/12/2014)</span>
                <span>R.M. 2485/2017 (21/08/2017)</span>
                <span>R.A. 0001/2020 (27/01/2020)</span>
                <span>R.M. 0880/2023 (09/10/2023)</span>
              </div>
            </article>
          </div>
          <div className="image-stack">
            <img src={aboutStudentsImage} alt="Estudiantes de enfermería del Instituto Santa Rita en sala de práctica clínica" loading="lazy" decoding="async" />
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
              <div className="table-row"><span>Carrera</span><strong>Enfermería</strong></div>
              <div className="table-row"><span>Nivel</span><strong>Técnico Medio</strong></div>
              <div className="table-row"><span>Duración</span><strong>2 años (anual)</strong></div>
              <div className="table-row"><span>Modalidad</span><strong>70% práctico y 30% teórico</strong></div>
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
              <span>Hospital Municipal La Portada</span>
              <span>Hospital Arco Iris S.R.L.</span>
              <span>Hospital de la Mujer</span>
              <span>Hospital Municipal La Paz</span>
              <span>Instituto Nacional de Tórax</span>
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
              <article><span className="line-icon">§</span><h3>Resolución Ministerial</h3><p>R.M. 0880/2023 (09/10/2023). Asegurando excelencia académica y legal.</p></article>
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
            <img className="tall" src={instalacionSalaPractica} alt="Sala de práctica clínica con estudiantes de enfermería" loading="lazy" decoding="async" />
            <img src={instalacionAulaAnatomia} alt="Clase de anatomía con estudiantes del Instituto Santa Rita" loading="lazy" decoding="async" />
            <img src={instalacionConsultaExterna} alt="Ambiente de consulta externa para prácticas de enfermería" loading="lazy" decoding="async" />
            <img className="wide gallery-contain" src={instalacionEvaluacion} alt="Evaluación académica con estudiantes del Instituto Santa Rita" loading="lazy" decoding="async" />
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
              <p>"Al principio tenía miedo de no poder, pero en las prácticas los licenciados te van guiando paso a paso. Eso me ayudó mucho a agarrar confianza."</p>
              <strong>Maria F.</strong>
              <span>Primer año</span>
            </article>
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Me gusta que no todo se queda en teoría. Practicamos, preguntamos, nos corrigen y poco a poco uno se siente más preparado para atender bien."</p>
              <strong>Jose L.</strong>
              <span>Segundo año</span>
            </article>
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Lo que más valoro es el ambiente. Hay exigencia, sí, pero también apoyo. Si uno pone de su parte, aquí aprende de verdad."</p>
              <strong>Daniela R.</strong>
              <span>Estudiante en prácticas</span>
            </article>
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Entré por recomendación de una amiga y me quedé tranquila. Me explicaron horarios, requisitos y siempre hay alguien que te orienta."</p>
              <strong>Camila S.</strong>
              <span>Turno tarde</span>
            </article>
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Las clases de primeros auxilios me gustaron bastante porque hacemos casos y simulaciones. Ahí uno entiende para qué sirve cada procedimiento."</p>
              <strong>Kevin M.</strong>
              <span>Estudiante</span>
            </article>
            <article>
              <div className="stars" aria-label="5 estrellas">★★★★★</div>
              <p>"Yo buscaba estudiar algo que me permita ayudar a mi familia y trabajar en salud. Santa Rita me dio ese empujón para empezar."</p>
              <strong>Rocio V.</strong>
              <span>Turno noche</span>
            </article>
          </div>
        </motion.section>

        <motion.section className="section recognitions" id="reconocimientos" {...entranceProps}>
          <div className="recognitions-container">
            <div className="section-title-left">
              <span className="eyebrow">Nuestros Reconocimientos</span>
              <h2>Gobierno Autónomo Departamental de La Paz – SEDES La Paz</h2>
            </div>
            
            <div className="recognitions-intro">
              <div className="recognitions-intro-main">
                <p className="highlight-lead">
                  El INSTITUTO TECNICO EN SALUD "SANTA RITA" S.R.L. ha sido distinguido con un reconocimiento oficial otorgado por el Gobierno Autónomo Departamental de La Paz, a través del Servicio Departamental de Salud (SEDES) y la Secretaría Departamental de Salud, por su alto profesionalismo y su invaluable aporte al Programa Departamental de Lucha contra el Cáncer.
                </p>
                <p className="highlight-quote">
                  El INSTITUTO TECNICO EN SALUD "SANTA RITA" S.R.L. reafirma su misión de formar profesionales íntegros, comprometidos con el bienestar de la comunidad y con la construcción de un futuro más saludable para todos.
                </p>
              </div>
              <div className="recognitions-intro-side">
                <p>
                  Este reconocimiento resalta el compromiso del INSTITUTO TECNICO EN SALUD "SANTA RITA" S.R.L. con la mejora de la calidad de vida de los pacientes, su humanidad y su dedicación constante al fortalecimiento del sistema de salud en el departamento.
                </p>
                <p>
                  Durante la ceremonia, las autoridades destacaron la labor del INSTITUTO TECNICO EN SALUD "SANTA RITA" S.R.L. como ejemplo de excelencia académica, ética profesional y responsabilidad social, pilares que contribuyen al desarrollo humano y sanitario de La Paz y Bolivia.
                </p>
              </div>
            </div>

            <div className="recognitions-gallery">
              <div className="gallery-item tall main-recognition">
                <img src={reconocimiento1} alt="Reconocimiento Oficial SEDES La Paz al Instituto Santa Rita" loading="lazy" decoding="async" />
                <span className="badge-featured">Distinción Oficial</span>
              </div>
              <div className="gallery-item">
                <img src={reconocimiento5} alt="Autoridades del SEDES La Paz entregando el reconocimiento" loading="lazy" decoding="async" />
              </div>
              <div className="gallery-item">
                <img src={reconocimiento6} alt="Reconocimiento oficial a las autoridades académicas" loading="lazy" decoding="async" />
              </div>
              <div className="gallery-item wide">
                <img src={reconocimiento7} alt="Grupo de autoridades académicas y de salud de La Paz" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="section support" id="contacto" {...entranceProps}>
          <div className="copy-block">
            <h2>Resuelve tus dudas al instante</h2>
            <p>Nuestra asesora académica Rita está disponible para ayudarte con información sobre requisitos, costos y horarios.</p>
            <div className="mini-list">
              <span>Atención personalizada inmediata</span>
              <span>Horarios de oficina: 08:30 a 12:30 y 14:30 a 21:00</span>
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
            <h2>Conoce de cerca nuestra formación</h2>
            <p>Un vistazo real al ambiente académico, la energía de nuestros estudiantes y el camino profesional que puedes comenzar aquí.</p>
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

      {/* Floating Chat Button (Bottom Left) */}
      <button
        type="button"
        className={`chat-float-btn ${isChatOpen ? "active" : ""}`}
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label="Abrir asistente virtual"
      >
        <div className="chat-icon-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span className="active-dot"></span>
        </div>
        <div className="chat-text-block">
          <span className="title-text">¿NECESITAS AYUDA?</span>
          <span className="sub-text">Asistente Virtual IA</span>
        </div>
      </button>

      {/* Floating Chat Drawer/Window (Bottom Left) */}
      {isChatOpen && (
        <div className="floating-chat-container">
          <div className="chat-card floating-chat-card">
            <div className="chat-head">
              <div className="avatar">R</div>
              <div>
                <strong>Rita - Asesora Académica</strong>
                <span>En línea ahora</span>
              </div>
              <button
                type="button"
                className="close-chat-btn"
                onClick={() => setIsChatOpen(false)}
                aria-label="Cerrar chat"
              >
                &times;
              </button>
            </div>
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
            <form
              className="chat-form"
              onSubmit={(event) => {
                event.preventDefault();
                sendChatMessage(chatInput);
              }}
            >
              <input
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                type="text"
                placeholder="Escribe tu mensaje..."
              />
              <button type="submit" aria-label="Enviar">›</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
