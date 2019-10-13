import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import{TurnosService} from 'src/app/services/turnos.service'
import { ImageService } from 'src/app/services/image.service';
import { useAnimation } from '@angular/animations';
import { from } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AuthService} from 'src/app/services/auth.service'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  listadoFechas: Array<any>=[];
  picker1:any;
  picker2:any;
  events: string[] = [];
  fechatotal;

  fechaComienzo:any;
  fechaFinal:any;
  constructor(private storage: AngularFireStorage,  private authprofile: AuthService,
    private fb: FormBuilder,private servicioProfesionales: abmProfesionales,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: TurnosService,private service: ImageService
  ) {

 
 this.CantidadTurnosentreFechasEntreFecha();
 

   }

  ngOnInit() {
    console.log("ngOnInit");

  
  }

  diasyhorariosqueingresaronSistema()
  {
    alert("diasyhorariosqueingresaronSistema");
  }
  cantidadDeTurnosRealizadosPorEspecialidad()
  {
     alert("cantidadDeTurnosRealizadosPorEspecialidad");
  }

  CantidadTurnosentreFechasEntreFecha()
  {
    this.listadoFechas =[];
    this.firebaseService.RegistrosentreFechas().subscribe(result => {
      console.log("prueba");
      this.listadoFechas = result;

    })
    this.listadoFechas.forEach(element => {
    });
    console.log(this.listadoFechas);

    alert("CantidadTurnosentreFechasEntreFecha");

  }
  CantidadDiasSinturnosPorEspecialidad()
  {
    alert("CantidadDiasSinturnosPorEspecialidad");

  }
  CantidadDeTurnosRealizadosPorEspecialidad()
  {
    alert("CantidadDeTurnosRealizadosPorEspecialidad");

  }
  CantidadDeTurnosCanceladosPorEspecialidad()
  {
    alert("CantidadDeTurnosCanceladosPorEspecialidad");

  }
  CantidadDeTurnosRealizadosPorCliente()
  {
    alert("CantidadDeTurnosRealizadosPorCliente");

  }
  CantidadDeTurnosRealizadosPorRecepcionista()
  {
    alert("CantidadDeTurnosRealizadosPorRecepcionista");

  }

  EspecialidadMasUtilizada()
  {
    alert("EspecialidadMasUtilizada");

  }
  EspecialidadMenosUsada()
  {
    alert("EspecialidadMenosUsada");

  }

  MejoresComentarios()
  {
    alert("MejoresComentarios");

  }

  PeoresComentarios()
  {
    alert("PeoresComentarios");

  }


DiasentreFechas(d1, d2)
{
  
}

addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
  this.events.push(`${event.value}`);

 var fecha= this.events.toString();
 this.fechatotal=fecha;
 console.log("esta es l fecha"+fecha);
 var valor=fecha.split(" ",1);

 var color: string;
//  var valor1 = this.listadoespecialistaspordia.length;

  //  console.log( valor1);
 // this.listadoespecialistaspordia.length=0;


 

switch (valor.toString()) {
  case "Mon":
      var buscrcomo= "Lunes,Miercoles,Viernes";
  break;
  case "Tue":
   var buscrcomo= "Martes,Jueves";
   break;
  case "Wed":
      var buscrcomo= "Lunes,Miercoles,Viernes";

  //  this.compararFecha();
    break;
  case "Thu":
      var buscrcomo= "Martes,Jueves";

    break;
  case "Fri":
      var buscrcomo= "Lunes,Miercoles,Viernes";
    break;
    case "Sat":
        var buscrcomo= "Jueves,Sabados";

      break;
  default:
    confirm("Sorry, that color is not in the system yet!");
}

  // console.log(valor);

  // console.log(this.events);
  
  this.events.length=0;
}



}
