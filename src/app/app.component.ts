import { Component} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthService} from "src/app/services/auth.service"
import { OnInit ,Input} from '@angular/core';
import{User} from 'src/app/clases/user';
import { MatDialog } from '@angular/material';
import {LoginComponent} from 'src/app/Componentes/login/login.component';
import {AuthGuard} from 'src/app/guards/auth.guard';
import { Observable } from 'rxjs';

import {ProfileService} from "src/app/services/profile.service"
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
declare var $: any;
import * as $ from 'jquery';

declare var jQuery:any;
declare var $:any;


import { NgxSpinnerService } from "ngx-spinner";

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {
  dialogValue:string; 
  sendValue:string;
 entroAllogin:false;
  public interval;
  public userProfile: any;
  public birthDate: Date;
  public perfil:string;

  title = 'angular-firebase-crud';
  public unProfesor:boolean;
  public currentUser: firebase.User;
  public  usuarioSeleccionado:User;
  //public show=false;
  public show=true;
  public  uidUsuario:any;
  email:any="ninguno";
  ingresarperfil=false;


  isLoggedIn$: Observable<boolean>;
  usrName = '';
  Logueado= false;


  ngOnInit(): void {
    this.spinner();

    $(document).ready(function() {
      // executes when HTML-Document is loaded and DOM is ready
     
     // breakpoint and up  
     $(window).resize(function(){
         if ($(window).width() >= 980){  
        // console.log("entro");
           // when you hover a toggle show its dropdown menu
           $(".navbar .dropdown-toggle").hover(function () {
              $(this).parent().toggleClass("show");
              $(this).parent().find(".dropdown-menu").toggleClass("show"); 
            });
     
             // hide the menu when the mouse leaves the dropdown
           $( ".navbar .dropdown-menu" ).mouseleave(function() {
             $(this).removeClass("show");  
           });
       
             // do something here
         }   
     });  
       
     
     // document ready  
     });


     ///////////////////////////////////////////////////////////////////////////////////////////////observable
     this.isLoggedIn$ = this.auth.isLoggedIn;
     console.log(this.isLoggedIn$)
     this.isLoggedIn$.subscribe(res => {
       if(res){
         this.setUsrName()
       }
     });

  }


  // @Input() alumnoParaMostrar: Alumno ;



  constructor(private spinnerService: NgxSpinnerService,private AFauth : AngularFireAuth,public auth:AuthService, public auth2:AuthGuard, private router : Router, private db : AngularFirestore, private profileService: ProfileService,    public dialog: MatDialog
    ) {

      
     // this.interval = setInterval(() => this.Detectar(), 1000);
    
      console.log( "el userProfile es:");
  console.log( this.userProfile);

  }//fin constructor


  spinner()
  {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }

  
  logout(){
    this.Logueado=false;

    console.log("logout");
  this.auth.logout();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoginComponent,{width:'500px'});

    dialogRef.afterClosed().subscribe(result => {

   //   this.Detectar();
      console.log(`Dialog result: ${result}`);
      this.ingresarperfil= true;
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

    console.log(this.currentUser);
    console.log(this.uidUsuario); 


  }
  setUsrName(){
  // let usr = this.auth.getCurrentUser();
    //this.usrName = usr.email;
    this.Detectar();
  }


}

