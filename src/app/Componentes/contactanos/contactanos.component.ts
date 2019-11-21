import { Component, OnInit } from '@angular/core';
import{EncuestasService} from 'src/app/services/encuestas.service'
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';


import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {

  constructor(
    // private storage: AngularFireStorage, 
    private fb: FormBuilder,
    public dialog: MatDialog,
    // public auth:AuthService,
    private router: Router,
    public encuesta: EncuestasService
  ) {

   }

  ngOnInit() {
  }

  VotarEspecialista(valor)
  {
  //   allTechnologies = [
  //     'Odontologo',
  //      'Odontopediatría',
  //      'Implantólogo'		 
  // }
   var a= "Odontologo";
  alert("especialidad votada");
  switch (a) {
    case  "Odontologo":
      this.encuesta.VotoEspecialidad('Odontologo');
      break;
      case  'Odontopediatría':
      
      break;
      case  'Implantólogo':
      
        break;
  
    default:
      break;
  }
  }


  //graficos

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];
}
