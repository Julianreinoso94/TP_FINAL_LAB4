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


class profile {

  email:any;
  name:any;
  uid:string;


constructor(email:any,name:string)
  {
    this.email=email;
    this.name=name;



  }
}
class HistoriaClinica {

  age:any;
  avatar:string;
  name:string;
  surname:string;
  object:any;

  // ingresarperfil=false;


constructor(age:any,avatar:string,name:string,surname:string)
  {
    this.age=age;
    this.avatar=avatar;
    this.name= name;
    this.surname=surname;


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
  public miprofileData:any;
  public listadoHistorial:any;




  //uif
  public  uidUsuario:any;
  email:any="ninguno";
  ingresarperfil=false;


  isLoggedIn$: Observable<boolean>;
  usrName = '';
  Logueado= false;
  historias : any;
  miPerfilObjet:any
  items:any;
  
  name_filtered_items: Array<any>;

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

  console.log("adad"+this.uidUsuario)



  this.historiaservice.getHistoriaClinica().subscribe(data => {
   
    this.profileService.getMiPerfil(this.uidUsuario)
    .subscribe(
      valor => {
        this.miprofileData = new profile(valor.payload.data()['email'],valor.payload.data()['name'])
//  this.miprofileData = new profile(valor.payload.data()['age'],valor.payload.data()['avatar'],valor.payload.data()['name'],valor.payload.data()['surname']);
        //this.miPerfilObjet=data;
      }
    );
    this.miprofileData.forEach(element => {
      this.email=element.email;
      
    });
    //segundo metodo
    console.log(this.miprofileData);

    this.profileService.getPerfilCompleto(this.email)
    .subscribe(result => {
     this.name_filtered_items = result;

    })


   data.forEach(e => {
    console.log("adad"+this.uidUsuario)

    if( this.uidUsuario == e.payload.doc.data()['uidPaciente'] )
    {
  //  this.historial = new HistoriaClinica( e.payload.doc.data()['DiaTurno'],e.payload.doc.data()['uidPaciente'],e.payload.doc.data()['descripcion'],e.payload.doc.data()['especialidad'],e.payload.doc.data()['profesional']);
  
       // this.listadoHistorial.push(this.historial);      
    }   

    })
    //console.log(this.listadoHistorial);
  });

 // console.log(this.miprofileData);
}

mostrar()
{
  console.log(this.miprofileData);
  console.log( this.name_filtered_items)
}
setUsrName(){
  // let usr = this.auth.getCurrentUser();
    //this.usrName = usr.email;
    this.Detectar();
  }
}