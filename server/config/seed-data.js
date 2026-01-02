import bcrypt from 'bcryptjs';
import { run, get } from './database-sqlite.js';

export const seedDatabase = async () => {
  try {
    // Verificar si ya hay datos
    const existingUser = await get('SELECT id FROM users LIMIT 1');
    if (existingUser) {
      console.log('✅ Base de datos ya tiene datos iniciales');
      return;
    }

    console.log('🌱 Insertando datos iniciales...');

    // Crear usuario administrador
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminResult = await run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Administrador', 'admin@codigonativo.com', hashedPassword, 'admin']
    );

    // Crear usuario normal
    const userPassword = await bcrypt.hash('user123', 10);
    const userResult = await run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      ['Usuario Normal', 'user@codigonativo.com', userPassword, 'user']
    );

    // Crear clientes de ejemplo
    const client1 = await run(
      'INSERT INTO clients (name, email, phone, address) VALUES (?, ?, ?, ?)',
      ['Empresa ABC', 'contacto@empresaabc.com', '+34 666 777 888', 'Calle Principal 123']
    );

    const client2 = await run(
      'INSERT INTO clients (name, email, phone, address) VALUES (?, ?, ?, ?)',
      ['Tienda XYZ', 'info@tiendaxyz.com', '+34 999 888 777', 'Avenida Central 456']
    );

    // Crear sitios
    const site1 = await run(
      'INSERT INTO sites (client_id, name, url, description, status) VALUES (?, ?, ?, ?, ?)',
      [client1.id, 'Sitio Web Corporativo', 'https://empresaabc.com', 'Página web principal', 'active']
    );

    const site2 = await run(
      'INSERT INTO sites (client_id, name, url, description, status) VALUES (?, ?, ?, ?, ?)',
      [client2.id, 'Tienda Online', 'https://tiendaxyz.com', 'E-commerce', 'active']
    );

    // Crear servicios
    const service1 = await run(
      'INSERT INTO services (name, description, price) VALUES (?, ?, ?)',
      ['Desarrollo Web', 'Desarrollo de sitios web personalizados', 2500.00]
    );

    const service2 = await run(
      'INSERT INTO services (name, description, price) VALUES (?, ?, ?)',
      ['Mantenimiento Web', 'Mantenimiento mensual de sitios web', 300.00]
    );

    const service3 = await run(
      'INSERT INTO services (name, description, price) VALUES (?, ?, ?)',
      ['SEO', 'Optimización para motores de búsqueda', 500.00]
    );

    // Crear proyectos
    const project1 = await run(
      `INSERT INTO projects (client_id, site_id, service_id, name, slug, description, status, start_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        client1.id,
        site1.id,
        service1.id,
        'Rediseño Web Corporativo',
        'rediseno-web-corporativo',
        'Rediseño completo del sitio web corporativo',
        'in_progress',
        new Date().toISOString().split('T')[0]
      ]
    );

    const project2 = await run(
      `INSERT INTO projects (client_id, site_id, service_id, name, slug, description, status, start_date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        client2.id,
        site2.id,
        service2.id,
        'Mantenimiento Tienda Online',
        'mantenimiento-tienda-online',
        'Mantenimiento mensual de la tienda online',
        'active',
        new Date().toISOString().split('T')[0]
      ]
    );

    // Asignar proyectos a usuarios
    await run(
      'INSERT INTO user_projects (user_id, project_id) VALUES (?, ?)',
      [adminResult.id, project1.id]
    );

    await run(
      'INSERT INTO user_projects (user_id, project_id) VALUES (?, ?)',
      [userResult.id, project2.id]
    );

    // Crear registros de mantenimiento
    await run(
      `INSERT INTO maintenance_logs (project_id, user_id, description, type, status)
       VALUES (?, ?, ?, ?, ?)`,
      [
        project2.id,
        userResult.id,
        'Actualización de plugins y temas',
        'update',
        'completed'
      ]
    );

    console.log('✅ Datos iniciales insertados correctamente');
    console.log('\n📝 Credenciales de acceso:');
    console.log('   Admin: admin@codigonativo.com / admin123');
    console.log('   Usuario: user@codigonativo.com / user123\n');

  } catch (error) {
    console.error('❌ Error al insertar datos iniciales:', error);
    throw error;
  }
};
