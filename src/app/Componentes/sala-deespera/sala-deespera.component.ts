import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import{TurnosService} from 'src/app/services/turnos.service';

@Component({
  selector: 'app-sala-deespera',
  templateUrl: './sala-deespera.component.html',
  styleUrls: ['./sala-deespera.component.css']
})
export class SalaDeesperaComponent implements OnInit {
  turnos : any;

  ageValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  codigoTurno:any;

  constructor(public firebaseService: TurnosService,
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

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }




  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

}
