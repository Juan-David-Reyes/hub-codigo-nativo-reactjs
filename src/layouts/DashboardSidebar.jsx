import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/DashboardSidebar.css';
import darkLogo from '../assets/dark-logo.svg';

const DashboardSidebar = ({ currentProject, projects = [], userRole = 'user' }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const location = useLocation();

  const getUserInitials = (name) => {
    if (!name) return 'UN';
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').toUpperCase().substring(0, 2);
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="sidebar-menu">
      <div className="cont-up">
        <div className="pre-header">
          <img width="100" height="32" src={darkLogo} alt="Código Nativo" />
          <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="letters">{getUserInitials('Usuario')}</div>
          </div>
          <div className={`dropdown ${showDropdown ? 'open' : ''}`}>
            <div className="dropdown-inner">
              <h3 className="name-profile">Usuario</h3>
              <div className="mail">usuario@ejemplo.com</div>
              <ul className="list-dropdown">
                <li><a className="opt white" href=""><img src="/profile.svg" alt="" />Perfil</a></li>
                <li><Link className="opt white" to="/logout"><img src="/signout.svg" alt="" />Cerrar sesión</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="section-dashboard">
          <div className="section-name">
            <h3>Dashboard</h3>
            <div>Vista general y ayuda de tus proyectos</div>
          </div>
          <ul>
            <li>
              <Link className={`opt ${isActive('/dashboard')}`} to="/dashboard">
                <img width="24" height="24" src="/home.svg" alt="" />
                Home
              </Link>
            </li>
            {userRole === 'admin' && (
              <li>
                <Link className={`opt ${isActive('/dashboard/usuarios')}`} to="/dashboard/usuarios">
                  <img width="24" height="24" src="/users.svg" alt="" />
                  Usuarios
                </Link>
              </li>
            )}
            <li>
              <a className="opt" href="">
                <img width="24" height="24" src="/info.svg" alt="" />
                Help center
              </a>
            </li>
          </ul>
        </div>

        {currentProject && (
          <div className="section-project">
            <div className="section-name">
              <h3>Proyecto</h3>
              <div>Configuración del proyecto seleccionado</div>
            </div>
            <ul>
              <li>
                <Link className={`opt ${isActive(`/dashboard/${currentProject.slug}/mantenimiento`)}`} 
                      to={`/dashboard/${currentProject.slug}/mantenimiento`}>
                  <img width="24" height="24" src="/maintenance.svg" alt="" />
                  Mantenimiento
                </Link>
              </li>
              <li>
                <Link className={`opt ${isActive(`/dashboard/${currentProject.slug}/configuracion`)}`} 
                      to={`/dashboard/${currentProject.slug}/configuracion`}>
                  <img width="24" height="24" src="/settings.svg" alt="" />
                  Configuración
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div className="cont-down">
        {userRole === 'admin' && (
          <div className="projects-list">
            <div className="section-name">
              <h3>Proyectos</h3>
            </div>
            <ul>
              <li>
                <Link to="/nuevo-proyecto" className="opt white project-info add">
                  <picture>
                    <img width="32" height="32" src="/add.svg" alt="Nuevo proyecto" />
                  </picture>
                  <div className="project-name">
                    <h3>Nuevo proyecto</h3>
                  </div>
                </Link>
              </li>
              {projects.map((project) => (
                <li key={project.id}>
                  <Link to={`/dashboard/project/${project.id}`} className="opt white project-info">
                    <picture>
                      <img width="32" height="32" src={project.icon || '/favicon.png'} alt={project.name} />
                    </picture>
                    <div className="project-name">
                      <h3>{project.name}</h3>
                      <div className="category">{project.cms}</div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="project-info toggle-projects" onClick={() => setShowProjects(!showProjects)}>
          <picture>
            <img width="32" height="32" src={currentProject?.icon || '/favicon.png'} alt="" />
          </picture>
          <div className="project-name">
            <h3>{currentProject?.name || 'Seleccionar proyecto'}</h3>
            <div className="category">{currentProject?.cms || 'N/A'}</div>
          </div>
          <img src="/arrow.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
