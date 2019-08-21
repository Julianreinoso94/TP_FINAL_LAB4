    
import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juegoagilidad';

import {Subscription} from "rxjs";
// import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   
  @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  ocultarVerificar: boolean;
  Mensajes:string;
  Tiempo: number;
  repetidor:any;
  private subscription: Subscription;
  arrayResultados : Array<any>;
  jugador = JSON.parse(localStorage.getItem("Id"));
  intentos: number;


  ngOnInit() {
  }
   constructor() {
    this.ocultarVerificar=true;
    
    this.Tiempo=5; 
    this.arrayResultados = JSON.parse(this.jugador);
    this.intentos = 0;
    this.nuevoJuego = new JuegoAgilidad("Agilidad Aritmetica", false, this.jugador, 0, "00");
    
    console.info("Inicio agilidad");  
  }

  NuevoJuego() {
    
    this.ocultarVerificar=false;
    this.nuevoJuego.generar();
    this.nuevoJuego.resultadoUsuario = null;
   this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=5;
        
      }
      },900);
      

  }
  verificar()
  {
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);
    if(this.nuevoJuego.verificar())
      {
        this.MostarMensaje("Correcto. Acertaste el resultado!!",true);
        this.nuevoJuego.gano = true;
        this.nuevoJuego.nombre="Agilidad Aritmetica";
        this.nuevoJuego.jugador=sessionStorage.getItem('user');        
        
      }
      else
        {
          this.nuevoJuego.gano = false;
          this.nuevoJuego.nombre="Agilidad Aritmetica";
          this.nuevoJuego.jugador=sessionStorage.getItem('user');
          this.MostarMensaje("Fallaste. El calculo es incorrecto!!",false);
        }
        this.nuevoJuego.guardarLocal();
      
        //Despues de verificar si gane o no, reinicio el juego!!


   
    
    this.Tiempo=5;
    this.ocultarVerificar=true;
   

   
  }  

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean=false) {
    this.Mensajes=mensaje;    
    var x = document.getElementById("snackbar");
    if(ganador)
      {
        x.className = "show Ganador";
      }else{
        x.className = "show Perdedor";
      }
    var modelo=this;
    setTimeout(function(){ 
      x.className = x.className.replace("show", "");
      
     }, 3000);
    console.info("objeto",x);
  
   }

}