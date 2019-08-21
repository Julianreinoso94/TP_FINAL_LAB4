import { Component, OnInit } from '@angular/core';
import { PeliculaService } from 'src/app/services/pelicula/pelicula.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  public count=0;
  respuestas:any;
  resultado:any;
  preguntas:string[] =["Quien fue el conquistador de america?",
  "Resultado de 3+3",
  "Cual es la Capital de Buenos Aires?",
  "Nombre del creador del lenguaje Java ?",
  "Creador del Lenguaje c++?"
];
  respuestas1:string[] =["San Martin","Guemes","Belgrano"];//0
  respuestas2:string[] =["4","6","3"];//1
  respuestas3:string[] =["San rafael","La plata","Temperley"];//1
  respuestas4:string[] =["James bring","Steve Jobs","James Gosling"];//2
  respuestas5:string[] =["Bill gates","Bjarne Stroustrup","Steve Jobs"];//1
  respuestas6:string[] =["Bill gates","Bjarne Stroustrup","Steve Jobs"];//1


  constructor(public gs:PeliculaService ) { }

  ngOnInit() {
    //this.preguntas=[d,d];
    this.count=0;
    this.respuestas=this.respuestas1;


  }

  siguiente()
  {
    this.respuestas=this.respuestas1;
    this.count++;
    if (this.count==1)
    {
      alert("primera");
      this.respuestas=this.respuestas2;

    }
    if (this.count==2)
    {
      alert("seg");
      this.respuestas=this.respuestas3;

    }
    if (this.count==3)
    {
      alert("ter");
      this.respuestas=this.respuestas4;

    }
    if (this.count==4)
    {
      alert("cuar");
      this.respuestas=this.respuestas5;

    }
    // if (this.count==5)
    // {
    //   alert("quin");
    //   this.respuestas=this.respuestas6;
    //   alert("juego terminado");
    //       //subir resultados al servicio

    



  }
 

  respuesta(valor)
  {
    alert("entro")
    if (this.count==1)
    {
      alert("primera");
            if(valor==0)
            {
              alert("correcto");
              this.resultado="Correcto"
            }
            if (valor==1)
            {
              alert("incorrecto");
            }
            else{
              alert("incorrecto");
            }
          
    }//fin primero
    if (this.count==2)
    {
      alert("segunda");

           if(valor==0)
            {
              alert("correcto");
              this.resultado="Correcto"
            }
            if (valor==1)
            {
              alert("incorrecto");
            }
            else{
              alert("incorrecto");
            }
    }//fin resultado 2
    if (this.count==3)
    {
          if(valor==0)
          {
            alert("correcto");
            this.resultado="Correcto"
          }
          if (valor==1)
          {
            alert("incorrecto");
          }
          else{
            alert("incorrecto");
          }

    }//FIN RESULTADO 3
    if (this.count==4)
    {
      if(valor==0)
      {
        alert("correcto");
        this.resultado="Correcto"
      }
      if (valor==1)
      {
        alert("incorrecto");
      }
      else{
        alert("incorrecto");
      }

    }//FIN RESULTADO 4
    if (this.count==5)
    {

          if(valor==0)
          {
            alert("correcto");
            this.resultado="Correcto"
          }
          if (valor==1)
          {
            alert("incorrecto");
          }
          else{
            alert("incorrecto");
          }
      alert("primera");
      this.respuestas=this.respuestas6;

    }//FIN RESULTADO 5
  

  }



  

}
