import { query, get, run } from '../config/database-sqlite.js';

// Obtener todos los proyectos
export const getProjects = async (req, res) => {
  try {
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    let projects;

    if (isAdmin) {
      // Admin ve todos los proyectos
      projects = await query(`
        SELECT 
          p.*,
          c.name as client_name,
          s.name as site_name,
          sv.name as service_name
        FROM projects p
        LEFT JOIN clients c ON p.client_id = c.id
        LEFT JOIN sites s ON p.site_id = s.id
        LEFT JOIN services sv ON p.service_id = sv.id
        ORDER BY p.created_at DESC
      `);
    } else {
      // Usuario ve solo sus proyectos asignados
      projects = await query(`
        SELECT 
          p.*,
          c.name as client_name,
          s.name as site_name,
          sv.name as service_name
        FROM projects p
        INNER JOIN user_projects up ON p.id = up.project_id
        LEFT JOIN clients c ON p.client_id = c.id
        LEFT JOIN sites s ON p.site_id = s.id
        LEFT JOIN services sv ON p.service_id = sv.id
        WHERE up.user_id = ?
        ORDER BY p.created_at DESC
      `, [userId]);
    }

    res.json({
      success: true,
      projects
    });

  } catch (error) {
    console.error('Error al obtener proyectos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener proyectos'
    });
  }
};

// Obtener proyecto por ID o slug
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    let project;

    // Determinar si es ID numérico o slug
    const isNumeric = !isNaN(id);
    const field = isNumeric ? 'p.id' : 'p.slug';

    if (isAdmin) {
      project = await get(`
        SELECT 
          p.*,
          c.name as client_name,
          c.email as client_email,
          s.name as site_name,
          s.url as site_url,
          sv.name as service_name,
          sv.description as service_description
        FROM projects p
        LEFT JOIN clients c ON p.client_id = c.id
        LEFT JOIN sites s ON p.site_id = s.id
        LEFT JOIN services sv ON p.service_id = sv.id
        WHERE ${field} = ?
      `, [id]);
    } else {
      project = await get(`
        SELECT 
          p.*,
          c.name as client_name,
          s.name as site_name,
          s.url as site_url,
          sv.name as service_name
        FROM projects p
        INNER JOIN user_projects up ON p.id = up.project_id
        LEFT JOIN clients c ON p.client_id = c.id
        LEFT JOIN sites s ON p.site_id = s.id
        LEFT JOIN services sv ON p.service_id = sv.id
        WHERE ${field} = ? AND up.user_id = ?
      `, [id, userId]);
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    res.json({
      success: true,
      project
    });

  } catch (error) {
    console.error('Error al obtener proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener proyecto'
    });
  }
};

// Crear nuevo proyecto (solo admin)
export const createProject = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para crear proyectos'
      });
    }

    const {
      client_id,
      site_id,
      service_id,
      name,
      slug,
      description,
      status = 'in_progress',
      start_date
    } = req.body;

    // Validar campos requeridos
    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: 'El nombre y slug son requeridos'
      });
    }

    // Verificar que el slug no exista
    const existingProject = await get('SELECT id FROM projects WHERE slug = ?', [slug]);
    if (existingProject) {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un proyecto con ese slug'
      });
    }

    const result = await run(`
      INSERT INTO projects (
        client_id, site_id, service_id, name, slug, description, status, start_date, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `, [client_id, site_id, service_id, name, slug, description, status, start_date]);

    res.status(201).json({
      success: true,
      message: 'Proyecto creado exitosamente',
      projectId: result.id
    });

  } catch (error) {
    console.error('Error al crear proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear proyecto'
    });
  }
};

// Actualizar proyecto (solo admin)
export const updateProject = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para actualizar proyectos'
      });
    }

    const { id } = req.params;
    const {
      client_id,
      site_id,
      service_id,
      name,
      slug,
      description,
      status,
      start_date,
      end_date
    } = req.body;

    const result = await run(`
      UPDATE projects 
      SET 
        client_id = COALESCE(?, client_id),
        site_id = COALESCE(?, site_id),
        service_id = COALESCE(?, service_id),
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        description = COALESCE(?, description),
        status = COALESCE(?, status),
        start_date = COALESCE(?, start_date),
        end_date = COALESCE(?, end_date),
        updated_at = datetime('now')
      WHERE id = ?
    `, [client_id, site_id, service_id, name, slug, description, status, start_date, end_date, id]);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Proyecto actualizado exitosamente'
    });

  } catch (error) {
    console.error('Error al actualizar proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar proyecto'
    });
  }
};

// Eliminar proyecto (solo admin)
export const deleteProject = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'No tienes permisos para eliminar proyectos'
      });
    }

    const { id } = req.params;

    const result = await run('DELETE FROM projects WHERE id = ?', [id]);

    if (result.changes === 0) {
      return res.status(404).json({
        success: false,
        message: 'Proyecto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Proyecto eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar proyecto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar proyecto'
    });
  }
};

// Obtener logs de mantenimiento de un proyecto
export const getMaintenanceLogs = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    // Verificar que el usuario tenga acceso al proyecto
    if (!isAdmin) {
      const access = await get(`
        SELECT up.user_id 
        FROM user_projects up
        INNER JOIN projects p ON up.project_id = p.id
        WHERE p.id = ? AND up.user_id = ?
      `, [projectId, userId]);

      if (!access) {
        return res.status(403).json({
          success: false,
          message: 'No tienes acceso a este proyecto'
        });
      }
    }

    const logs = await query(`
      SELECT 
        ml.*,
        u.name as user_name
      FROM maintenance_logs ml
      LEFT JOIN users u ON ml.user_id = u.id
      WHERE ml.project_id = ?
      ORDER BY ml.date DESC
    `, [projectId]);

    res.json({
      success: true,
      logs
    });

  } catch (error) {
    console.error('Error al obtener logs:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener logs de mantenimiento'
    });
  }
};

// Crear log de mantenimiento
export const createMaintenanceLog = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { description, type, status = 'completed' } = req.body;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'admin';

    if (!description) {
      return res.status(400).json({
        success: false,
        message: 'La descripción es requerida'
      });
    }

    // Verificar acceso al proyecto
    if (!isAdmin) {
      const access = await get(`
        SELECT up.user_id 
        FROM user_projects up
        WHERE up.project_id = ? AND up.user_id = ?
      `, [projectId, userId]);

      if (!access) {
        return res.status(403).json({
          success: false,
          message: 'No tienes acceso a este proyecto'
        });
      }
    }

    const result = await run(`
      INSERT INTO maintenance_logs (project_id, user_id, description, type, status, date)
      VALUES (?, ?, ?, ?, ?, datetime('now'))
    `, [projectId, userId, description, type, status]);

    res.status(201).json({
      success: true,
      message: 'Log de mantenimiento creado exitosamente',
      logId: result.id
    });

  } catch (error) {
    console.error('Error al crear log:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear log de mantenimiento'
    });
  }
};
