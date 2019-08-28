import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:any
  password:any;
  tipousuario;
   constructor(         private router: Router,
     private authService: AuthService
     ) { }
 
   ngOnInit() {
   }
 
   async loginUser(): Promise<void> {
 
     if (
       this.email == null||
       this.password === null
     ) {
       return;
     }
 
       const email = this.email;
       const password = this.password;
 
       this.authService.login(email, password).then(() => {
              // alert("entro");
              this.router.navigate(['/home'] );
         },
         error => {
         alert("Error: los datos no son correctos");
         }
       );
     }
   
  
   usuario(valor)
   {

     if(valor == "Administrador")
     {
       this.email="admin@admin.com";
       this.password="123456";
 
     }
     if(valor=="Odontologo1")
    {
      this.email="odontologo1@odontologo1.com";
      this.password="123456";

    }
    if(valor=="Odontologo2")
    {
      this.email="odontologo2@odontologo2.com";
      this.password="123456";

    }
    if(valor=="PacienteA")
    {
      this.email="pacientea@pacientea.com";
      this.password="123456";

    }
    if(valor=="PacienteB")
    {
      this.email="pacienteb@pacienteb.com";
      this.password="123456";

    }
    if(valor=="Recepcionista")
    {
      this.email="recepcionista@recepcionista.com";
      this.password="123456";

    }
   }
 }
 