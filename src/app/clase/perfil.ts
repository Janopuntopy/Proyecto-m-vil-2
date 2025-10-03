export class Perfil {
    nombre: string;
    correo: string;
    password: string;
    telefono: number;

    constructor(nombre: string, correo: string, password: string, telefono: number){
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
        this.telefono = telefono;
    }
}
