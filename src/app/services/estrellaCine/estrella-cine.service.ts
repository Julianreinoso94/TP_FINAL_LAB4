import { Injectable } from '@angular/core';
//import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EstrellaCineService {
  public listaComidasRef: firebase.firestore.CollectionReference;
  constructor(private db : AngularFirestore) {
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.listaComidasRef = firebase
    //       .firestore()
    //       .collection(`/peliculas`);
    //   }
    // });
  }

  crearEstrellaCine(
    id: number,
    nombre: string,
    apellido: string,
    nacionalidad: string,
    fecha: string
      ): Promise<firebase.firestore.DocumentReference> {
    return this.db.collection(`/actores/`).add({
      id: id,
      nombre: nombre,
      apellido: apellido,
      nacionalidad: nacionalidad,
      fecha: fecha
    
    })
  }

  getestrella(): firebase.firestore.CollectionReference {
    return this.db.firestore.collection(`/actores/`);
  }

  getDetalleComida(comidaId: string): firebase.firestore.DocumentReference {
    return this.listaComidasRef.doc(comidaId);
  }

  deleteComida(comidaId: string): any {
    return this.listaComidasRef.doc(comidaId).delete();
  }



  // sendMsgToFirebase( message : message, chat_id : string){

  //   this.db.collection('chatsRooms').doc(chat_id).update({
  //     messages : firestore.FieldValue.arrayUnion(message),
  //   })
  // }
}