import { Component, OnInit } from '@angular/core';


import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthService} from "src/app/services/auth.service"
import { Input} from '@angular/core';
import{User} from 'src/app/clases/user';
import { MatDialog } from '@angular/material';
import {LoginComponent} from 'src/app/Componentes/login/login.component'
import {ProfileService} from "src/app/services/profile.service"
import{HistoriaClinicaService} from 'src/app/services/historiaClinicaservice'
import { NgxSpinnerService } from "ngx-spinner";


//

import {AuthGuard} from 'src/app/guards/auth.guard';
import { Observable } from 'rxjs';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

class HistoriaClinica {

  diaTurno: String;
  profesional:String;
  uidPaciente:String;
  descripcion:String;
  especialidad:String;

  // ingresarperfil=false;


  constructor(diaTurno:String,uidPaciente:String,descripcion:String,especialidad:String,profesional:String )
  {
    this.diaTurno=diaTurno;
    this.descripcion=descripcion;
    this.profesional=profesional;
    this.uidPaciente=uidPaciente;


  }
}


@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
  public interval;
  public userProfile: any;
  public birthDate: Date;
  public perfil:string;
  public currentUser: firebase.User;
  public  usuarioSeleccionado:User;
  public historial:any;
  public listadoHistorial:any;




  //uif
  public  uidUsuario:any;
  email:any="ninguno";
  ingresarperfil=false;


  isLoggedIn$: Observable<boolean>;
  usrName = '';
  Logueado= false;
  historias : any;


  constructor( private spinnerService: NgxSpinnerService,
    private AFauth : AngularFireAuth, public historiaservice:HistoriaClinicaService,public auth:AuthService, private router : Router, private db : AngularFirestore, private profileService: ProfileService,    public dialog: MatDialog
    ) {

   
  }//fin constructor


  ngOnInit() {
    this.spinner();

    this.isLoggedIn$ = this.auth.isLoggedIn;
    console.log(this.isLoggedIn$)
    this.isLoggedIn$.subscribe(res => {
      if(res){
        this.setUsrName()
      }
    });

  }
  Detectar(){
    this.Logueado=true;
console.log("entro a detectar");
        this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
         console.log(this.userProfile);
        //this.birthDate = userProfileSnapshot.data().birthDate;
        this.perfil= userProfileSnapshot.data().perfil;
        //console.log(this.perfil);

      });

      firebase.auth().onAuthStateChanged(user => {
 
        this.currentUser = user;
        this.uidUsuario = user.uid});
    // }
    this.getData();

    console.log(this.currentUser);
    console.log(this.uidUsuario); 
}

spinner()
{
  this.spinnerService.show();

  setTimeout(() => {
    this.spinnerService.hide();
  }, 2000);
}
getData(){

  this.listadoHistorial= [];

  this.historiaservice.getHistoriaClinica().subscribe(data => {
    
   data.forEach(e => {

    if( this.uidUsuario == e.payload.doc.data()['uidPaciente'] )
    {
    this.historial = new HistoriaClinica( e.payload.doc.data()['DiaTurno'],e.payload.doc.data()['uidPaciente'],e.payload.doc.data()['descripcion'],e.payload.doc.data()['especialidad'],e.payload.doc.data()['profesional']);
  
        this.listadoHistorial.push(this.historial);      
    }   

    })
    console.log(this.listadoHistorial);
  });
}

setUsrName(){
  // let usr = this.auth.getCurrentUser();
    //this.usrName = usr.email;
    this.Detectar();
  }
}