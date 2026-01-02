# Hub Código Nativo - React

Este proyecto es una reimplementación en React del sitio web de [Código Nativo](https://codigonativo.com), originalmente desarrollado en PHP.

## 🚀 Características

### Sitio Web Público
- **Home**: Página principal con diseño moderno y animaciones
- **Servicios**: Catálogo de servicios de diseño y desarrollo web
- **Login**: Sistema de autenticación para acceso al dashboard

### Dashboard Administrativo
- **Gestión de Proyectos**: Listado, creación y edición de proyectos web
- **Mantenimiento**: Registro de cambios y actualizaciones por proyecto
- **Usuarios**: Administración de usuarios y roles (admin/user)
- **Integración WordPress**: Conexión con sitios WordPress mediante API

## 🛠️ Tecnologías

### Frontend
- **React** 19.2.0
- **React Router DOM** - Enrutamiento
- **Vite** - Build tool y dev server
- **CSS Modules** - Estilos componentizados

### Backend
- **Node.js** + **Express** - Servidor API REST
- **MySQL2** - Base de datos
- **JWT** - Autenticación con tokens
- **bcryptjs** - Hash de contraseñas
- **CORS** - Configuración de seguridad

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/Juan-David-Reyes/hub-codigo-nativo-reactjs.git
cd hub-codigo-nativo-reactjs

# Instalar dependencias
npm install

# Configurar base de datos (ver SETUP.md)
mysql -u root -p < server/database.sql

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de MySQL

# Ejecutar frontend y backend
npm run dev:all
```

**Puertos por defecto**:
- Frontend: http://localhost:5174
- Backend API: http://localhost:5000

Para más detalles, consulta [SETUP.md](SETUP.md)

## 📁 Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
├── layouts/           # Layouts (Header, Footer, Sidebar)
│   ├── Header.jsx
│   ├── Footer.jsx
│   └── DashboardSidebar.jsx
├── pages/             # Páginas de la aplicación
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Servicios.jsx
│   └── dashboard/     # Páginas del dashboard
│       ├── DashboardHome.jsx
│       ├── NewProject.jsx
│       └── Mantenimiento.jsx
├── styles/            # Estilos CSS
├── App.jsx            # Componente principal con rutas
└── main.jsx          # Punto de entrada
```

## 🎨 Rutas

### Públicas
- `/` - Home
- `/login` - Inicio de sesión
- `/servicios` - Catálogo de servicios

### Dashboard (requiere autenticación)
- `/dashboard` - Vista principal del dashboard
- `/nuevo-proyecto` - Crear nuevo proyecto
- `/dashboard/:projectSlug/mantenimiento` - Mantenimiento de proyecto
x] Autenticación con JWT ✅
- [x] API REST para backend ✅
- [x] Conexión a base de datos MySQL ✅
- [x] Context API para estado global ✅
- [ ] Registro de mantenimiento con API
- [ ] Gestión de usuarios completa
- **Admin**: Acceso completo a todos los proyectos y usuarios
- **User**: Acceso limitado a proyectos asignados

## 📝 Próximas Implementaciones

- [ ] Autenticación con JWT
- [ ] API REST para backend
- [ ] Estados globales con Context API
- [ ] Notificaciones en tiempo real
- [ ] Tests unitarios
- [ ] Modo oscuro

## 👤 Autor

**Juan David Reyes**
- GitHub: [@Juan-David-Reyes](https://github.com/Juan-David-Reyes)
- Web: [codigonativo.com](https://codigonativo.com)

---

**Nota**: Este proyecto es una reimplementación del sitio web original en PHP.  
Repositorio original: [web-codigo-nativo-php](https://github.com/Juan-David-Reyes/web-codigo-nativo-php)
# hub-codigo-nativo-reactjs
