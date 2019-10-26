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
) {


 }

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
      this.email="pppp@gmail.com";
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
   
  loginUser(){
    if (
      this.email == null||
      this.password === null
    ) {
      return;
    }

       const email = this.email;
    //  const email = "mia@gmail.com";
      const password = this.password;
      //const password = "123456";

      this.authService.login(email, password).then(() => {
//alert("entro");
            // this.router.navigate(['/principal'] );
        },
        error => {
        alert("Error: los datos no son correctos");
        }
      );
  }


 }
 