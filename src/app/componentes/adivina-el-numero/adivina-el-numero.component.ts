import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { JuegoAdivina } from 'src/app/clases/juego-adivina';

@Component({
  selector: 'app-adivina-el-numero',
  templateUrl: './adivina-el-numero.component.html',
  styleUrls: ['./adivina-el-numero.component.css']
})
export class AdivinaElNumeroComponent implements OnInit {
  @Output() enviarJuego: EventEmitter<any>= new EventEmitter<any>();
 
   nuevoJuego: JuegoAdivina;
   Mensajes:string;
   ocultarVerificar:boolean;
   arrayResultados : Array<any>;
   jugador = JSON.parse(localStorage.getItem("Id"));
   intentos: number;
   aux: number;
  
   constructor() { 
     
     this.ocultarVerificar=false;
     this.arrayResultados = JSON.parse(this.jugador);
     this.nuevoJuego = new JuegoAdivina("Adivina el Numero Secreto",false, this.jugador, 0, "0");
     console.info("numero Secreto:",this.nuevoJuego.numeroSecreto);  
     this.nuevoJuego.jugador=sessionStorage.getItem('user');
   }
   generarnumero() {
     this.nuevoJuego.generarnumero();
     this.intentos=0;
   }
   verificar()
   {
     this.aux = this.nuevoJuego.numeroIngresado 
     
     this.ocultarVerificar=true;
     //console.info("numero Secreto:",this.nuevoJuego.gano);  
     if (this.nuevoJuego.verificar()){
       
       this.enviarJuego.emit(this.nuevoJuego);
       this.MostarMensaje("Sos un Genio!!!",true);
       this.nuevoJuego.gano = true;
       this.nuevoJuego.numeroSecreto=0;
       this.intentos+= 1;
       this.nuevoJuego.jugador=sessionStorage.getItem('user');
 
     }else{
       let mensaje:string;
       switch (this.intentos) {
         case 0:
           mensaje="casi casi";
           break;
         case 1:
           mensaje="No, intento fallido, animo";
           break;
           case 2:
           mensaje="No,Te estaras Acercando???";
           break;
           case 3:
           mensaje="No era el  "+this.nuevoJuego.numeroIngresado;
           break;
           default:
             mensaje="Llegaste a tu limite de intentos, iniciar nuevo juego";
             this.nuevoJuego = new JuegoAdivina();
       }
       this.intentos++;
       
       
       this.MostarMensaje("#"+this.intentos+" "+mensaje+" ayuda :"+this.nuevoJuego.retornarAyuda());
       this.nuevoJuego.numeroIngresado = null;
 
     }
     this.nuevoJuego.intentos = this.intentos;
     this.nuevoJuego.guardarLocal();
       this.nuevoJuego.jugador=sessionStorage.getItem('user');
     
     console.info("numero Secreto:",this.nuevoJuego.gano);  
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
       modelo.ocultarVerificar=false;
      }, 3000);
     console.info("objeto",x);
   
    }  
   ngOnInit() {
     
   }
 
 }