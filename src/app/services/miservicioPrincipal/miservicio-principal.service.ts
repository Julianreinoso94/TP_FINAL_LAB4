import { Injectable } from '@angular/core';
//import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import * as firebase from 'firebase/app';


@Injectable({
  providedIn: 'root'
})
export class MiservicioPrincipalService   {
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;
  



  public listaComidasRef: firebase.firestore.CollectionReference;
  constructor(private db : AngularFirestore) {

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
 
  }

  crearusuario(
    id: number,
    nombre: string,
    mail: string,
    perfil: string,
    pass: number,
      ): Promise<firebase.firestore.DocumentReference> {
    return this.db.collection(`/usuarioslab/`).add({
      codigo: id,
      nombre: nombre,
      mail: mail,
      perfil: perfil,
      pass: pass
    })
  }

  getListaPeliculas(): firebase.firestore.CollectionReference {
    return this.db.firestore.collection(`/peliculas/`);
  }

  getDetalleComida(comidaId: string): firebase.firestore.DocumentReference {
    return this.listaComidasRef.doc(comidaId);
  }

 
  EliminarPeli(record_id) {
    this.listaComidasRef.doc('peliculas/' + record_id).delete();
    }


    //////////////////////////////////////////////profile
  
    getUserProfile(): firebase.firestore.DocumentReference {
      return this.userProfile;
    }
  
    updateperfil(perfil: string): Promise<any> {
      return this.userProfile.update({ perfil });
    }
    logoutUser(): Promise<void> {
      return firebase.auth().signOut();
    }  

    signupUser(email: string, password: string,perfil:string): Promise<any> {
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((newUserCredential: firebase.auth.UserCredential) => {
          firebase
            .firestore()
            .doc(`/userProfile/${newUserCredential.user.uid}`)
            .set({ perfil });
  
        })
        .catch(error => {
          console.error(error);
          throw new Error(error);
        });
    }  


}

