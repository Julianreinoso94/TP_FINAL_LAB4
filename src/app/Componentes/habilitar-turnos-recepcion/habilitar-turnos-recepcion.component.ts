import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import{TurnosService} from 'src/app/services/turnos.service'

class Turnos {
  DiaTurno: String;
  cliente: String;
  consultorio: String;
  especialidad: String;
  estado: String;
  horaTurno: String;
  numTurno:String;
  profesional:String;
  listadoespecialistaspordia: any;
  turno;
  id;


  constructor(id:String,DiaTurno:String,cliente:String,consultorio:String,especialidad:String,estado:String,horaTurno:String,numTurno:String,profesional:String )
  {
    this.id=id;
    this.DiaTurno=DiaTurno;
    this.cliente=cliente;
    this.consultorio=consultorio;
    this.especialidad=especialidad;
    this.estado=estado;
    this.horaTurno=horaTurno;
    this.numTurno=numTurno;
    this.profesional=profesional;

  }
}



@Component({
  selector: 'app-habilitar-turnos-recepcion',
  templateUrl: './habilitar-turnos-recepcion.component.html',
  styleUrls: ['./habilitar-turnos-recepcion.component.css']
})
export class HabilitarTurnosRecepcionComponent implements OnInit {
  turnos : any;
  turno;

  ageValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  codigoTurno:any;

  listadoTurnosHabilitar: Array <Turnos>;
  constructor(public firebaseService: TurnosService,
    // public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){

    this.listadoTurnosHabilitar = [];
    this.firebaseService.TraerTurnosRecepcion().subscribe(data => {
      
      data.forEach(element => {
           
        this.turno = new Turnos(element.payload.doc.id,element.payload.doc.data()['DiaTurno'],element.payload.doc.data()['cliente'],element.payload.doc.data()['consultorio'],element.payload.doc.data()['especialidad'],element.payload.doc.data()['estado'],element.payload.doc.data()['horaTurno'],element.payload.doc.data()['numTurno'],element.payload.doc.data()['profesional']);
       this.listadoTurnosHabilitar.push(this.turno);
  });

      // this.turnos = data.map(e => {
      //   return {
      //     id: e.payload.doc.id,
      //     isEdit: false,
      //     codigo: e.payload.doc.data()['codigo'],
      //     estado: e.payload.doc.data()['estado'],
      //     profesional: e.payload.doc.data()['profesional'],
      //     consultorio: e.payload.doc.data()['consultorio'],
      //     cliente: e.payload.doc.data()['cliente'],
      //     especialidad: e.payload.doc.data()['especialidad'],
      //     horaTurno: e.payload.doc.data()['horaTurno'],
      //     DiaTurno: e.payload.doc.data()['DiaTurno'],
        
      //   };
      // })
      console.log(this.turnos);
    });

    // this.listadoTurnosHabilitar = [];
    // console.log(this.turnos);
             
    
    //     this.turnos.forEach(element => {
           
    //          this.turno = new Turnos(element.DiaTurno,element.cliente,element.consultorio,element.especialidad,element.estado,element.horaTurno,element.numTurno,element.profesional);
    //         this.listadoTurnosHabilitar.push(this.turno);
    //    });
  }
  

  habilitarTurno(codigo){
    console.log(codigo);

    this.firebaseService.cambiarEstado(codigo,"Habilitado");
  }


  cancelarTurno(codigo){
    console.log(codigo);

    this.firebaseService.cambiarEstado(codigo,"Cancelado");
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }




  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

  listadodeturnosparaHabilitar()
  {
    this.listadoTurnosHabilitar = [];
console.log(this.turnos);
         
    this.turnos.forEach(element => {
       
     // if(element.diasDeTrabajo == dia)
      //{
         this.turno = new Turnos(element.id,element.DiaTurno,element.cliente,element.consultorio,element.especialidad,element.estado,element.horaTurno,element.numTurno,element.profesional);
        this.listadoTurnosHabilitar.push(this.turno);
      //}
   });



  }


}
