import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DashboardSidebar from '../../layouts/DashboardSidebar';
import '../../styles/Dashboard.css';

const Mantenimiento = () => {
  const { projectSlug } = useParams();
  const [maintenance, setMaintenance] = useState([
    {
      id: 1,
      version: 'v1.0',
      title: 'Goals & achievements',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      date: '2024-09-30',
      time: '11:42 a.m'
    }
  ]);

  const [newEntry, setNewEntry] = useState({
    version: '',
    title: '',
    description: ''
  });

  const handleChange = (e) => {
    setNewEntry({
      ...newEntry,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();
    const newMaintenance = {
      id: maintenance.length + 1,
      ...newEntry,
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    };
    setMaintenance([newMaintenance, ...maintenance]);
    setNewEntry({ version: '', title: '', description: '' });
  };

  const currentProject = {
    name: 'Proyecto Demo',
    slug: projectSlug,
    cms: 'WordPress',
    icon: '/favicon.png'
  };

  return (
    <div className="dashboard-layout">
      <DashboardSidebar 
        currentProject={currentProject} 
        userRole="admin"
      />
      
      <main className="main-content">
        <div className="header-dashboard">
          <div className="titles">
            <h1>Mantenimiento</h1>
            <div className="breadcrumb">
              <a href="/dashboard">Dashboard </a>
              <span>&gt;</span>
              <a> Mantenimiento</a>
            </div>
          </div>
        </div>

        <section className="dashboard-maintenance">
          <div className="container">
            <h3 className="title-section">Registro de mantenimiento</h3>
            
            <form className="edit-fields" onSubmit={handleSubmit}>
              <input
                type="text"
                name="version"
                value={newEntry.version}
                onChange={handleChange}
                placeholder="Versión Ej. V.1.0"
                required
              />
              <input
                type="text"
                name="title"
                value={newEntry.title}
                onChange={handleChange}
                placeholder="Título del cambio"
                required
              />
              <textarea
                name="description"
                value={newEntry.description}
                onChange={handleChange}
                placeholder="Descripción del cambio"
                required
              />
              <button type="submit" className="cta-primary">Agregar</button>
            </form>

            <ul className="maintenance-list">
              {maintenance.map((entry) => (
                <li key={entry.id}>
                  <div className="date">
                    <span className="numb">
                      {new Date(entry.date).getDate()}
                    </span>
                    <span className="month">
                      {new Date(entry.date).toLocaleDateString('es-ES', { month: 'short' })}
                    </span>
                  </div>
                  <div className="container box">
                    <h4 className="version">
                      <span><b>{entry.version}</b> {entry.title}</span>
                      <span className="hour">{entry.time}</span>
                    </h4>
                    <p>{entry.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Mantenimiento;
