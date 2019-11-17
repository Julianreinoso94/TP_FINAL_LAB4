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


import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
class Turnos {
  DiaTurno: String;
  cliente: String;
  consultorio: String;
  especialidad: String;
  estado: String;
  horaTurno: String;
  numTurno:String;
  profesional:String;


  constructor(DiaTurno:String,cliente:String,consultorio:String,especialidad:String,estado:String,horaTurno:String,numTurno:String,profesional:String )
  {
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
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})



export class MisTurnosComponent implements OnInit {

  turnos : any;
  turno;
  listadoFinal: Array<any>=[];

  listadoespecialistaspordia: any;

  ngOnInit() {
  }
  
  constructor(private storage: AngularFireStorage,  private authprofile: AuthService,
    private fb: FormBuilder,private servicioProfesionales: abmProfesionales,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: TurnosService,private service: ImageService
  ) {
  
  
  
  //  this.createForm();
  
  
    // this.traerprofesional();
    this.traerturnos();
    // this. mostrarturnos();
  
   }

  async traerturnos()
  {
    this.firebaseService.getTurnos().subscribe(data => {
     this.turnos=[];
      this.turnos = data.map(e => {
        return {
          id: e.payload.doc.id,
          DiaTurno: e.payload.doc.data()['DiaTurno'],
          apellidoPaciente: e.payload.doc.data()['apellidoPaciente'],
          horaTurno: e.payload.doc.data()['horaTurno'],
          nombrePaciente: e.payload.doc.data()['nombrePaciente'],
          profesional: e.payload.doc.data()['profesional'],
 
        };
      })
 
      
   
    });
    return this.turnos;
  }

  mostrar()
  {
    this.firebaseService.getTurnos().subscribe(data => {
      this.turnos=[];
       this.turnos = data.map(e => {
         return {
           id: e.payload.doc.id,
           DiaTurno: e.payload.doc.data()['DiaTurno'],
           apellidoPaciente: e.payload.doc.data()['apellidoPaciente'],
           horaTurno: e.payload.doc.data()['horaTurno'],
           nombrePaciente: e.payload.doc.data()['nombrePaciente'],
           profesional: e.payload.doc.data()['profesional'],
  
         };
       })
  
       
    
     });
    
    this.listadoespecialistaspordia = [];

         
    this.turnos.forEach(element => {
       
     // if(element.diasDeTrabajo == dia)
      //{
         this.turno = new Turnos(element.DiaTurno,element.cliente,element.consultorio,element.especialidad,element.estado,element.horaTurno,element.numTurno,element.profesional);
        this.listadoespecialistaspordia.push(this.turno);
      //}
   });

  
}
}
