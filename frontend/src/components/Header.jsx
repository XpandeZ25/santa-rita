import { Link } from "react-router-dom";
import { GraduationCap, Home, Images, MessageCircle, Users } from "lucide-react";
import logo from "../assets/logo-santa-rita.webp";
import ImagenSistema from "./ImagenSistema.jsx";
import { NavBar } from "./ui/tubelight-navbar.jsx";

const navItems = [
  { name: "Inicio", url: "#inicio", icon: Home },
  { name: "Nosotros", url: "#nosotros", icon: Users },
  { name: "Carrera", url: "#oferta", icon: GraduationCap },
  { name: "Instalaciones", url: "#instalaciones", icon: Images },
  { name: "Contacto", url: "#contacto", icon: MessageCircle }
];

export default function Header() {
  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/">
          <ImagenSistema imageKey="logo_principal" className="brand-logo" fallback={logo} alt="Santa Rita" />
        </Link>
        <Link className="nav-cta" to="/preinscripcion">Pre-inscripcion</Link>
      </header>
      <NavBar items={navItems} />
    </>
  );
}
