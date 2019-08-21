export class Profesor {
    legajo:number;
    apellido:string;
    materia:string;
    public constructor(apellido:string,materia:string,legajo:number)
    {
        this.apellido=apellido;
        this.legajo=legajo;
        this.materia=materia;
    }
}
