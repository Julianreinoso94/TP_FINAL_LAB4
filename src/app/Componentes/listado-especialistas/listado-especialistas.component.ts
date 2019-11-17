import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import { ExportToCsv } from 'export-to-csv';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
@Component({
  selector: 'app-listado-especialistas',
  templateUrl: './listado-especialistas.component.html',
  styleUrls: ['./listado-especialistas.component.css']
})
export class ListadoEspecialistasComponent  implements OnInit {

  data: Array <any>;
  options:any;
  ageValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'myTableElementId', // the id of html/table element
  }

  constructor(
    public firebaseService: FirebaseService,private exportAsService: ExportAsService,
    private router: Router
  ) {

    this.data = [
      {
        EDAD: 'Test 1',
        dias: 13,
        especialidad: 8.2,
        nombre : true,
        apellido: "using 'Content here, content here' "
      },
      {
        EDAD: 'Test 1',
        dias: 13,
        especialidad: 8.2,
        nombre : true,
        apellido: "using 'Content here, content here' "
      },
      {
        EDAD: 'Test 1',
        dias: 13,
        especialidad: 8.2,
        nombre : true,
        apellido: "using 'Content here, content here' "
      },
    ];
     
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

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getespecialistas()
    .subscribe(result => {
      this.items = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
  }

  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
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
    const csvExporter = new ExportToCsv(this.options);
   
    csvExporter.generateCsv(this.data);
  }


   exportPDF() {
   var data = document.getElementById('contentToConvert'); 
    
  html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
    //  var imgHeight = canvas.height * imgWidth / canvas.width;
    var imgHeight = 5 * imgWidth / 6;  
      var heightLeft = imgHeight;  
  
   //   const contentDataURL = canvas.toDataURL('image/png')
      const contentDataURL = "canvas.toDataURL('image/png') " ;
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Especialistas.pdf'); // Generated PDF   
 });  
  }
  



   

}
