import { Component, OnInit } from '@angular/core';
import{EncuestasService} from 'src/app/services/encuestas.service'
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MultiDataSet, Label } from 'ng2-charts';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Color } from 'ng2-charts';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {
//dona2
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public fechaHoy =  new Date();
  public pieChartLabels: Label[] = [['SciFi'], ['Drama'], 'Comedy'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public items:any;

  public userProfile: any;



  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  

  constructor(
    // private storage: AngularFireStorage, 
    private fb: FormBuilder,
    public dialog: MatDialog,
    // public auth:AuthService,
    private router: Router,
    public encuesta: EncuestasService
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();


    this.getDatosfechaingreso();
   }

  ngOnInit() {
  }

  RealizadosPorRecepcion()
  {
    this.encuesta.RealizadosPorRecepcion(this.fechaHoy);
  }
  RealizadosPorcliente()
  {
    this.encuesta.RealizadosPorcliente(this.fechaHoy);
  }

  mostrarvariable(){
    console.log(this.fechaHoy);
    this.encuesta.DiasYhorariosIngresaronSistema(this.fechaHoy);

  }
  VotarEspecialista(valor)
  {
  //   allTechnologies = [
  //     'Odontologo',
  //      'Odontopediatría',
  //      'Implantólogo'		 
  // }

  switch (valor) {
    case  "Odontologo":
      this.encuesta.VotoEspecialidad('Odontologo');
      break;
      case  'Odontopediatría':
        this.encuesta.VotoEspecialidad('Odontopediatría');
      break;
      case  'Implantólogo':
        this.encuesta.VotoEspecialidad('Implantólogo');

        break;
  
    default:
      break;
  }
  }


  //graficos

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Odontopediatría', 'Odontopediatría', 'Implantólogo'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60], label: 'Especialidades mas elegidas' }
  ];


  //dona
  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

  




//TRAER DATOS 
getDatosfechaingreso(){
  this.encuesta.getDatosfechaingreso()
  .subscribe(result => {
    this.items = result;

  })
}




















}
