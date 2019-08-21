import { Component, OnInit } from '@angular/core';
import { EstrellaCineService } from 'src/app/services/estrellaCine/estrella-cine.service';

@Component({
  selector: 'app-alta-estrellacine',
  templateUrl: './alta-estrellacine.component.html',
  styleUrls: ['./alta-estrellacine.component.css']
})
export class AltaEstrellacineComponent implements OnInit {

  id:any;
  nombre:any;
  apellido:any;
  nacionalidad:any;
  fechanac:any;
  constructor(public cine:EstrellaCineService ) { }

  ngOnInit() {
  }

  crearestrellacine(
  
  ): void {

    if (
      this.id == null||
      this.nombre === null ||
      this.apellido === null ||
      this.nacionalidad === null ||
      this.fechanac === null 
    ) {
      alert("Rellene todos los campos");
      return;
     }
    this.cine.crearEstrellaCine(this.id,this.nombre,  this.apellido, this.nacionalidad ,  this.fechanac )
      .then(() => {
        alert("agregado");
        // this.router.navigateByUrl('comida-list');
        // this.fotoService.photos = [];
        // this.loading = false;
      });
  }

}
