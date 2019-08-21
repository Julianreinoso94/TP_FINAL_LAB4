import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Profesor } from 'src/app/clases/profesor';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
  @Output() SeCreoUnProfesor: EventEmitter<any>= new EventEmitter<any>();
  
  nuevoProfesor:Profesor;
  
  constructor() {
    
   }

  ngOnInit() {
 //   this.nuevoProfesor=new Profesor("n","n",0);
  }

  crearProfesor()
  {
    //hacer cosas
    let legajo:number =Math.floor((Math.random() * 1000) + 1);
    this.nuevoProfesor.legajo=legajo;
    this.SeCreoUnProfesor.emit(this.nuevoProfesor);
    this.nuevoProfesor=null;
  }
  hacerNuevoProfesor()
  {
    this.nuevoProfesor=new Profesor("n","n",0);

  }
}
