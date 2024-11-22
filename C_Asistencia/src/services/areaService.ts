import axios from 'axios';

//  URL base de Axios
axios.defaults.baseURL = 'http://127.0.0.1:8000'; 

export interface Area {
    id_area?: number;
    nombre_area: string;
}

// Función para obtener todas las áreas
export const fetchAreas = async (): Promise<Area[]> => {
    try {
        const response = await axios.get('/api/areas');
        return response.data;
    } catch (error: unknown) {
        handleError(error); 
        throw new Error('Error al cargar las áreas'); 
    }
};

// Función para agregar una nueva área
export const addArea = async (newArea: Area): Promise<Area> => {
    try {
        const response = await axios.post('/api/areas', newArea);
        return response.data;
    } catch (error: unknown) {
        handleError(error);
        throw new Error('Error al agregar el área');
    }
};

// Función para actualizar un área existente
export const updateArea = async (id_area: number, updatedArea: Area): Promise<Area> => {
    try {
        const response = await axios.put(`/api/areas/${id_area}`, updatedArea);
        return response.data;
    } catch (error: unknown) {
        handleError(error);
        throw new Error('Error al actualizar el área');
    }
};

// Función para eliminar un área
export const deleteArea = async (id_area: number): Promise<void> => {
    try {
        await axios.delete(`/api/areas/${id_area}`);
    } catch (error: unknown) {
        handleError(error);
        throw new Error('Error al eliminar el área');
    }
};

// Función para manejar errores
const handleError = (error: unknown) => {
    if (isErrorWithMessage(error)) {
        console.error(error.message); 
    } else {
        console.error('Un error desconocido ocurrió:', error); 
    }
};

const isErrorWithMessage = (error: unknown): error is Error => {
    return typeof error === 'object' && error !== null && 'message' in error;
};