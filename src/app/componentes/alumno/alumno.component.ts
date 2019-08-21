import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Alumno } from '../../clases/alumno';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  @Output() alumnoCreado: EventEmitter<any>= new EventEmitter<any>();
  unAlumno:Alumno;

  constructor() { 
   
  }

  ngOnInit() {
   // this.unAlumno= new Alumno("alfredo","mercurio",666);
  }
 nuevoAlumno()
  {
    console.info("nuevoAlumno");
    let legajo:number =Math.floor((Math.random() * 1000) + 1);
    this.unAlumno= new Alumno("natalia","natalia",legajo);

  }
  crearAlumno()
  {
    console.info("crearAlumno");
    this.alumnoCreado.emit(this.unAlumno);
    this.unAlumno=null;
  }
}
