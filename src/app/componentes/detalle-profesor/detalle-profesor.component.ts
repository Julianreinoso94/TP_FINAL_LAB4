import { Component, OnInit, Input } from '@angular/core';
import { Profesor } from '../../clases/profesor';
@Component({
  selector: 'app-detalle-profesor',
  templateUrl: './detalle-profesor.component.html',
  styleUrls: ['./detalle-profesor.component.css']
})
export class DetalleProfesorComponent implements OnInit {

 @Input() unProfesor:Profesor;

  constructor() { 
  //  this.unProfesor= new Profesor("peres","matematica",888);

  }

  ngOnInit() {
  }

}
