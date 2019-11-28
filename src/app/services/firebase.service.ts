import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getAvatars(){
      return this.db.collection('/avatar').valueChanges()
  }

  getUser(userKey){
    return this.db.collection('users').doc(userKey).snapshotChanges();
  }

  updateProfesional(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('profesionales').doc(userKey).set(value);
  }

  deleteProfesional(userKey){
    return this.db.collection('profesionales').doc(userKey).delete();
  }
  deleteUser(userKey){
    return this.db.collection('users').doc(userKey).delete();
  }
  updateUser(userKey, value){
    
      value.nameToSearch = value.name.toLowerCase();
      return this.db.collection('users').doc(userKey).set(value);
    }

  getUsers(){
    return this.db.collection('users').snapshotChanges();
  }
  getespecialistas(){
    return this.db.collection('profesionales').snapshotChanges();
  }

  searchUsers(searchValue){
    return this.db.collection('users',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchUsersByAge(value){
    return this.db.collection('users',ref => ref.orderBy('age').startAt(value)).snapshotChanges();
  }


  createUser(value, avatar){
    return this.db.collection('users').add({
      name: value.name,
      email: value.email,
      nameToSearch: value.name.toLowerCase(),
      surname: value.surname,
      age: parseInt(value.age),
      avatar: avatar
    });
  }
}
