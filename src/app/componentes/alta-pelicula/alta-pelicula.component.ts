import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';
import { EstrellaCineService } from 'src/app/services/estrellaCine/estrella-cine.service';

@Component({
  selector: 'app-alta-pelicula',
  templateUrl: './alta-pelicula.component.html',
  styleUrls: ['./alta-pelicula.component.css']
})
export class AltaPeliculaComponent implements OnInit {
  public listaestrella: Array<any>;

  id:any;
  nombre:any;
  tipoPelicula:any;
  fechaext:any;
  cantPub:any;
  foto:any;
  actorcodigoid:any;
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
  }


  crearPelicula(
    nombre:number,
    tipoPelicula: string,
    fechaext: string,
    cantPub: number,
    foto: string
  ): void {

    if (
      this.nombre == undefined||
      this.tipoPelicula == undefined ||
      this.fechaext == undefined ||
      this.cantPub == undefined ||
      // this.foto == undefined || 
      this.actorcodigoid == undefined
    ) {
      alert("complete todos los campos");
      return;
    }
    //this.loading = true;

    this.peliculaserv
      .crearComida(this.id,this.nombre,this.tipoPelicula, this.fechaext, this.cantPub,"https://firebasestorage.googleapis.com/v0/b/piedrapapeltijera-cc32a.appspot.com/o/Desert.jpg?alt=media&token=c6b54a8f-44da-4c2e-97c5-a403ae4bc24b",this.actorcodigoid )
      .then(() => {
        // this.router.navigateByUrl('comida-list');
        alert("guardada");
      });
  }


}
