import { Component, OnInit } from '@angular/core';
import { EstrellaCineService } from 'src/app/services/estrellaCine/estrella-cine.service';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { elementAt } from 'rxjs/operators';

@Component({
  selector: 'app-listadoactores',
  templateUrl: './listadoactores.component.html',
  styleUrls: ['./listadoactores.component.css']
})
export class ListadoactoresComponent implements OnInit {

  id:any;
  nombre:any;
  tipoPelicula:any;
  fechaext:any;
  cantPub:any;
  foto:any;
  actorcodigoid:any;
  nombreActor:string;
  public listaestrella: Array<any>;
  public listapeliculas: Array<any>;
  public peliculasactorseleccionado: Array<any>;


  constructor(public peliculaserv: PeliculaService ,private  actoresserv: EstrellaCineService) { }

  ngOnInit() {

    this.actoresserv
    .getestrella()
    .get()
    .then(eventListSnapshot => {
      this.listaestrella = [];
      eventListSnapshot.forEach(snap => {
        this.listaestrella.push({
          id: snap.id,
           codigo: snap.data().id,

          nombre: snap.data().nombre,
          nacionalidad: snap.data().nacionalidad,
        });
        return false;
      });
    });
    this.peliculaserv
    .getListaPeliculas()
    .get()
    .then(eventListSnapshot => {
      this.listapeliculas = [];
      eventListSnapshot.forEach(snap => {
        this.listapeliculas.push({
          id: snap.id,
          cantPub: snap.data().cantPub,
          actor: snap.data().actor,
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

  peliculasporactor(id){
  
    this.peliculasactorseleccionado=[];
    alert(id);
    alert("peliculas por actor");
    this.listapeliculas.forEach(element => {
      console.log(element.actor);
      if(element.actor == id)
      {

        this.peliculasactorseleccionado.push(element);
      }
      console.log(element);

    });
    console.log(this.peliculasactorseleccionado);
  }

}
