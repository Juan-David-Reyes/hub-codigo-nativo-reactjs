# Guía de Configuración - Backend y Base de Datos

## 🗄️ Base de Datos MySQL

### 1. Crear la base de datos

```bash
# Desde la terminal
mysql -u root -p < server/database.sql

# O desde MySQL CLI
mysql -u root -p
source server/database.sql;
```

### 2. Configurar credenciales

Edita el archivo `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=codigo_nativo

PORT=5000
NODE_ENV=development

JWT_SECRET=tu_clave_secreta_cambiar_en_produccion
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5174
```

### 3. Credenciales por defecto

**Usuario Admin**:
- Email: `admin@codigonativo.com`
- Password: `admin123`

⚠️ Cambia estas credenciales en producción.

## 🚀 Ejecutar el Proyecto

### Opción 1: Frontend y Backend por separado

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run server
```

### Opción 2: Todo junto (recomendado)

```bash
npm run dev:all
```

Esto ejecutará ambos servidores simultáneamente:
- Frontend: http://localhost:5174
- Backend API: http://localhost:5000

## 📡 Endpoints de la API

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere token)

### Proyectos
- `GET /api/projects` - Listar proyectos (requiere auth)
- `GET /api/projects/:id` - Obtener proyecto (requiere auth)
- `POST /api/projects` - Crear proyecto (requiere admin)
- `PUT /api/projects/:id` - Actualizar proyecto (requiere admin)
- `DELETE /api/projects/:id` - Eliminar proyecto (requiere admin)

### Health Check
- `GET /api/health` - Verificar que la API funciona

## 🔐 Autenticación

La API usa JWT (JSON Web Tokens). Para hacer peticiones autenticadas:

```javascript
fetch('http://localhost:5000/api/projects', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN_HERE'
  }
})
```

El token se obtiene al hacer login y se guarda en `localStorage`.

## 🧪 Probar la API

### Con curl:

```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@codigonativo.com","password":"admin123"}'

# Health check
curl http://localhost:5000/api/health
```

### Con Postman o Thunder Client:

1. Importa la colección de endpoints
2. Haz login para obtener el token
3. Usa el token en el header `Authorization: Bearer TOKEN`

## 📊 Estructura de Datos

### Usuario (User)
```json
{
  "id": 1,
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "role": "admin",
  "status": "active"
}
```

### Proyecto (Project)
```json
{
  "id": 1,
  "project_name": "Mi Sitio Web",
  "project_url": "https://ejemplo.com",
  "cms": "WordPress",
  "site_status": "active",
  "service_status": "activo",
  "start_date": "2024-01-15",
  "due_date": "2025-01-15"
}
```

## 🐛 Solución de Problemas

### Error: "ECONNREFUSED" al conectar a MySQL

1. Verifica que MySQL esté corriendo:
```bash
mysql.server start  # macOS
sudo service mysql start  # Linux
```

2. Verifica las credenciales en `.env`

### Error: "Token inválido"

1. Verifica que el token esté en localStorage
2. Verifica que `JWT_SECRET` sea el mismo en frontend y backend
3. El token puede haber expirado (duración: 7 días)

### Error: "Cannot GET /api/..."

1. Verifica que el servidor backend esté corriendo
2. Verifica la URL de la API en `.env.local`
3. Revisa los logs del servidor

## 📱 Variables de Entorno

### Frontend (`.env.local`)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (`.env`)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=codigo_nativo
PORT=5000
JWT_SECRET=tu_clave_secreta
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5174
```

## 🔄 Scripts Disponibles

```json
{
  "dev": "vite",                    // Solo frontend
  "server": "node server/server.js", // Solo backend
  "dev:all": "concurrently ...",    // Frontend + Backend
  "build": "vite build",            // Compilar producción
  "preview": "vite preview"         // Preview build
}
```

## 📝 Notas Importantes

1. **No commitees** el archivo `.env` a Git (ya está en `.gitignore`)
2. **Cambia** las credenciales por defecto en producción
3. **Genera** un `JWT_SECRET` fuerte para producción
4. **Habilita HTTPS** en producción
5. **Configura CORS** apropiadamente para producción

## 🔗 Recursos

- [Express.js](https://expressjs.com/)
- [MySQL2](https://github.com/sidorares/node-mysql2)
- [JWT](https://jwt.io/)
- [React Router](https://reactrouter.com/)
