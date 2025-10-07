export class Perfil {
    nombre: string;
    correo: string;
    password: string;
    telefono: string;

    constructor(nombre: string, correo: string, password: string, telefono: string){
        this.nombre = nombre;
        this.correo = correo;
        this.password = password;
        this.telefono = telefono;
    }
}
