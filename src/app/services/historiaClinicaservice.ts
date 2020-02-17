import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class HistoriaClinicaService {

  constructor(public db: AngularFirestore) {}


  getHistoria(userKey){
    return this.db.collection('turnos').doc(userKey).snapshotChanges();
  }


  deleteUser(userKey){
    return this.db.collection('turnos').doc(userKey).delete();
  }

  getHistoriaClinica(){
    return this.db.collection('historiaClinica').snapshotChanges();
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


  createHistoriaClinica(uid:String,DiaTurno:String,descripcion:String,profesional:String){

    return this.db.collection('historiaClinica').add({
      uidPaciente:uid,
      DiaTurno:DiaTurno,
      descripcion:descripcion,
      profesional:profesional
    });
  }


   
  TraerListaHIstoriasClinicasPorPaciente()
  {
    // console.log("entro");
  
    return this.db.collection('historiaClinica', ref => ref.where('estado', '>=', 'En_Espera_Aceptacion')
    .where('estado', '<=', 'En_Espera_Aceptacion' + '\uf8ff'))
    .snapshotChanges();
  
  }

  TraerHistoriaClinicaDelPaciente(uidPaciente:string)
  {
    // console.log("entro");
  
    return this.db.collection('turnos', ref => ref.where('estado', '>=', 'Habilitado')
    .where('estado', '<=', 'Habilitado' + '\uf8ff'))
    .snapshotChanges();
  
  }


}
