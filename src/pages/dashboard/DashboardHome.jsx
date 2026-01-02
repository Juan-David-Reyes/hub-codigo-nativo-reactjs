import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { projectsService } from '../../services/api';
import DashboardSidebar from '../../layouts/DashboardSidebar';
import '../../styles/Dashboard.css';

const DashboardHome = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    total: 0,
    totalPages: 0
  });

  useEffect(() => {
    loadProjects();
  }, [pagination.page]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsService.getAll(pagination.page, pagination.limit);
      
      if (response.success) {
        setProjects(response.projects);
        setPagination(prev => ({
          ...prev,
          ...response.pagination
        }));
      }
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar proyectos:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'active': { label: 'Activo', class: 'status-active' },
      'in_progress': { label: 'En Progreso', class: 'status-active' },
      'completed': { label: 'Completado', class: 'status-completed' },
      'paused': { label: 'Pausado', class: 'status-paused' },
      'cancelled': { label: 'Cancelado', class: 'status-expired' }
    };
    const statusInfo = statusMap[status] || statusMap['active'];
    return <span className={`status-badge ${statusInfo.class}`}>{statusInfo.label}</span>;
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar 
        currentProject={projects[0]} 
        projects={projects}
        userRole={user?.role || 'user'}
      />
      
      <main className="main-content">
        <div className="header-dashboard">
          <div className="titles">
            <h1>Dashboard</h1>
            <div className="breadcrumb">
              <a href="">Dashboard </a>
            </div>
          </div>
        </div>

        <section className="dashboard-home">
          <div className="container">
            <h3 className="title-section">Lista de proyectos</h3>
            <div className="container box">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  Cargando proyectos...
                </div>
              ) : error ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '2rem',
                  color: '#C62828'
                }}>
                  Error: {error}
                </div>
              ) : projects.length > 0 ? (
                <div className="table-wrapper">
                  <table className="table-grid projects-table">
                    <thead>
                      <tr>
                        <th>Proyecto</th>
                        <th>Fecha de inicio</th>
                        <th>Fecha de vencimiento</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((project) => (
                        <tr key={project.id}>
                          <td>
                            <div className="project-info">
                              <img 
                                className="project-icon" 
                                src={project.icon || '/favicon.png'} 
                                alt={project.name} 
                              />
                              <div>
                                <h4>{project.name}</h4>
                                {project.description && (
                                  <small style={{ color: '#666' }}>{project.description}</small>
                                )}
                              </div>
                            </div>
                          </td>
                          <td>{project.start_date ? formatDate(project.start_date) : 'N/A'}</td>
                          <td>{project.end_date ? formatDate(project.end_date) : 'N/A'}</td>
                          <td>{getStatusBadge(project.status)}</td>
                          <td>
                            <div className="v-menu">
                              <a className="v-menu-btn" href="javascript:void(0);">
                                <img width="24" height="24" src="/menu.svg" alt="Menú" />
                              </a>
                              <div className="dropdown">
                                <div className="dropdown-inner">
                                  <Link 
                                    to={`/dashboard/${project.slug}`} 
                                    className="opt white"
                                  >
                                    <img src="/view.svg" alt="" />Abrir proyecto
                                  </Link>
                                  <Link 
                                    to={`/dashboard/${project.slug}/configuracion`} 
                                    className="opt white"
                                  >
                                    <img src="/settings.svg" alt="" />Configuración
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ textAlign: 'center', padding: '2rem' }}>
                  {user?.role === 'admin' 
                    ? 'No hay proyectos registrados.' 
                    : 'Sin proyectos asignados.'}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardHome;
