import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-asignar-tareas',
  templateUrl: './asignar-tareas.component.html',
  styleUrls: ['./asignar-tareas.component.css']
})
export class AsignarTareasComponent  {
  allTechnologies = [
    'Lunes', 'Martes', 'Miercoles', '10:30', '11:00', '11:30', '12:00',
    '14:30', '15:00', '16:00', '16:30', '17:00', '17:30', '18:00'
]
exampleForm: FormGroup;

  constructor(public fb: FormBuilder) { 

    this.createForm();

  }
  createForm() {
    this.exampleForm = this.fb.group({
      nombrePaciente: ['', Validators.required ],
      apellidoPaciente: ['', Validators.required ],

    });
  }
}
