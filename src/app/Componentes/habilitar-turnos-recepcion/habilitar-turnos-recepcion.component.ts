import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import{TurnosService} from 'src/app/services/turnos.service'
import { NgxSpinnerService } from "ngx-spinner";

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
  email;


  constructor(id:String,DiaTurno:String,cliente:String,consultorio:String,especialidad:String,estado:String,horaTurno:String,numTurno:String,profesional:String,email:String )
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
    this.email=email;

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
  listadoTurnosMostrar: Array <Turnos>;

  constructor(public firebaseService: TurnosService,private spinnerService: NgxSpinnerService,
    // public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.spinner();

    this.getData();
  }
  spinner()
  {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }
  getData(){
    this.firebaseService.TraerTurnosRecepcion()
    .subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
  }

  

  habilitarTurno(codigo){
    console.log(codigo);

    this.firebaseService.cambiarEstado( codigo.payload.doc.id,"Habilitado");
    // this.getData();
  }


  cancelarTurno(codigo){
    console.log(codigo);

    this.firebaseService.cambiarEstado(codigo.payload.doc.id,"Cancelado");
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
         this.turno = new Turnos(element.id,element.DiaTurno,element.cliente,element.consultorio,element.especialidad,element.estado,element.horaTurno,element.numTurno,element.profesional,element.email);
        this.listadoTurnosHabilitar.push(this.turno);
      //}
   });



  }


}
