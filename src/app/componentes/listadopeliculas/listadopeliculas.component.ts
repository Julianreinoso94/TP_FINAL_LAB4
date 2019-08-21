import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { Input ,Output,EventEmitter } from '@angular/core';
import { EstrellaCineService } from 'src/app/services/estrellaCine/estrella-cine.service';

@Component({
  selector: 'app-listadopeliculas',
  templateUrl: './listadopeliculas.component.html',
  styleUrls: ['./listadopeliculas.component.css']
})
export class ListadopeliculasComponent implements OnInit {
  public listapeliculas: Array<any>;

  constructor(private eventService:PeliculaService,private actoresserv: EstrellaCineService)
  { }

  ngOnInit() {
    this.eventService
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

  eliminar()
  {
    alert("eliminar");
  }

}
