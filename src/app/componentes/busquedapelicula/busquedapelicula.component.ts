import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { formatPercent } from '@angular/common';
import { Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-busquedapelicula',
  templateUrl: './busquedapelicula.component.html',
  styleUrls: ['./busquedapelicula.component.css']
})
export class BusquedapeliculaComponent implements OnInit {
  peliculas:any;
  nombre:any;

  public listapeliculas: Array<any>;

  constructor(private peliculaserv:PeliculaService) 
  {
    this.peliculaserv
    .getListaPeliculas()
    .get()
    .then(eventListSnapshot => {
      this.listapeliculas = [];
      eventListSnapshot.forEach(snap => {
        this.listapeliculas.push({
          id: snap.id,
          cantPub: snap.data().cantPub,
          codigo: snap.data().comidaCodigo,
          fechaext: snap.data().fechaext,
          foto: snap.data().foto,
          nombre: snap.data().nombre,
          tipoPelicula: snap.data().tipoPelicula,
        });
        return false;
      });
    });


   }


  ngOnInit() {
  }
   //buscar pelicula por nombre

     buscar1()
   {
    this.listapeliculas.forEach(element => {
      if (element.nombre==this.nombre)
      {
        alert("existe")
      }
      
    });

  
 console.log(this.peliculas);
   



}


   

 
}
