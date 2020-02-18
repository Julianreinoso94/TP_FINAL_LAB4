import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EncuestasService {

  constructor(public db: AngularFirestore) {}


  createEncuestaComentarios(value){
    return this.db.collection('Comentarios').add({
      likes:0,
      dislikes:0,
      descripcion:value.descripcion,
      puntajeClinica:value.clinica,
      puntajeEspecialista:value.especialista
    });
  }

  updateComentariosLikes(userKey, value){
 

    this.db.doc('Comentarios/' + userKey).update({likes: value})

    // value.nameToSearch = value.name.toLowerCase();
    // return this.db.collection('Comentarios').doc(userKey).set(value);
  }
  updateComentariosdisLikes(userKey, value){
 

    this.db.doc('Comentarios/' + userKey).update({dislikes: value})

  }


  getComentarios(){
    return this.db.collection('Comentarios').snapshotChanges();
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

//D//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  getFechasIngresadas(){
    return this.db.collection('fechaIngreso').snapshotChanges();
  }
  BuscarSiExistenTUrnosMismaFecha(searchValue){
    return this.db.collection('turnos',ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  // updateFecha(userKey, value){
  //   value.nameToSearch = value.name.toLowerCase();
  //   return this.db.collection('users').doc(userKey).set(value);
  // }

  createFechaInicio(DiaTurno:String){
    return this.db.collection('fechaIngreso').add({
      cantidad:0,
      fecha:DiaTurno,

    });
  }
  updateCantidadFecha(userKey, value,dia){
    // return this.db.collection('fechaIngreso').doc(userKey).set(value);
  

  this.db.collection('fechaIngreso').doc(userKey).set({
    fecha:dia,
    cantidad: value,
  
  })

  }
  //F///////////////////////////////////////////////////////////////////////////////////////////////////////

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
