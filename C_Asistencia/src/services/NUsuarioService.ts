// Importando axios
import Usuarios from '@/interfaces/Usuarios'

import axios from 'axios'

export default class NUsuarioService {

    async store(usuario: Usuarios): Promise<string> {
        try {
            // Petición para insertar datos
            const response = await axios.post(
                'http://127.0.0.1:8000/api/usuario/store', usuario)

            let res = response.data

            if (res.code != 200) {
                throw new Error('Error al insertar')
            }
            
            const msg: string = res.data;
            
            return msg;
        } catch (error) {
            throw error;
        }
    }

    async obtenerTodos(): Promise<Usuarios[]> {
        try {
            
            const response = await axios.get(
                'http://127.0.0.1:8000/api/usuario/select')
            let res = response.data;

            if (res.code != 200) {
                throw new Error('Error al obtener los datos');
            }

            const list: Usuarios[] = res.data;
            
            return list;
                
        } catch (error) {
            throw error;
        }
    }
}