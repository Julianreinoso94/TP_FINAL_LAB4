import { Juego } from '../clases/juego';


export class Tateti extends Juego{

    
    posiciones: Array<any>;
    juega:string;
    i:number;
    j:number;
    jugadas:number;

    constructor(nombre?: string, gano?: boolean, jugador?:string, intentos?:any,resultado?:string) {
        super(nombre, gano,jugador, intentos, resultado);  
        this.nombre = "Tateti";
      }

      generarTateti()
      {
        this.posiciones = [['-','-','-'],
        ['-','-','-'],
        ['-','-','-']];
        this.juega = 'O';
        this.jugadas = 5;
        
      }

      reiniciar() {
        this.generarTateti();
        
        
      }

      generarAleatorio()
      {
        this.i = Math.floor((Math.random() * 3) +0);
        this.j = Math.floor((Math.random() * 3) +0);
      }

      validar()
      {
          if(this.posiciones[this.i][this.j] != "-")
            return true;
        return false;
      }


      eleccionMaquina()
      {
        do{
            this.generarAleatorio();
            console.log("i: " + this.i + " j: " + this.j);
        }while(this.validar() && this.jugadas>1);
        this.posiciones[this.i][this.j] = this.juega;
        this.jugadas-=1;
        console.log(this.jugadas);
      }

      


      cambiarJugador() {
        if (this.juega=='O')
        {
          this.juega='X';
          
        }
          else
          this.juega='O';    
      }


      
      

    verificar(){
        return true;
    }



}