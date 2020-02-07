import { Component, OnInit } from '@angular/core';
import{EncuestasService} from 'src/app/services/encuestas.service'
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { MultiDataSet, Label } from 'ng2-charts';
import { SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Color } from 'ng2-charts';
import{TurnosService} from 'src/app/services/turnos.service'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

export const MY_FORMATS = {
  display: {
    dateInput: 'DD-MM-YYYY'
  },
};


class Turnos {
  DiaTurno: String;
  cliente: String;
  consultorio: String;
  especialidad: String;
  estado: String;
  horaTurno: String;
  numTurno:String;
  profesional:String;
  listadoespecialistaspordia: any;
  turno;
  id;

  listaDeFechas =[];

  constructor(id:String,DiaTurno:String,cliente:String,consultorio:String,especialidad:String,estado:String,horaTurno:String,numTurno:String,profesional:String )
  {
    this.id=id;
    this.DiaTurno=DiaTurno;
    this.cliente=cliente;
    this.consultorio=consultorio;
    this.especialidad=especialidad;
    this.estado=estado;
    this.horaTurno=horaTurno;
    this.numTurno=numTurno;
    this.profesional=profesional;

  }
}

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
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
  public events: string[] = [];

  public userProfile: any;
  turnos : any;
  cantidadTurnosOdontopediatria=0;
  cantidadTurnosOdontologo=0;
  cantidadTurnosImplantologo=0;
  birthday = new Date();
  fechatotal;
  exampleForm: FormGroup;
  public listaDeFechas:any;


//////////////////////////////7input fecha
date = new FormControl(new Date());
serializedDate = new FormControl((new Date()).toISOString());
  fechaComienzo:any;
  fechaFinal:any;

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
    private  firebaseServiceturnos:TurnosService,
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
   
   
    this.exampleForm = fb.group({
      area: '',
      exchange: '',
      subscriber: '',
    });

   }


  ngOnInit() {

      this.firebaseServiceturnos.getTurnos().subscribe(data => {
       
     console.log("traigo yutnos");
        this.turnos = data.map(e => {

          if( e.payload.doc.data()['especialidad']== 'Odontopediatría') 
          {
            this.cantidadTurnosOdontopediatria=this.cantidadTurnosOdontopediatria+1;
            console.log("odontopediatria")
     
          }
          if( e.payload.doc.data()['especialidad']== 'Odontologo') 
          {
            console.log("Odontologo")

            this.cantidadTurnosOdontologo=this.cantidadTurnosOdontologo+1;
          }
          if( e.payload.doc.data()['especialidad']== 'Implantologo') 
          {
            console.log("Implantologo")

            this.cantidadTurnosImplantologo=+1;
          }
          return {
            id: e.payload.doc.id,
            especialidad: e.payload.doc.data()['especialidad'],
            DiaTurno: e.payload.doc.data()['DiaTurno'],
            apellidoPaciente: e.payload.doc.data()['apellidoPaciente'],
            horaTurno: e.payload.doc.data()['horaTurno'],
            nombrePaciente: e.payload.doc.data()['nombrePaciente'],
            profesional: e.payload.doc.data()['profesional'],
            email: e.payload.doc.data()['email'],
           
   
          };
        })
   
        
     
      });

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
  barChartLabels: Label[] = ['Odontologo', 'Odontopediatría', 'Implantólogo'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [ this.cantidadTurnosOdontologo,  this.cantidadTurnosOdontopediatria,this.cantidadTurnosImplantologo], label: 'Especialidades mas elegidas' }
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


addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
   console.log(this.fechaFinal);
  console.log(this.fechaComienzo);
 
  // this.events.push(`${event.value}`);


  // this.events.length=0;
}




TraerDIASEntreFechas()
{
  // Returns an array of dates between the two dates
  this.listaDeFechas =[];
     //  var dates = [],
      var currentDate = this.fechaComienzo,
      addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };
  while (currentDate <= this.fechaFinal) {
    this.listaDeFechas.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
  }


// Usage
// var dates = getDates(new Date(2013,10,22), new Date(2013,11,25));                                                                                                           
//this.listaDeFechas.forEach(function(date) {
  this.listaDeFechas.forEach(function(item) {
    console.log(item);
    if(true)
    {
    console.log(item);
    }
  //});
});
//console.log( this.listaDeFechas);


}















}
