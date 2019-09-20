import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { promise } from 'protractor';
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import 'firebase/auth';
import 'firebase/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  public listaComidasRef: firebase.firestore.CollectionReference;


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

  traerBebidas()
  {
    return this.db.collection('userProfile', ref => ref.where('perfil', '>=', 'paciente')
    .where('perfil', '<=', 'paciente' + '\uf8ff'))
    .snapshotChanges();
  }

  getComidasList(): firebase.firestore.CollectionReference {
    return this.listaComidasRef;
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
      this.router.navigate(['/login']);
    })
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
      registerEmpleado(value){

    return new Promise ((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password).then( res =>{
        const uid = res.user.uid;
 
  
          this.db.collection('userProfile').doc(uid).set({
            //name : name,
            uid : uid,
            //nombre: nombre,
            perfil: "perfil",
            //dni: dni,
            email: value.email
            //clave: password
          })
        
        resolve(res)
      }).catch( err => reject(err))
    })
  }
  



}
