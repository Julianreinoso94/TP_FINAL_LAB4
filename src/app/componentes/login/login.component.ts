import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Input ,Output,EventEmitter } from '@angular/core';
import{User} from 'src/app/clases/user';

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
  
  tipousuario;
  nuevouser:User;

  public userProfile: any;
  public birthDate: Date;
  @Output() usuarioSeleccionado: EventEmitter<any>= new EventEmitter<any>(); 


   constructor(private router: Router,private authService: AuthService) { }
 
   ngOnInit() {
   }
 
   async loginUser(): Promise<void> {
    this.perfil= "Supervisor";

     if (
       this.email == null||
       this.password === null
     ) {
       return;
     }
 
       const email = this.email;
       const password = this.password;
 
       this.authService.login(email, password).then(() => {

        this.authService
        .getUserProfile()
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          // console.log(this.userProfile);
          this.birthDate = userProfileSnapshot.data().birthDate;
          this.perfil= userProfileSnapshot.data().perfil;
        });
  this.nuevouser=new User(this.userProfile.perfil,this.userProfile.email);
              // alert("entro");
              this.usuarioSeleccionado.emit(this.nuevouser);
              this.router.navigate(['/home'] );
         },
         error => {
         alert("Error: los datos no son correctos");
         }
       );
     }


    //  mostrarDetalles()
    //  {
    //    console.log("tabla");
    //    this.usuarioSeleccionado.emit(this.user);
    //  }
   
  
   usuario(valor)
   {

     if(valor == "Administrador")
     {
       this.email="JULIAN@GMAIL.COM";
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
      this.email="MIA@GMAIL.COM";
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
 