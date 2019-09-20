import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(public db: AngularFirestore) {}


  getTurnos(userKey){
    return this.db.collection('turnos').doc(userKey).snapshotChanges();
  }

  updateTurnos(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('turnos').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('turnos').snapshotChanges();
  }
  getespecialistas(){
    return this.db.collection('turnos').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('turnos',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('turnos',ref => ref.orderBy('edad').startAt(value)).snapshotChanges();
  }


  createEncuesta(value){
    return this.db.collection('encuestas').add({
      clinica: value.clinica,
      especialista: value.especialista,
      descripcion: value.descripcion
    });
  }
}
