import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="cont">
        <div className="footerInfo">
          <picture>
            <img width="140" height="44" src="/logo-light.svg" alt="Código Nativo - Logo" />
          </picture>
          <p>
            <strong>Código Nativo</strong> crea experiencias digitales inolvidables para tus usuarios, 
            con un enfoque en la usabilidad, el diseño intuitivo y la optimización del rendimiento.
          </p>
        </div>
        <nav role="navigation" aria-label="Navegación principal">
          <section aria-labelledby="services">
            <h4 id="services">Servicios</h4>
            <ul role="menu">
              <li role="menuitem"><a href="https://codigonativo.com/agencia-de-diseno-web-colombia/">Diseño web</a></li>
              <li role="menuitem"><a href="https://codigonativo.com/rediseno-web/">Rediseño web</a></li>
              <li role="menuitem"><a href="https://codigonativo.com/optimizacion-web/">Optimización de sitios</a></li>
              <li role="menuitem"><a href="https://codigonativo.com/agencia-de-auditoria-web/">Auditorías</a></li>
              <li role="menuitem"><a href="https://codigonativo.com/mantenimiento-web/">Mantenimiento web</a></li>
              <li role="menuitem"><a href="https://codigonativo.com/servicios/diseno-ux-ui">Diseño UX/UI</a></li>
            </ul>
          </section>
          <section aria-labelledby="navigation">
            <h4 id="navigation">Navegación</h4>
            <ul role="menu">
              <li role="menuitem"><Link to="/">Inicio</Link></li>
              <li role="menuitem"><a href="https://codigonativo.com/nosotros">Nosotros</a></li>
              <li role="menuitem"><Link to="/blog">Blog</Link></li>
              <li role="menuitem"><a href="https://codigonativo.com/contacto/">Contacto</a></li>
              <li role="menuitem"><Link to="/politicas-de-privacidad">Políticas de privacidad</Link></li>
            </ul>
          </section>
        </nav>
      </div>
      <div className="copyright">
        <p>&copy; {new Date().getFullYear()} Código Nativo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
