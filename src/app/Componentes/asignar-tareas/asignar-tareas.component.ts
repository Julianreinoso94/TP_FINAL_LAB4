import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asignar-tareas',
  templateUrl: './asignar-tareas.component.html',
  styleUrls: ['./asignar-tareas.component.css']
})
export class AsignarTareasComponent implements OnInit {
  allTechnologies = [
    'Lunes', 'Martes', 'Miercoles', '10:30', '11:00', '11:30', '12:00',
    '14:30', '15:00', '16:00', '16:30', '17:00', '17:30', '18:00'
]

  constructor() { }

  ngOnInit() {
  }

}
