

import { Juego } from '../clases/juego';

export class JuegoPiedraPapelTijera extends Juego {

    elecccionJugador:number =0;
    eleccionRandom:number =0;
    resultado:boolean;

    constructor(nombre?: string, gano?: boolean, jugador?:string, intentos?:any,resultado?:string) {
        //super("Piedra-Papel-Tijera",gano,jugador);
        super(nombre, gano,jugador, intentos, resultado);
        //this.jugador =localStorage.getItem("jugador");
        this.nombre = "Piedra, Papel o Tijera";
      }

      /*
          constructor(nombre?: string, gano?: boolean, jugador?:string, intentos?:any,resultado?:string) {
        super(nombre, gano,jugador, intentos, resultado);  
        this.opcionMaquina = null;
        this.nombre = "Piedra, Papel o Tijera";
          }
      */

      arrayPalabras : Array <any> = [
        {palabra: "pierda",id:1},
        {palabra: "papel",id:2},
        {palabra: "tijera",id:3},
    ];

      public asignarPPT(eleccionAux:number) {       
        let random = Math.floor(Math.random() * this.arrayPalabras.length);
        this.eleccionRandom = this.arrayPalabras[random].id;
        this.elecccionJugador = eleccionAux;

        

        //console.log(idAux);
        // for (var i = 0; i < this.arrayPalabras.length; ++i) {
        // 	if (this.arrayPalabras[i].id == idAux) {
        // 		console.log(this.arrayPalabras[i]);
        // 	}
        // }

    }



    public verificar(): boolean {
        switch (this.elecccionJugador) {
            case 1:
                if (this.eleccionRandom == 1) {
                  this.resultado = null;
                }
                if (this.eleccionRandom == 2) {
                  this.resultado = false;
                }
                if (this.eleccionRandom == 3) {
                  this.resultado = true;
                }
              break;
            case 2:
                if (this.eleccionRandom == 1) {
                    this.resultado = true;
                }
                if (this.eleccionRandom == 2) {
                    this.resultado = null;
                }
                if (this.eleccionRandom ==3) {
                    this.resultado = false;
                }
              break;
            case 3:
                if (this.eleccionRandom == 1) {
                    this.resultado = false;
                }
                if (this.eleccionRandom == 2) {
                    this.resultado = true;
                }
                if (this.eleccionRandom == 3) {
                    this.resultado = null;
                }
              
              break;
          }
        return this.resultado;

    }
}