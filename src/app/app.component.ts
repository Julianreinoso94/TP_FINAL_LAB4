import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthService} from "src/app/services/auth.service"
import { OnInit ,Input} from '@angular/core';
import{User} from 'src/app/clases/user';
import { MatDialog } from '@angular/material';
import {LoginComponent} from 'src/app/Componentes/login/login.component'


import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
declare var $: any;
import * as $ from 'jquery';
declare var jQuery:any;
declare var $:any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dialogValue:string; 
  sendValue:string;

  ngOnInit(): void {

    $(document).ready(function() {
      // executes when HTML-Document is loaded and DOM is ready
     
     // breakpoint and up  
     $(window).resize(function(){
         if ($(window).width() >= 980){  
         console.log("entro");
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

  }


  // @Input() alumnoParaMostrar: Alumno ;


  title = 'angular-firebase-crud';
public unProfesor:boolean;
  public currentUser: firebase.User;
  public userProfile: any;
public  usuarioSeleccionado:User;

  uidUsuario:any;
 perfil:any;
 email:any="ninguno";


  constructor(private AFauth : AngularFireAuth,public auth:AuthService, private router : Router, private db : AngularFirestore,    public dialog: MatDialog
    ) {
    
    
  //   this.unProfesor=false;
  //   this.email="ninguno";
  //   this.auth
  //   .getUserProfile()
  //   .get()
  //   .then( userProfileSnapshot => {
  //    this.userProfile = userProfileSnapshot.data();
  //     this.email = userProfileSnapshot.data().email;
  //     this.perfil= userProfileSnapshot.data().perfil;
  //   });
  //  console.log(this.userProfile.perfil);

  }//fin constructor

  tomarusuario(UsuarioIngresado:User  )
  {
    alert("entro2tomar");
    this.usuarioSeleccionado=UsuarioIngresado;   
    this.perfil=this.usuarioSeleccionado.perfil;
    this.email=this.usuarioSeleccionado.email;
    this.unProfesor=true;
console.log(this.usuarioSeleccionado);
  }

  
  logout(){
    console.log("logout");
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/home']);
    })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '250px',
      backdropClass:'custom-dialog-backdrop-class',
      panelClass:'custom-dialog-panel-class',
      data: {pageValue: this.sendValue}
    });
 
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.dialogValue = result.data;
    });
  }
}
