export class Alumno {
    legajo:number;
    apellido:string;
    nombre:string;
    public constructor(apellido:string,nombre:string,legajo:number)
    {
        this.apellido=apellido;
        this.legajo=legajo;
        this.nombre=nombre;
    }
}
