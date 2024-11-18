// Importando axios
import User from '@/interfaces/User'

import axios from 'axios'

export default class UsuarioService {

    async store(usuarios: User): Promise<string> {
        try {
            // Petición para insertar datos
            const response = await axios.post(
                'http://127.0.0.1:8000/api/usuarios/store', usuarios)

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

    async obtenerTodos(): Promise<User[]> {
        try {
            
            const response = await axios.get(
                'http://127.0.0.1:8000/api/usuarios/select')
            let res = response.data;

            if (res.code != 200) {
                throw new Error('Error al obtener los datos');
            }

            const list: User[] = res.data;
            
            return list;
                
        } catch (error) {
            throw error;
        }
    }
}