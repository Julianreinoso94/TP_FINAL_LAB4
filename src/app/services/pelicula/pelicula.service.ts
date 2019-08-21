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
export class PeliculaService {
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
  crearComida(
    comidaCodigo: number,
    nombre: string,
    tipoPelicula: string,
    fechaext: string,
    cantPub: number,
    foto: string,
    actor:string
      ): Promise<firebase.firestore.DocumentReference> {
    return this.db.collection(`/peliculas/`).add({
      comidaCodigo: comidaCodigo,
      nombre: nombre,
      tipoPelicula: tipoPelicula,
      fechaext: fechaext,
      cantPub: cantPub,
      foto:foto,
      actor:actor
    })
  }
  crearjuego(
    email: string,
    juego: string,
    resultado: string
      ): Promise<firebase.firestore.DocumentReference> {
    return this.db.collection(`/juegostp/`).add({
      email: email,
      juego: juego,
      resultado: resultado,
    
    })
  }

  getListaPeliculas(): firebase.firestore.CollectionReference {
    return this.db.firestore.collection(`/juegostp/`);
  }

  getDetalleComida(comidaId: string): firebase.firestore.DocumentReference {
    return this.listaComidasRef.doc(comidaId);
  }

 
  EliminarPeli(record_id) {
    this.listaComidasRef.doc('peliculas/' + record_id).delete();
    }


    buscarpelicula($comidaId)
  {
    /*
    var query = this.listaComidasRef.where("codigo", "==", $idProducto);
    return query;
    */

  
      return this.db.collection('peliculas', ref => ref.where('nombre', '>=', $comidaId)
      .where('nombre', '<=', $comidaId+ '\uf8ff'))
      .snapshotChanges();
  }



  // sendMsgToFirebase( message : message, chat_id : string){

  //   this.db.collection('chatsRooms').doc(chat_id).update({
  //     messages : firestore.FieldValue.arrayUnion(message),
  //   })
  // }
}
