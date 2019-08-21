import { Component, OnInit, Input ,Output,EventEmitter } from '@angular/core';
import { Profesor } from '../../clases/profesor';

@Component({
  selector: '[app-fila-profesor]',
  templateUrl: './fila-profesor.component.html',
  styleUrls: ['./fila-profesor.component.css']
})
export class FilaProfesorComponent implements OnInit {
@Output() profesorSeleccionado: EventEmitter<any>= new EventEmitter<any>(); 
@Input() unProfesor:Profesor;
  constructor() { }

  ngOnInit() {
  }
  mostrarDetalles(parametroProfesor)
  {
  	console.log(" fila");
    this.profesorSeleccionado.emit(parametroProfesor);
  }
}
