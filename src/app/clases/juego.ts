    
export abstract class Juego {
    public nombre = '';
    public jugador: string;
    public gano = false;
    public id:number;
    public intentos;
    public resultado;
  
    constructor(nombre?: string, gano?: boolean,jugador?:string,
      intentos?:any,resultado?:string) {
      if (nombre)
      {
        /*this.nombre = nombre;
      if (gano)
        this.gano = gano;
      if(jugador)
        this.jugador=jugador;
      else
        this.jugador= "natalia natalia";*/
  
        this.gano = gano;
        this.jugador=jugador;
        this.intentos=intentos;
        this.resultado=resultado;
      }
    }
  
    public guardarLocal(){
      var idstring= localStorage.getItem("Id");
      console.log(idstring);
      if(idstring==null)
       {
         this.id=1;
         localStorage.setItem("Id","1");
       }
       else{
         this.id= +idstring;
         this.id=this.id+1;
         localStorage.setItem("Id",this.id.toString());
       }
      var x = {"nombre":this.nombre,
               "jugador":this.jugador,
               "resultado":this.gano,
               "intentos":this.intentos
                }
   
                localStorage.setItem("partida "+this.id, JSON.stringify(x));
       
       console.log(localStorage.getItem("Id"));
     }
    
  
    public abstract verificar():boolean; 
    
    public retornarAyuda() {
      
      return "NO hay Ayuda definida";
    }
  }