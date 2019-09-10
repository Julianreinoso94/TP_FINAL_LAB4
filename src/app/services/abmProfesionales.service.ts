import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class abmProfesionales {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('profesionales').doc(userKey).snapshotChanges();
  }

  updateUser(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('profesionales').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('profesionales').doc(userKey).delete();
  }

  getUsers(){
    return this.db.collection('profesionales').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('profesionales',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('profesionales',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }

ActulizarHorarioTrabajo(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('profesionales').doc(userKey).set(value);
  }

  createUser(value, avatar){
    return this.db.collection('profesionales').add({
      name: value.name,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      // especialidad: value.especialidad,
      especialidad: value.especialidad,
     diasDeTrabajo:null,
     horario:null,
       avatar: avatar
    });
  }
}