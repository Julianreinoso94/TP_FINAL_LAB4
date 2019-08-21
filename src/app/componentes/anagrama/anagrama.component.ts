import { Component, OnInit } from '@angular/core';

import {Subscription} from "rxjs";
//import {TimerObservable} from "rxjs/observable/TimerObservable";
import { JuegoAnagrama } from 'src/app/clases/JuegoAnagrama ';
@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {
  
  nuevoJuego: JuegoAnagrama;
  Mensajes:string;
  contador:number;
  ocultarVerificar:boolean;
  mensaje : string;
  ocultarComenzar : boolean = true;
  jugador = JSON.parse(localStorage.getItem("Id"));

  constructor() { 
    this.nuevoJuego = new JuegoAnagrama("Anagrama",false,this.jugador, 0, "00"); 
    this.ocultarVerificar=true;
  }


  generarPalabra() {
    this.nuevoJuego.asignarPalabra();
    this.contador=0;
    this.ocultarVerificar = false;
    this.nuevoJuego.gano = false;
    this.Mensajes = "";
    this.ocultarComenzar = false;
  }

  verificar()
  {
    this.contador++;
    this.ocultarVerificar=true;
    if (this.nuevoJuego.verificar()){
      this.MostarMensaje("Adivinaste la palabra!!!",true);
    }else{
      this.mensaje = "No acertaste, buena suerte la proxima!";
      this.MostarMensaje(this.mensaje); 
      this.nuevoJuego.palabraIngresada ="";
      this.nuevoJuego.palabraDesordenada = "";
    }
    console.info("Gano: ",this.nuevoJuego.gano);  
    this.nuevoJuego.jugador=sessionStorage.getItem('user');
    this.nuevoJuego.guardarLocal();
    this.ocultarComenzar = true;
  }  

  MostarMensaje(mensaje:string,gano:boolean=false) {
    this.Mensajes = mensaje;    
    var x = document.getElementById("snackbar");
    if(gano)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }

    var modelo = this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      //modelo.ocultarVerificar=false;
     }, 3000);
    console.info("objeto",x);
  
   }  

  ngOnInit() {
  }

}
