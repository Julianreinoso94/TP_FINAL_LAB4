import { Component, OnInit } from '@angular/core';
import{EncuestasService} from 'src/app/services/encuestas.service';

@Component({
  selector: 'app-listadocomentarios',
  templateUrl: './listadocomentarios.component.html',
  styleUrls: ['./listadocomentarios.component.css']
})
export class ListadocomentariosComponent implements OnInit {
  listadoComentarios:any;


  constructor(  public firebaseService: EncuestasService) { }

  ngOnInit() {
    this.traerComentarios();
  }

  async traerComentarios()
  {
    this.firebaseService.getComentarios().subscribe(data => {
 
      this.listadoComentarios = data.map(e => {
        return {
          id: e.payload.doc.id,
          descripcion: e.payload.doc.data()['descripcion'],
          puntajeClinica: e.payload.doc.data()['puntajeClinica'],
          puntajeEspecialista: e.payload.doc.data()['puntajeEspecialista'],
          likes: e.payload.doc.data()['likes'],
          dislikes: e.payload.doc.data()['dislikes'],


        }
 
    
      })
    })
  }

dislike(item)
{
  var count=0;
  count= item.dislikes+1
 this.firebaseService.updateComentariosdisLikes(item.id,count);
}

like(item)
{
  console.log(item);
  var count=0;
   count= item.likes+1
  this.firebaseService.updateComentariosLikes(item.id,count);

}

}
  