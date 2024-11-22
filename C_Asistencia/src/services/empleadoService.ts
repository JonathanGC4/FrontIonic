import axios from 'axios';

// URL base de Axios
axios.defaults.baseURL = 'http://127.0.0.1:8000'; 

export interface Empleado {
    id_empleado?: number; 
    nombre: string;
    apellido: string;
    cargo: string;
    id_area: number;
    puesto: string;
    correo: string;
    telefono: string;
}

// Función para obtener todos los empleados
export const fetchEmpleadosFromAPI = async (): Promise<Empleado[]> => {
    try {
        const response = await axios.get('/api/empleados');
        return response.data;
    } catch (error: unknown) {
        handleError(error);
        throw new Error('Error al cargar los empleados');
    }
};

// Función para agregar un nuevo empleado
export const addEmpleado = async (newEmpleado: Empleado): Promise<Empleado> => {
    try {
        const response = await axios.post('/api/empleados', newEmpleado);
        return response.data;
    } catch (error: unknown) {
        handleError(error);
        throw new Error('Error al agregar el empleado');
    }
};

// Función para actualizar un empleado existente
export const updateEmpleado = async (id_empleado: number, updatedEmpleado: Empleado): Promise<Empleado> => {
    try {
        const response = await axios.put(`/api/empleados/${id_empleado}`, updatedEmpleado);
        return response.data;
    } catch (error: unknown) {
        handleError(error);
        throw new Error('Error al actualizar el empleado');
    }
};

// Función para eliminar un empleado
export const deleteEmpleado = async (id_empleado: number): Promise<void> => {
    try {
        await axios.delete(`/api/empleados/${id_empleado}`);
    } catch (error: unknown) {
        handleError(error);
        throw new Error('Error al eliminar el empleado');
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