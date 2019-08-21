import { Component, OnInit, Input ,Output,EventEmitter} from '@angular/core';
import { Profesor } from 'src/app/clases/profesor';

@Component({
  selector: 'app-listado-profesor',
  templateUrl: './listado-profesor.component.html',
  styleUrls: ['./listado-profesor.component.css']
})
export class ListadoProfesorComponent implements OnInit {
@Input()  listadoProfesores:Profesor[];
@Output() profesorSeleccionado: EventEmitter<any>= new EventEmitter<any>(); 
constructor() { }

  ngOnInit() {
  }
  
  mostrarDetalles(parametroProfesor)
  {
    this.profesorSeleccionado.emit(parametroProfesor);
  }
}
