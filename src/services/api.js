// URL base de backend de Flask
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

export const crearMedicamento = async (medicamento) => {
    try {
        const response = await fetch(`${API_URL}/medicamentos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicamento)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error al crear medicamento');
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const actualizarMedicamento = async (id, medicamento) => {
    try {
        const response = await fetch(`${API_URL}/medicamentos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(medicamento)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || 'Error al actualizar medicamento'
            );
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const eliminarMedicamento = async (id) => {
    try {
        const response = await fetch(`${API_URL}/medicamentos/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || 'Error al eliminar medicamento'
            );
        }

        return data;
    } catch (error) {
        console.error(error);
        throw error;
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