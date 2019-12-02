import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  public listaComidasRef: firebase.firestore.CollectionReference;





  //////////////////////nuevo
  private loggedIn = new BehaviorSubject<boolean>(false);
  private loggedOut = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isLoggedOut() {
    return this.loggedOut.asObservable();
  }

  public isAuthenticated() {

    this.loggedIn.next(true);
    this.loggedOut.next(false);
  }

  constructor(private AFauth : AngularFireAuth, private router : Router, private db : AngularFirestore) { 

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.listaComidasRef = firebase
          .firestore()
          .collection(`/userProfile`);
      }
    });
  }

  
  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;

  }
  login(email:string, password:string){

    return new Promise((resolve, rejected) =>{
      this.AFauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });

   
  }

  logout(){
    this.AFauth.auth.signOut().then(() => {
      console.info("signOut")
      this.loggedIn.next(false);
      this.loggedOut.next(true);
      this.router.navigate(['/home']);    })
  }

  
  // createTurno(value){
  //   return this.db.collection('turnos').add({
  //     nombrePaciente: value.nombrePaciente,
  //     nameToSearch: value.nombrePaciente.toLowerCase(),
  //     apellidoPaciente: value.apellidoPaciente,
  //     DiaTurno: value.DiaTurno,
  //     horaTurno: value.horaTurno,
  //     profesional:value.profesional,
  //     consultorio:value.consultorio
  //   });
  // }

    // registerEmpleado(email : string, password : string, dni: string, nombre: string, apellido: string, cuil: string, perfil: string, foto:string){
      registerEmpleado(value,url){

    return new Promise ((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then( res =>{
        const uid = res.user.uid;
        

        this.db.collection('profesionales').doc(uid).set({
          name: value.name,
       nameToSearch: value.name.toLowerCase(),
       surname: value.surname,
       age: parseInt(value.age),
       uid:uid,
       email:value.email,
       especialidad: value.especialidad,
       diasDeTrabajo:value.dias,
        avatar: url
         })
 
  
          this.db.collection('userProfile').doc(uid).set({
            //name : name,
            uid : uid,
            //nombre: nombre,
            perfil: "especialista",
            //dni: dni,
            email: value.email
            //clave: password
          })
        
        resolve(res)
      }).catch( err => reject(err))
    })
  }
  registerPaciente(value){

    return new Promise ((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email,"123456").then( res =>{
        const uid = res.user.uid;
 
  
          this.db.collection('userProfile').doc(uid).set({
            //name : name,
            uid : uid,
            //nombre: nombre,
            perfil: "paciente",
            //dni: dni,
            email: value.email
            //clave: password
          })
        
        resolve(res)
      }).catch( err => reject(err))
    })
  }



}
