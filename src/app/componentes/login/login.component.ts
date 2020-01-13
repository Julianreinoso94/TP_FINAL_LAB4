import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Input ,Output,EventEmitter } from '@angular/core';
import{User} from 'src/app/clases/user';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { Inject, Optional } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import{EncuestasService} from 'src/app/services/encuestas.service'

import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:any
  psw:any;
  password:any;
  perfil:string;
  something;
  tipousuario;
  nuevouser:User;
  fechaLista:any;
 flag=true;


  public fechaHoy =  new Date();

  public userProfile: any;
  public birthDate: Date;
  fechasTraidas : any;

  @Output() usuarioSeleccionado: EventEmitter<any>= new EventEmitter<any>(); 
recaptcha: any[];




////////////////////////////////////NUEVA VERSION
validatingForm: FormGroup;

fromPage:string;
fromDialog:string;

   constructor(private formBuilder: FormBuilder,     public encuesta: EncuestasService,
      private reCaptchaV3Service: ReCaptchaV3Service
,    private router: Router,private authService: AuthService,

@Optional() @Inject(MAT_DIALOG_DATA) public data: any
) {


 }

resolved(captchaResponse: any[]){
  this.recaptcha = captchaResponse;
  console.log(this.recaptcha);

}
 
   ngOnInit() {
     this.traerFechas();
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
 
   }

   
 



    //  mostrarDetalles()
    //  {
    //    console.log("tabla");
    //    this.usuarioSeleccionado.emit(this.user);
    //  }
   
  
   usuario(valor)
   {
    //  alert("entro seleccio")

     if(valor == "Administrador")
     {
       this.email="JULIAN@GMAIL.COM";
       this.password="123456";
 
     }
     if(valor=="Odontologo1")
    {
      this.email="pedropicapiedra@gmail.com";
      this.password="123456";

    }
    if(valor=="Odontologo2")
    {
      this.email="fabiandiaz@gmail.com";
      this.password="123456";

    }
    if(valor=="PacienteA")
    {
      this.email="pppp@GMAIL.COM";
      this.password="123456";

    }
    if(valor=="PacienteB")
    {
      this.email="pepe@gmail.com";
      this.password="123456";

    }
    if(valor=="Recepcionista")
    {
      this.email="MIA@GMAIL.COM";
      this.password="123456";

    }

   }


   get loginFormModalEmail() {
    return this.validatingForm.get('loginFormModalEmail');
  }

  get loginFormModalPassword() {
    return this.validatingForm.get('loginFormModalPassword');
  }

  // closeDialog(){ 
  //   this.dialogRef.close({event:'close',data:this.fromDialog}); 
  // }
   
  loginUser(){
    // if (
    //   this.email == null||
    //   this.password === null
    // ) {
    //   return;
    // }

       const email = this.email;
    //  const email = "mia@gmail.com";
      const password = this.password;
      //const password = "123456";

      this.authService.login(email, password).then(() => {
        this.authService.isAuthenticated();
this.guardarFechaHoy();
//alert("entro");
            // this.router.navigate(['/principal'] );
        },
        error => {
        alert("Error: los datos no son correctos");
        }
      );
  }

  
  guardarFechaHoy(){


   var fechaHoySplit= this.fechaHoy.toString().split(" ", 3);
   var contador=0;
   console.log(fechaHoySplit);


    this.encuesta.getFechasIngresadas()
  
    this.fechasTraidas.forEach(element => {
  
      if( element.fecha != undefined)
      {
       this.fechaLista=element.fecha.toString(); 
       var fechaLista = this.fechaLista.split(" ", 3)
      console.log(fechaLista);
      }
      
    if(JSON.stringify(fechaLista)==JSON.stringify(fechaHoySplit))
      {
          var contador=element.cantidad;
          

        
           this.flag = false;
//actualizar
        this.encuesta.updateCantidadFecha(element.id,contador+1,this.fechaHoy.toString())

      }
    });
  
     if(this.flag)
     {
      this.encuesta.createFechaInicio(this.fechaHoy.toString());
     }

  }

   //////////////////////nuevo
   private loggedIn = new BehaviorSubject<boolean>(false);
   private loggedOut = new BehaviorSubject<boolean>(true);
 
   get isLoggedIn() {
     return this.loggedIn.asObservable();
   }
 
   get isLoggedOut() {
     return this.loggedOut.asObservable();
   }
 
   public isAuthenticated() {
 
     this.loggedIn.next(true);
     this.loggedOut.next(false);
   }


   async traerFechas()
   {
     this.encuesta.getFechasIngresadas().subscribe(data => {
   
       this.fechasTraidas = data.map(e => {
        console.log("A");
         return {
           id: e.payload.doc.id,
           fecha: e.payload.doc.data()['fecha'],
           cantidad: e.payload.doc.data()['cantidad'],
        
    

         };
       })
   
       
    
     });
    }

 }
 