const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Función auxiliar para manejar respuestas
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Error en la petición');
  }
  
  return data;
};

// Función auxiliar para obtener headers con token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Servicios de autenticación
export const authService = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  },

  logout: async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: getHeaders()
    });
    localStorage.removeItem('token');
    return handleResponse(response);
  },

  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'GET',
      headers: getHeaders()
    });
    return handleResponse(response);
  }
};

// Servicios de proyectos
export const projectsService = {
  getAll: async (page = 1, limit = 15) => {
    const response = await fetch(
      `${API_URL}/projects?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: getHeaders()
      }
    );
    return handleResponse(response);
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'GET',
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  create: async (projectData) => {
    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(projectData)
    });
    return handleResponse(response);
  },

  update: async (id, projectData) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(projectData)
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return handleResponse(response);
  }
};

// Verificar salud de la API
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return handleResponse(response);
  } catch (error) {
    console.error('API no disponible:', error);
    return { success: false, message: 'API no disponible' };
  }
};
