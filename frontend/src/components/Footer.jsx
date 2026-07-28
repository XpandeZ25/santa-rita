import logo from "../assets/logo-santa-rita.webp";
import ImagenSistema from "./ImagenSistema.jsx";

export default function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="footer-grid">
          <div className="footer-brand-block">
            <ImagenSistema imageKey="footer_logo" className="footer-logo" fallback={logo} alt="Santa Rita" />
            <p>Líderes en formación de personal de enfermería con valores éticos y excelencia técnica en Bolivia.</p>
          </div>

          <div className="footer-contact-block">
            <h3>Nuestra Dirección</h3>
            <p><strong>Teléfonos:</strong> 23112062 - 2334302 - 72004647 - 64155020</p>
            <p><strong>Correo:</strong> info@santarita.edu.bo</p>
            <p><strong>Dirección:</strong> Av. Villazón N° 1970, Edif. Roman, 1er. y 2do. Piso (Frente UMSA)</p>
          </div>

          <div className="footer-social-block">
            <h3>Siguenos</h3>
            <div className="social-links">
              <a className="social-link facebook" href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
              <a className="social-link youtube" href="https://www.youtube.com/" target="_blank" rel="noreferrer" aria-label="YouTube">▶</a>
              <a className="social-link instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
            </div>
            <nav className="footer-mini-nav" aria-label="Enlaces del footer">
              <a href="/#nosotros">Sobre Nosotros</a>
              <a href="/#oferta">Oferta Académica</a>
              <a href="/preinscripcion">Preinscripción</a>
            </nav>
          </div>

          <div className="map-card">
            <iframe
              title="Ubicacion del Instituto Santa Rita"
              src="https://maps.google.com/maps?q=-16.5049897,-68.1304899&z=17&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.app.goo.gl/VbXoMiXQvrF5UeSLA"
              target="_blank"
              rel="noreferrer"
              aria-label="Abrir ubicacion en Google Maps"
            >
              Ver ubicacion
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <a href="/#contacto">Política de privacidad</a>
          <a href="/#contacto">Aviso Legal</a>
          <a href="/#contacto">Cookies</a>
        </div>

        <div className="creator-bar">
          Página desarrollada por <strong>XpandeZ</strong>
        </div>
      </footer>

      <a
        className="whatsapp-float"
        href="https://wa.me/59172004647?text=Hola%2C%20quiero%20informacion%20sobre%20el%20Instituto%20Santa%20Rita"
        target="_blank"
        rel="noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
          <path d="M16.04 3.2c-7.04 0-12.77 5.61-12.77 12.51 0 2.2.59 4.36 1.7 6.25L3.16 28.8l7.1-1.78a13.02 13.02 0 0 0 5.78 1.35c7.04 0 12.77-5.61 12.77-12.51S23.08 3.2 16.04 3.2Zm0 22.99c-1.86 0-3.68-.49-5.27-1.42l-.38-.22-4.22 1.06 1.08-4.01-.25-.41a10.16 10.16 0 0 1-1.55-5.48c0-5.7 4.75-10.33 10.59-10.33s10.59 4.63 10.59 10.33-4.75 10.48-10.59 10.48Z" />
          <path d="M21.9 18.44c-.32-.16-1.9-.92-2.19-1.03-.29-.1-.51-.16-.72.16-.21.31-.83 1.02-1.01 1.23-.19.21-.37.23-.69.08-.32-.16-1.35-.49-2.58-1.55-.95-.83-1.59-1.86-1.78-2.17-.19-.31-.02-.48.14-.64.15-.14.32-.37.48-.55.16-.18.21-.31.32-.52.11-.21.05-.39-.03-.55-.08-.16-.72-1.7-.99-2.33-.26-.61-.53-.53-.72-.54h-.61c-.21 0-.56.08-.85.39-.29.31-1.12 1.07-1.12 2.62s1.15 3.05 1.31 3.26c.16.21 2.27 3.4 5.5 4.77.77.33 1.37.52 1.84.67.77.24 1.47.2 2.02.12.62-.09 1.9-.76 2.17-1.49.27-.73.27-1.36.19-1.49-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </a>
    </>
  );
}
