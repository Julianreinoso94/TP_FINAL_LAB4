import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    public userProfile: firebase.firestore.DocumentReference;
public currentUser: firebase.User;

  constructor(public db: AngularFirestore) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`/userProfile/${user.uid}`);
      }
    });
  }

  getMiPerfil(userKey){
    return this.db.collection('userProfile').doc(userKey).snapshotChanges();
  }

  getPerfilCompleto(searchValue){
    return this.db.collection('users',ref => ref.where('email', '>=', searchValue)
      .where('email', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
  }


}