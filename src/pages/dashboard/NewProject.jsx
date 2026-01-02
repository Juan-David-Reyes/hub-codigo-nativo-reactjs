import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { projectsService } from '../../services/api';
import DashboardSidebar from '../../layouts/DashboardSidebar';
import '../../styles/Dashboard.css';

const NewProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    siteName: '',
    siteUrl: '',
    siteCms: '',
    wpToken: '',
    siteStatus: 'active',
    services: [],
    serviceStartDate: '',
    serviceEndDate: ''
  });

  const [showWpFields, setShowWpFields] = useState(false);
  const [apiConnected, setApiConnected] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      const serviceId = parseInt(value);
      setFormData(prev => ({
        ...prev,
        services: checked 
          ? [...prev.services, serviceId]
          : prev.services.filter(id => id !== serviceId)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      if (name === 'siteCms') {
        setShowWpFields(value === 'wordpress');
      }
    }
  };

  const handleGenerateToken = () => {
    // Lógica para generar token
    const token = 'token_' + Math.random().toString(36).substr(2, 9);
    setFormData(prev => ({ ...prev, wpToken: token }));
  };

  const handleValidateToken = () => {
    // Lógica para validar token
    if (formData.wpToken) {
      setApiConnected(true);
      alert('Token validado correctamente');
    } else {
      alert('Debes generar un token primero');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (showWpFields && !apiConnected) {
      alert('Debes validar el token de WordPress antes de crear el proyecto.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await projectsService.create(formData);
      
      if (response.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Error al crear el proyecto');
      console.error('Error al crear proyecto:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar 
        userRole={user?.role || 'admin'} 
      />
      
      <main className="main-content">
        <div className="header-dashboard">
          <div className="titles">
            <h1>Agregar nuevo proyecto</h1>
            <div className="breadcrumb">
              <a href="/dashboard">Dashboard </a> <span>&gt;</span> <a> Nuevo proyecto</a>
            </div>
          </div>
        </div>

        <section className="dashboard-maintenance">
          {error && (
            <div style={{
              background: '#FFEBEE',
              color: '#C62828',
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1rem'
            }}>
              Error: {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h3 className="title-section">Proyecto</h3>
            <div className="container box c-proyectos">
              <div className="form-group">
                <label htmlFor="siteName">Nombre del proyecto</label>
                <input
                  type="text"
                  id="siteName"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleChange}
                  required
                  placeholder="Tienda Online XYZ"
                />
              </div>

              <div className="form-group">
                <label htmlFor="siteUrl">URL del sitio</label>
                <input
                  type="url"
                  id="siteUrl"
                  name="siteUrl"
                  value={formData.siteUrl}
                  onChange={handleChange}
                  required
                  placeholder="https://www.ejemplo.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="siteCms">CMS</label>
                <select
                  id="siteCms"
                  name="siteCms"
                  value={formData.siteCms}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="wordpress">WordPress</option>
                  <option value="custom">Personalizado</option>
                  <option value="shopify">Shopify</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              {showWpFields && (
                <div id="wordpress-fields">
                  <div className="form-group">
                    <label htmlFor="wpToken">
                      Token API{' '}
                      <span className={`state-api ${apiConnected ? 'green' : 'orange'}`}>
                        {apiConnected ? 'Conexión exitosa' : 'Desconectado'}
                      </span>
                    </label>
                    <input
                      type="text"
                      id="wpToken"
                      name="wpToken"
                      value={formData.wpToken}
                      onChange={handleChange}
                      placeholder="Token para API WordPress"
                    />
                    <div className="caption">
                      <p>
                        <b>Instrucciones:</b> Instala el plugin Código Nativo en tu WordPress. 
                        Genera un token aquí y cópialo a la configuración del plugin en WordPress. 
                        Luego, ingresa el token para cargar los plugins.
                      </p>
                    </div>
                    <div className="buttons-group">
                      <button 
                        className="btn-primary" 
                        type="button" 
                        onClick={handleGenerateToken}
                      >
                        Generar Token
                      </button>
                      <button 
                        className="btn-secondary" 
                        type="button" 
                        onClick={handleValidateToken}
                      >
                        Validar
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="siteStatus">Estado del sitio</label>
                <select
                  id="siteStatus"
                  name="siteStatus"
                  value={formData.siteStatus}
                  onChange={handleChange}
                >
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
                <div className="caption">
                  <p>
                    <b>Activo:</b> El sitio/proyecto está operativo, visible y gestionado por tu sistema.
                  </p>
                  <p>
                    <b>Inactivo:</b> El sitio/proyecto está pausado, dado de baja o ya no se gestiona activamente.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="title-section">Servicios</h3>
            <div className="container box c-servicios">
              <div className="form-group">
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="service_1" 
                    name="services" 
                    value="1"
                    onChange={handleChange}
                  />
                  <label htmlFor="service_1">Mantenimiento web</label>
                </div>
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="service_2" 
                    name="services" 
                    value="2" 
                    disabled 
                  />
                  <label htmlFor="service_2">Backup</label>
                </div>
                <div className="checkbox-group">
                  <input 
                    type="checkbox" 
                    id="service_3" 
                    name="services" 
                    value="3" 
                    disabled 
                  />
                  <label htmlFor="service_3">Seguridad</label>
                </div>
              </div>

              <div className="grid2">
                <div className="form-group">
                  <label htmlFor="serviceStartDate">Fecha de inicio</label>
                  <input
                    type="date"
                    id="serviceStartDate"
                    name="serviceStartDate"
                    value={formData.serviceStartDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="serviceEndDate">Fecha de vencimiento</label>
                  <input
                    type="date"
                    id="serviceEndDate"
                    name="serviceEndDate"
                    value={formData.serviceEndDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
              >
                {loading ? 'Creando...' : 'Crear Proyecto'}
              </button>
              <button 
                type="button" 
                className="btn-secondary" 
                onClick={() => navigate('/dashboard')}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
};

export default NewProject;
