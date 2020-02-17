 export class HistoriaClinica {

        DiaTurno:any;
        descripcion:any;
        profesional:any;
        uidPaciente:any;
      
     
      
    public constructor(diaTurno:any,descripcion:any,profesional:any,uidPaciente:any)
    {
        this.DiaTurno=diaTurno;
        this.descripcion=descripcion;
        this.profesional=profesional;
        this.uidPaciente=uidPaciente;
    }
}