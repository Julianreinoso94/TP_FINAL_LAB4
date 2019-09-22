import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(public db: AngularFirestore) {}


  getTurno(userKey){
    return this.db.collection('turnos').doc(userKey).snapshotChanges();
  }

  updateTurnos(userKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('users').doc(userKey).set(value);
  }

  deleteUser(userKey){
    return this.db.collection('turnos').doc(userKey).delete();
  }

  getTurnos(){
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


  createTurno(value, a:String){

    return this.db.collection('turnos').add({
      nombrePaciente: value.nombrePaciente,
      nameToSearch: value.nombrePaciente.toLowerCase(),
      apellidoPaciente: value.apellidoPaciente,
      DiaTurno: a,
      horaTurno: value.horaTurno,
      profesional:value.profesional,
      consultorio:value.consultorio
    });
  }
}
