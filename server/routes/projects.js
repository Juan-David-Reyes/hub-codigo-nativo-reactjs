import express from 'express';
import * as projectsController from '../controllers/projectsController.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

// Rutas para todos los usuarios
router.get('/', projectsController.getProjects);
router.get('/:id', projectsController.getProjectById);

// Rutas solo para administradores
router.post('/', isAdmin, projectsController.createProject);
router.put('/:id', isAdmin, projectsController.updateProject);
router.delete('/:id', isAdmin, projectsController.deleteProject);

export default router;
