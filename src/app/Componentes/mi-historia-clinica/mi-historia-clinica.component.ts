import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { ImageService } from 'src/app/services/image.service';
import { useAnimation } from '@angular/animations';
import { from } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AuthService} from 'src/app/services/auth.service'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import{TurnosService} from 'src/app/services/turnos.service'
import{HistoriaClinicaService} from 'src/app/services/historiaClinicaservice'



//DETECTAR USUARIO
import { Observable } from 'rxjs';
import {ProfileService} from "src/app/services/profile.service"
import 'firebase/auth';
import 'firebase/firestore';

import{HistoriaClinica} from 'src/app/clases/historiaClinica';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


class Turnos {

  diaTurno: String;
  cliente: String;
  consultorio: String;
  especialidad: String;
  estado: String;
  uidProfesional:String;
  emailPaciente:String;

  horaTurno: String;
  numTurno: String;
  profesional:String;

  // ingresarperfil=false;


  constructor(diaTurno:String,cliente:String,consultorio:String,especialidad:String,estado:String,horaTurno:String,numTurno:String,profesional:string,uidProfesional:String,emailPaciente:String )
  {
    this.diaTurno=diaTurno;
    this.cliente=cliente;
    this.consultorio=consultorio;
    this.especialidad=especialidad;
    this.estado=estado;
    this.horaTurno=horaTurno;
    this.numTurno=numTurno;
    this.profesional=profesional;
  this.uidProfesional=uidProfesional;
  this.emailPaciente =emailPaciente;
  }
}

@Component({
  selector: 'app-mi-historia-clinica',
  templateUrl: './mi-historia-clinica.component.html',
  styleUrls: ['./mi-historia-clinica.component.css']
})
export class MiHistoriaClinicaComponent implements OnInit {
  turnos : any;
  public fechaHoy =  new Date();
  ageValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  codigoTurno:any;
  historiaClinica:any;
  listadomisTurnos:any;
  turno:any;
  mostrarHistoriaClinica=true;

  //DETECTAR USUARIO
  isLoggedIn$: Observable<boolean>;
  usrName = '';
  Logueado= false;
  public userProfile: any;
  public email:any;
  public birthDate: Date;
  public perfil:string;
  uidUsuario:any;

  public currentUser: firebase.User;

  constructor(public firebaseService: TurnosService,private profileService: ProfileService, public historiaservice:HistoriaClinicaService,
    private authprofile: AuthService,public auth:AuthService,public historiaClinicaService: HistoriaClinicaService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getData();
     ///////////////////////////////////////////////////////////////////////////////////////////////observable
     this.isLoggedIn$ = this.auth.isLoggedIn;
     console.log(this.isLoggedIn$)
     this.isLoggedIn$.subscribe(res => {
       if(res){
         this.setUsrName()
       }
     });
this.getData();
  }

  getData(){
    this.listadomisTurnos= [];

    this.historiaClinicaService.getHistoriaClinica().subscribe(data => {
      
     data.forEach(e => {

      console.log(e.payload.doc.data()['uidPaciente']);
       
      if( this.uidUsuario == e.payload.doc.data()['uidPaciente'] )// SI INGRESO COMO MEDICO
    {
      console.log(this.uidUsuario);
      this.historiaClinica= new HistoriaClinica (e.payload.doc.data()['DiaTurno'],e.payload.doc.data()['descripcion'],e.payload.doc.data()['profesional'],e.payload.doc.data()['uidPaciente'])
         
          this.listadomisTurnos.push(this.historiaClinica);      

        
     }
      })
      console.log(this.turnos);
    });


    
  }
  

  Detectar(){
    // this.Logueado=true;
 console.log("entro a detectar");
         this.profileService
       .getUserProfile()
       .get()
       .then( userProfileSnapshot => {
         this.userProfile = userProfileSnapshot.data();
      
         //this.birthDate = userProfileSnapshot.data().birthDate;
         this.perfil= userProfileSnapshot.data().perfil;
         this.email= userProfileSnapshot.data().email;

         //console.log(this.perfil);
 
       });
 
       firebase.auth().onAuthStateChanged(user => {
  
         this.currentUser = user;
         this.uidUsuario = user.uid
        });
 
   }
   setUsrName(){
   // let usr = this.auth.getCurrentUser();
     //this.usrName = usr.email;
     this.Detectar();
   }
  
   usuarioes()
   {
    //  alert(this.userProfile);

    //  alert(this.uidUsuario);
   }



}

