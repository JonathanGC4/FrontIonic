export default interface Usuarios{
    id: number;
    nombre: string;
    contrasena: string;
    correo: string;
    rol: number;
    fecha: string | number | undefined;
    created_at: string;
    updated_at: string;
}