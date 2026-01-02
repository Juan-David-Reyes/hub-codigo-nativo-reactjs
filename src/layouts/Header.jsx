import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="menu">
          <picture>
            <Link to="/">
              <img loading="lazy" src="/logo.svg" width="120" height="38" alt="Código Nativo" />
            </Link>
          </picture>
          <div className="main-nav">
            <ul className="mobile-menu" onClick={() => setShowMobileMenu(!showMobileMenu)}>
              <li>
                <i className="fa-solid fa-bars"></i>
              </li>
            </ul>
            <ul className={`link-menu ${showMobileMenu ? 'active' : ''}`} role="menu">
              <li role="menuitem"><Link to="/">Inicio</Link></li>
              <li role="menuitem"><a href="https://codigonativo.com/nosotros/">Nosotros</a></li>
              <li role="group">
                <button 
                  type="button" 
                  aria-haspopup="true" 
                  aria-expanded={showSubmenu}
                  id="servicios"
                  onClick={() => setShowSubmenu(!showSubmenu)}
                >
                  Servicios<i className={`arrowService fas fa-chevron-${showSubmenu ? 'up' : 'down'}`}></i>
                </button>
              </li>
              <li role="menuitem"><Link to="/blog">Blog</Link></li>
              <li role="menuitem"><a href="https://codigonativo.com/contacto/">Contacto</a></li>
            </ul>
            <ul className="cta-menu">
              <li>
                <Link to="/login" className="cta">Ingresar</Link>
              </li>
            </ul>
          </div>
        </div>
        <ul className={`submenu ${showSubmenu ? 'active' : ''}`} role="menu">
          <li role="menuitem">
            <a href="https://codigonativo.com/agencia-de-diseno-web-colombia/">
              <picture>
                <img width="40" height="40" src="/servicios1.png" alt="" />
              </picture>
              <div className="serv">
                <h2>Diseño web <span className="badge destacado">DESTACADO</span></h2>
                <p>Sitios web rápidos, seguros y escalables</p>
              </div>
            </a>
          </li>
          <li role="menuitem">
            <a href="https://codigonativo.com/rediseno-web/">
              <picture>
                <img width="40" height="40" src="/servicios1.png" alt="" />
              </picture>
              <div className="serv">
                <h2>Re-diseño web</h2>
                <p>Webs profesionales que impulsan tu negocio</p>
              </div>
            </a>
          </li>
          <li role="menuitem">
            <a href="https://codigonativo.com/mantenimiento-web/">
              <picture>
                <img width="40" height="40" src="/servicios1.png" alt="" />
              </picture>
              <div className="serv">
                <h2>Mantenimiento web</h2>
                <p>Soporte continuo para tu página web</p>
              </div>
            </a>
          </li>
          <li role="menuitem">
            <a href="https://codigonativo.com/servicios/diseno-ux-ui">
              <picture>
                <img width="40" height="40" src="/servicios1.png" alt="" />
              </picture>
              <div className="serv">
                <h2>Diseño UX/UI <span className="badge nuevo">NUEVO</span></h2>
                <p>Experiencias intuitivas que convierten</p>
              </div>
            </a>
          </li>
          <li className="linkAllServices" role="menuitem">
            <Link to="/servicios">Ver todos los servicios</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
