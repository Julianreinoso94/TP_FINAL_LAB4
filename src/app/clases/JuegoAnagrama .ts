
import { Juego } from '../clases/juego';


export class JuegoAnagrama extends Juego {

    palabraOrdenada:string;
    palabraIngresada:string;
    palabraDesordenada:string;

    constructor(nombre?: string, gano?: boolean, jugador?:string, intentos?:any,resultado?:string) {
        super(nombre, gano,jugador, intentos, resultado);  
        this.nombre="Anagrama";
      }


      arrayDePalabras : Array <any >= [
        { ordenada:"Saco",desordenada:"Cosa" },
        { ordenada:"Alicante",desordenada:"Caliente" },
        { ordenada:"Frase",desordenada:"Fresa" },
        { ordenada:"Amor",desordenada:"Roma" },
        { ordenada:"Delira",desordenada:"Lidera" },
        { ordenada:"Pedro",desordenada:"Poder" },
        { ordenada:"Resto",desordenada:"Retos" },
        { ordenada:"Trata",desordenada:"Tarta" },
        { ordenada:"Toro",desordenada:"Roto" },
        { ordenada:"Cronista",desordenada:"Cortinas" },
        { ordenada:"Eva",desordenada:"Ave" }

    ];

    public asignarPalabra() {       
        let indice;
        indice =Math.floor(Math.random() * this.arrayDePalabras.length);
        console.log(this.arrayDePalabras[indice]["ordenada"]);
        this.palabraDesordenada=this.arrayDePalabras[indice]["desordenada"];
        this.palabraOrdenada=this.arrayDePalabras[indice]["ordenada"];
    }


    verificar(){
        if(this.palabraIngresada.toLowerCase() == this.palabraOrdenada.toLowerCase())
        {
        this.gano = true;
         }
        if (this.gano) {
            return true;
            } else {
            return false;
            }
                return false;
            }
}