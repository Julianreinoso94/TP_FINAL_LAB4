import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';

@Component({
  selector: 'app-botoneliminapeliculas',
  templateUrl: './botoneliminapeliculas.component.html',
  styleUrls: ['./botoneliminapeliculas.component.css']
})
export class BotoneliminapeliculasComponent implements OnInit {

  constructor( public peliculaserv:PeliculaService) { }

  ngOnInit() {
  }

  eliminar(id) {
    let record = {};
    this.peliculaserv.EliminarPeli(id);
  }

}
