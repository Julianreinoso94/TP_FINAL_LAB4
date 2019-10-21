import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Input ,Output,EventEmitter } from '@angular/core';
import{User} from 'src/app/clases/user';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { Inject, Optional } from '@angular/core'; 
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  public userProfile: any;
  public birthDate: Date;
  @Output() usuarioSeleccionado: EventEmitter<any>= new EventEmitter<any>(); 
recaptcha: any[];


////////////////////////////////////NUEVA VERSION
validatingForm: FormGroup;

fromPage:string;
fromDialog:string;

   constructor(private formBuilder: FormBuilder, 
      private reCaptchaV3Service: ReCaptchaV3Service
,    private router: Router,private authService: AuthService,
// ,public dialogRef: MatDialogRef<LoginComponent>,
@Optional() @Inject(MAT_DIALOG_DATA) public data: any
) { }

resolved(captchaResponse: any[]){
  this.recaptcha = captchaResponse;
  console.log(this.recaptcha);

}
 
   ngOnInit() {
    this.validatingForm = new FormGroup({
      loginFormModalEmail: new FormControl('', Validators.email),
      loginFormModalPassword: new FormControl('', Validators.required)
    });
 
   }

   async loginUser(): Promise<void> {
    this.router.navigate(['/home'] );
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
       
alert("")
       // alert("entro");
        this.authService
        .getUserProfile()
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          // console.log(this.userProfile);
        //  this.birthDate = userProfileSnapshot.data().birthDate;
         this.perfil= userProfileSnapshot.data().perfil;
        })

  
      })
    
      
    //     this.nuevouser=new User(this.userProfile.perfil,this.userProfile.email);
         alert("entro el user");
         this.usuarioSeleccionado.emit(this.nuevouser);
         // this.closeDialog();
         this.router.navigate(['/home'] );
        //  error => {
        //  alert("Error: los datos no son correctos");
        //  }
    
 
     }
 
   async loginUser2(): Promise<void> {
    this.router.navigate(['/home'] );
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
       

       // alert("entro");
        this.authService
        .getUserProfile()
        .get()
        .then( userProfileSnapshot => {
          this.userProfile = userProfileSnapshot.data();
          // console.log(this.userProfile);
        //  this.birthDate = userProfileSnapshot.data().birthDate;
      //    this.perfil= userProfileSnapshot.data().perfil;
        });
  this.nuevouser=new User(this.userProfile.perfil,this.userProfile.email);
              // alert("entro el user");
              // this.usuarioSeleccionado.emit(this.nuevouser);
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
      this.email="pppp@GMAIL.COM";
      this.password="123456";

    }
    if(valor=="PacienteB")
    {
      this.email="pacienteb@pacienteb.com";
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
   
 }
 