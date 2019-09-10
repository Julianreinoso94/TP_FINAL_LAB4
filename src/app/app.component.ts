import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthService} from "src/app/services/auth.service"
import { OnInit ,Input} from '@angular/core';
import{User} from 'src/app/clases/user';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // @Input() alumnoParaMostrar: Alumno ;


  title = 'angular-firebase-crud';
public unProfesor:boolean;
  public currentUser: firebase.User;
  public userProfile: any;
public  usuarioSeleccionado:User;

  uidUsuario:any;
 perfil:any;
 email:any;


  constructor(private AFauth : AngularFireAuth,public auth:AuthService, private router : Router, private db : AngularFirestore) {
    this.unProfesor=false;
    this.email="ninguno";
    // this.auth
    // .getUserProfile()
    // .get()
    // .then( userProfileSnapshot => {
    //  this.userProfile = userProfileSnapshot.data();
    //   this.email = userProfileSnapshot.data().email;
    //   this.perfil= userProfileSnapshot.data().perfil;
    // });
  //  console.log(this.userProfile.perfil);
  }

  tomarusuario(UsuarioIngresado:User  )
  {
    this.usuarioSeleccionado=UsuarioIngresado;   
    this.perfil=this.usuarioSeleccionado.perfil;
    this.email=this.usuarioSeleccionado.email;
    this.unProfesor=true;

  }

  
  logout(){
    this.AFauth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
}
