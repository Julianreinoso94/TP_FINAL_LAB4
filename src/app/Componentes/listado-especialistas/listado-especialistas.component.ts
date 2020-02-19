import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import { ExportToCsv } from 'export-to-csv';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  

import { NgxSpinnerService } from "ngx-spinner";

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";


class profesional {
  age: any;
  avatar: String;
  DiasDeTrabajo: String;
  especialidad: String;
  name: String;

  surname: String;

  //ingresarperfil=false;


  constructor(age:String,avatar?:String,DiasDeTrabajo?:String,especialidad?:String,name?:String )
  {
    this.age=age;
    this.avatar=avatar;
    this.DiasDeTrabajo=DiasDeTrabajo;
    this.especialidad=especialidad;
    this.name=name;

  }
  
}
@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.css']
})





export class ListadoEspecialistasComponent  implements OnInit {

  data: Array <profesional>;
  options:any;
  ageValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  profesional:profesional;
   profesionales: any;
  detalles=false;
  profesional1:any;
  exampleForm: FormGroup;
  item: any;
  age:number;
  name:any;
  surname:any;
  avatar:any;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'myTableElementId', // the id of html/table element
  }

  constructor(private spinnerService: NgxSpinnerService,    private fb: FormBuilder,

    public firebaseService: FirebaseService,private exportAsService: ExportAsService,
    private router: Router,private servicioProfesionales: abmProfesionales
  ) {

    this.traerprofesional();

     
       this.options = { 
        fieldSeparator: '   |   ',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true, 
        showTitle: true,
        title: 'INFORMACION DE ESPECIALISTAS',
        useTextFile: false,
        useBom: true,
        useKeysAsHeaders: true,
        // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
      };


   }
   validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'age': [
      { type: 'required', message: 'Age is required.' },
    ]
  };
   
  ngOnInit() {
    this.spinner();

    this.getData();
    this.traerprofesional;

  }

  spinner()
  {
    this.spinnerService.show();

    setTimeout(() => {
      this.spinnerService.hide();
    }, 2000);
  }

  getData(){
    this.firebaseService.getespecialistas()
    .subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
  }



  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName(){
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchUsers(value)
    .subscribe(result => {
      this.name_filtered_items = result;
      this.items = this.combineLists(result, this.age_filtered_items);
    })
  }

  rangeChange(event){
    this.firebaseService.searchUsersByAge(event.value)
    .subscribe(result =>{
      this.age_filtered_items = result;
      this.items = this.combineLists(result, this.name_filtered_items);
    })
  }

  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

  imprimir()
  {
    this.llenarArray();
    const csvExporter = new ExportToCsv(this.options);
  //  JSON.stringify(this.ite)

    csvExporter.generateCsv(this.data);
  }
  
  async traerprofesional()
  {
    this.servicioProfesionales.getUsers().subscribe(data => {
  
      this.profesionales = data.map(e => {
        return {
          id: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          age: e.payload.doc.data()['age'],
          avatar: e.payload.doc.data()['avatar'],
          especialidad: e.payload.doc.data()['especialidad'],
          horario: e.payload.doc.data()['horario'],
          diasDeTrabajo: e.payload.doc.data()['diasDeTrabajo'],
          surname: e.payload.doc.data()['surname'],
      
        };
      })
  
      
   
    });
 
    return this.profesionales;
  }

  llenarArray()
  {
    this.data=[];
   // this.profesionales=[];
  this.profesionales.forEach(element => {
    this.profesional = new profesional(element.id,element.diasDeTrabajo,element.DiasDeTrabajo,element.especialidad,element.name);
  //  this.profesional=new profesional(element.id,  )
    this.data.push( this.profesional);
    
  });
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ["this.item.name", Validators.required],
      surname: ["this.item.surname", Validators.required],
      age: ["this.item.age", Validators.required]
    });
  }


  



   exportPDF() {
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  

    //  var imgHeight = canvas.height * imgWidth / canvas.width;
    var imgHeight = 5 * imgWidth / 6;  
      var heightLeft = imgHeight;  
  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Especialistas.pdf'); // Generated PDF   
 });  
  }
  



  onSubmit(value){
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    this.firebaseService.updateUser(this.item.id, value)
    .then(
      res => {
        this.router.navigate(['/home']);
      }
    )
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
    .then(
      res => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    )
  }

  cancel(){
    this.router.navigate(['/home']);
  }
   
  viewDetails(id){
    console.log(id)

    this.profesionales.forEach(element => {
      if( element.id == id) 
      {
        this.name=element.name;
        this.age=element.age;
        this.avatar=element.avatar;
        this.surname=element.surname;
           console.log(element);
      }
    });


    this.createForm();
    this.detalles=true;

  }



}
