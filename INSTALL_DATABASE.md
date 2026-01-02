# Instalación de la Base de Datos

## Paso 1: Crear la base de datos

Accede a MySQL y ejecuta el archivo SQL:

```bash
mysql -u root -p < server/database.sql
```

O desde el cliente MySQL:

```sql
source /ruta/a/tu/proyecto/server/database.sql
```

## Paso 2: Configurar las credenciales

Edita el archivo `.env` en la raíz del proyecto con tus credenciales de MySQL:

```env
DB_HOST=localhost
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=codigo_nativo
```

## Paso 3: Usuario por defecto

El script SQL crea automáticamente un usuario administrador:

- **Email**: admin@codigonativo.com
- **Contraseña**: admin123

⚠️ **IMPORTANTE**: Cambia esta contraseña en producción.

## Estructura de la base de datos

La base de datos incluye las siguientes tablas:

- `users` - Usuarios del sistema
- `clients` - Clientes
- `sites` - Proyectos/sitios web
- `client_users` - Relación usuarios-clientes
- `services` - Catálogo de servicios
- `client_services` - Servicios contratados por cliente
- `maintenance_logs` - Registro de mantenimiento

## Servicios precargados

El script incluye 5 servicios básicos:
- Mantenimiento web ($50)
- Backup ($20)
- Seguridad ($30)
- Optimización ($40)
- SEO ($60)

## Verificar instalación

```bash
mysql -u root -p codigo_nativo -e "SHOW TABLES;"
```

Deberías ver todas las tablas listadas arriba.
