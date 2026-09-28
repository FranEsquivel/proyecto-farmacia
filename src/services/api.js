// URL base de tu backend de Flask
const API_URL = 'http://localhost:5000/api';

// --- MEDICAMENTOS ---
export const getMedicamentos = async () => {
    try {
        const response = await fetch(`${API_URL}/medicamentos`);
        if (!response.ok) throw new Error('Error al obtener medicamentos');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// --- CATEGORÍAS ---
export const getCategorias = async () => {
    try {
        const response = await fetch(`${API_URL}/categorias`);
        if (!response.ok) throw new Error('Error al obtener categorías');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};

// --- EMPLEADOS ---
export const getEmpleados = async () => {
    try {
        const response = await fetch(`${API_URL}/empleados`);
        if (!response.ok) throw new Error('Error al obtener empleados');
        return await response.json();
    } catch (error) {
        console.error(error);
        return [];
    }
};