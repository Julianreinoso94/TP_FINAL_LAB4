import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { JuegoPiedraPapelTijera } from 'src/app/clases/juego-piedra-papel-tijera';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent  implements OnInit {
  
  nuevoJuego : JuegoPiedraPapelTijera;
  ocultarVerificar : boolean;
  ocultarNuevo : boolean;
  Mensajes:string;
  arrayResultados : Array<any>;
  jugador = JSON.parse(localStorage.getItem("Id"));
  intentos: number;
  constructor() {
    this.nuevoJuego = new JuegoPiedraPapelTijera("Piedra, Papel o Tijera",false,this.jugador,0,"0");
    this.ocultarVerificar = true;
    this.arrayResultados = JSON.parse(this.jugador);
    this.intentos = 0;
    this.nuevoJuego.resultado=null;
    console.info(this.arrayResultados);
   }
   public generar(eleccion:string)
   {
     this.ocultarVerificar = false;
     //this.nuevoJuego.resultado= this.nuevoJuego.Jugar(eleccion);
     
   // this.MostarMensaje(this.nuevoJuego.resultado, this.nuevoJuego.gana);
    //console.log(this.nuevoJuego.gana);
    this.nuevoJuego.jugador=sessionStorage.getItem('user');
    this.nuevoJuego.intentos = this.intentos+1;
    this.intentos=0;
        
        
      
    this.nuevoJuego.intentos = this.intentos;
  
    console.log("usuario " + eleccion);
    console.log(this.nuevoJuego.resultado);
  this.nuevoJuego.guardarLocal();
  
  //Despues de verificar si gane o no, reinicio el juego!!
   }
   MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean) {
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

export class PiedraPapelTijeraComponent implements OnInit {
  @Output()enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  
  nuevoJuego : JuegoPiedraPapelTijera;
  elecccionJugador:number =0
  eleccionMalo:number =0;
  audio = new Audio();
  Mensajes:string;
  puntos:number = 0;
  puntosRival:number = 0;
  botonComenzarVerificar:boolean =true;
  mostrarGif:boolean =true;
  labelPuntos:boolean = false;
  labelGanaste:boolean =false;
  labelPerdiste:boolean =false;
  bSonido:boolean=false;
//AGREGADOS
  arrayResultados : Array<any>;
  jugador = JSON.parse(localStorage.getItem("Id"));
  intentos: number;


  constructor() { 
  //  this.nuevoJuego = new JuegoPiedraPapelTijera();
  this.nuevoJuego = new JuegoPiedraPapelTijera("Piedra, Papel o Tijera",false,this.jugador,0,"0");
  this.arrayResultados = JSON.parse(this.jugador);
  this.intentos = 0;
  this.nuevoJuego.resultado=null;
  console.info(this.arrayResultados);
  }



  primerJuego(){
    //this.generarPartida(Math.floor(Math.random() * 3) + 1);
    this.nuevoJuego = new JuegoPiedraPapelTijera();
    this.botonComenzarVerificar = false;
    let botonPiedra:any = document.getElementById("botonPiedra");
    let botonPapel:any = document.getElementById("botonPapel");
    let botonTijera:any = document.getElementById("botonTijera");
    
    botonPiedra.disabled =false;
    botonPapel.disabled =false;
    botonTijera.disabled =false;
  }


     public generar(eleccion:string)
   {
    //  this.ocultarVerificar = false;
    // this.nuevoJuego.resultado= this.nuevoJuego.Jugar(eleccion);
     
    // this.MostarMensaje(this.nuevoJuego.resultado, this.nuevoJuego.gana);
    // console.log(this.nuevoJuego.gana);
    this.nuevoJuego.jugador=sessionStorage.getItem('user');
    this.nuevoJuego.intentos = this.intentos+1;
    this.intentos=0;
        
        
      
    this.nuevoJuego.intentos = this.intentos;
  
    console.log("usuario " + eleccion);
    console.log(this.nuevoJuego.resultado);
  this.nuevoJuego.guardarLocal();
  
  //Despues de verificar si gane o no, reinicio el juego!!
   }


  generarPartida(eleccionAux:number) {
    //this.audio = new Audio('demo');
    //this.sonido("../../../assets/PPT/sonido/PPT.ogg");
    let botonPiedra:any = document.getElementById("botonPiedra");
    let botonPapel:any = document.getElementById("botonPapel");
    let botonTijera:any = document.getElementById("botonTijera");
    
    botonPiedra.disabled =true;
    botonPapel.disabled =true;
    botonTijera.disabled =true;

    if(this.bSonido==true)
    {
      this.sonido("../../../assets/PPT/sonido/PPT.ogg");
    }
    

    setTimeout( () => {
      this.botonComenzarVerificar = false;
      this.labelPuntos = true;
      this.labelGanaste =false;
      this.labelPerdiste =false;
      this.nuevoJuego.asignarPPT(eleccionAux);
      this.elecccionJugador = eleccionAux;
      this.eleccionMalo = this.nuevoJuego.eleccionRandom;
      this.nuevoJuego.verificar();
      this.resultados();
    }, 2000 );
    

    
   
  }
  sonido(pathAudio:string){
    this.audio.src = pathAudio;
    this.audio.play();
    // this.audio.remove();
    // this.audio.pause();
    // this.audio.src = pathAudio;
    // this.audio.play();
  }

  activarSonido()
  {
    this.bSonido = true;
  }

  desactivarSonido()
  {
    this.bSonido = false;
  }

  //FALTA TERMINAR EL OCULTAR SONIDO


  resultados(){
    //this.nuevoJuego.respuesta = animalSeleccionado;
    if (this.nuevoJuego.verificar() ==null) {
      this.MostarMensaje("Empate!!!",null);
    }
    if (this.nuevoJuego.verificar() ==true) {
      this.puntos ++;
      if (this.puntos == 3) {
        this.nuevoJuego.gano =true;
        this.nuevoJuego.jugador=sessionStorage.getItem('user');
        this.enviarJuego.emit(this.nuevoJuego);
        this.botonComenzarVerificar = false;
        this.labelGanaste =true;
        this.labelPuntos = false;
        this.puntosRival =0;
        this.puntos=0;
        this.nuevoJuego = new JuegoPiedraPapelTijera();
      }
      // if (this.puntosRival > 0) {
      //   this.puntosRival --
      // }
      this.MostarMensaje("Ganaste!!! +1",true);
    }
    if (this.nuevoJuego.verificar() ==false) {
      this.puntosRival ++;
      if (this.puntosRival == 3) {
        this.nuevoJuego.gano =false;
        this.enviarJuego.emit(this.nuevoJuego);
        this.botonComenzarVerificar = false;
        this.labelPerdiste =true;
        this.labelPuntos = false;
        this.puntosRival =0;
        this.puntos=0;
        this.nuevoJuego = new JuegoPiedraPapelTijera();
        
      }
      // if (this.puntos > 0) {
      //   this.puntos --;
      // }
      this.MostarMensaje("Perdiste!!! -1",false);
    }

  }

  MostarMensaje(mensaje:string="este es el mensaje",ganador:boolean) {
    this.Mensajes=mensaje;
    this.mostrarGif = false;    

    let errorEmail = document.getElementById("msjPuntos");
    let resultado1:any = document.getElementById("resultado1");
    let resultado2:any = document.getElementById("resultado2");

    let botonPiedra:any = document.getElementById("botonPiedra");
    let botonPapel:any = document.getElementById("botonPapel");
    let botonTijera:any = document.getElementById("botonTijera");
    
    botonPiedra.disabled =true;
    botonPapel.disabled =true;
    botonTijera.disabled =true;



    if(ganador==true){
        errorEmail.innerHTML = (`<h1 id='msjPuntos'><kbd class= label-success>${mensaje} <i class="far fa-smile"></i> </kbd></h1>`);
        resultado1.src = `../../../assets/PPT/img/a${this.elecccionJugador}.png`;
        resultado2.src = `../../../assets/PPT/img/m${this.eleccionMalo}.png`;
        this.sonido("../../../assets/PPT/sonido/ganastePPT.ogg");
        this.nuevoJuego.gano= true;
        this.nuevoJuego.jugador=sessionStorage.getItem('user');
        this.nuevoJuego.guardarLocal();
        
      }
    if(ganador==false) {
      errorEmail.innerHTML = (`<h1 id='msjPuntos'><kbd class= label-danger>${mensaje} <i class="far fa-frown"></i></kbd></h1>`);
      resultado1.src = `../../../assets/PPT/img/a${this.elecccionJugador}.png`;
      resultado2.src = `../../../assets/PPT/img/m${this.eleccionMalo}.png`;
      this.sonido("../../../assets/PPT/sonido/perdistePPT.ogg");
      this.nuevoJuego.gano= false;
      this.nuevoJuego.jugador=sessionStorage.getItem('user');
      this.nuevoJuego.guardarLocal();
      
      }
    if (ganador==null) {
      errorEmail.innerHTML = (`<h1 id='msjPuntos'><kbd class= label-warning>${mensaje} <i class="far fa-meh"></i></kbd></h1>`);
      resultado1.src = `../../../assets/PPT/img/a${this.elecccionJugador}.png`;
      resultado2.src = `../../../assets/PPT/img/m${this.eleccionMalo}.png`;
      this.sonido("../../../assets/PPT/sonido/empatePPT.ogg");
      
    }

    var modelo=this;
     setTimeout( () => {
      // errorEmail.className = errorEmail.className.replace("show", "");
      errorEmail.innerHTML = "";
      resultado1.src = "";
      resultado2.src = "";
    }, 2000 );

    setTimeout( () => {
      this.mostrarGif = true
      botonPiedra.disabled =false;
      botonPapel.disabled =false;
      botonTijera.disabled =false;
    }, 2500 );
  
   } 

  

  ngOnInit() {
  }

}