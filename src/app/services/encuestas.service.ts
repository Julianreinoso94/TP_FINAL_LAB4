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


  /////////////////////////////////////////////////////////////////////////////
  // Podrá ver, estadísticas:
  // 1- De los empleados:
   //A) Los días y horarios que se Ingresaron al sistema.
  // B)Cantidad de turnos realizados de todos por especialidad.
  // 2- De los turnos:
  // C)Cantidad de turnos entre fechas dadas.
  // D)Cantidad de días sin turnos por especialidad.
  // E)Los realizados por especialidad.
  // F)Los cancelados por especialidad.
  // G)Los realizados por Clientes.
  // H)Los realizados por recepcionista.
  // 3- De las especialidades:
  // I)La más usada.
  // J)La menos usada.
  //K) Mejores comentarios.
  //L) Peores comentarios.


  //estadisticas

  //B
  VotoEspecialidad(value){
    return this.db.collection('encuestas').add({
      especialidad: value,
    });
  }

//D
  DiasYhorariosIngresaronSistema (value)
  {
    return this.db.collection('fechaIngreso').add({
      fecha: value,
    });
  }

  //F

  CanceladosPorEspecialidad (value)
  {
    return this.db.collection('TurnosCancelados').add({
      fecha: value,
    });
  }

  RealizadosPorRecepcion(value)
  {
    return this.db.collection('TurnosPerfilRecepcion').add({
      fecha: value,
    });
  }
  //G Los realizados por PERFIL Clientes.
  RealizadosPorcliente (value)
  {
    return this.db.collection('TurnosPerfilCliente').add({
      fecha: value,
    });
  }
    //h Los realizados por PERFIL recepcionista.
    RealizadosPorRecepcionista(value)
    {
      return this.db.collection('TurnosPerfilCliente').add({
        fecha: value,
      });
    }

    //especialidadMasUsada


    // GET DATOS ENCUESTAS

    getDatosfechaingreso(){
      return this.db.collection('fechaIngreso').snapshotChanges();
    }
  

}
