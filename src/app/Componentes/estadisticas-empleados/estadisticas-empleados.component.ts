import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import{TurnosService} from 'src/app/services/turnos.service'
import { ImageService } from 'src/app/services/image.service';
import { useAnimation } from '@angular/animations';
import { from } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AuthService} from 'src/app/services/auth.service'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-estadisticas-empleados',
  templateUrl: './estadisticas-empleados.component.html',
  styleUrls: ['./estadisticas-empleados.component.css']
})
export class EstadisticasEmpleadosComponent implements OnInit {
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

  ngOnInit() {
  }

}
