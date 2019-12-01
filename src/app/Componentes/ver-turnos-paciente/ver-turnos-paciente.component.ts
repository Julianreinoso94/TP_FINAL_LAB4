import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import{TurnosService} from 'src/app/services/turnos.service'
import{HistoriaClinicaService} from 'src/app/services/historiaClinicaservice'



//DETECTAR USUARIO
import { Observable } from 'rxjs';
import {ProfileService} from "src/app/services/profile.service"
import {AuthService} from 'src/app/services/auth.service'


@Component({
  selector: 'app-ver-turnos-paciente',
  templateUrl: './ver-turnos-paciente.component.html',
  styleUrls: ['./ver-turnos-paciente.component.css']
})
export class VerTurnosPacienteComponent implements OnInit {
  turnos : any;
  public fechaHoy =  new Date();
  ageValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  codigoTurno:any;
  historiaClinica:any;
  

  constructor(public firebaseService: TurnosService, public historiaservice:HistoriaClinicaService,
    // public firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.TraerTurnosDentista().subscribe(data => {
      
      this.turnos = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          codigo: e.payload.doc.data()['codigo'],
          estado: e.payload.doc.data()['estado'],
          profesional: e.payload.doc.data()['profesional'],
          consultorio: e.payload.doc.data()['consultorio'],
          cliente: e.payload.doc.data()['cliente'],
          especialidad: e.payload.doc.data()['especialidad'],
          horaTurno: e.payload.doc.data()['horaTurno'],
          DiaTurno: e.payload.doc.data()['DiaTurno'],
          numTurno: e.payload.doc.data()['numTurno'],
        
        };
      })
      console.log(this.turnos);
    });
  }
  

  habilitarTurno(codigo){
    console.log(codigo);

    this.firebaseService.cambiarEstado(codigo,"Presente");
  }


  cancelarTurno(codigo){
    console.log(codigo);

    this.firebaseService.cambiarEstado(codigo,"Ausente");
  }

 

  guardarHistoriaClinica(val){
    console.log(val);
   // "uid","DiaTurno","descripcion","profesional"
    this.historiaservice.createHistoriaClinica("uid",this.fechaHoy.toString(),this.historiaClinica,"profesional");
  }

}
