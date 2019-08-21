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
             alert("entro");
             this.router.navigate(['/principal'] );
        },
        error => {
        alert("Error: los datos no son correctos");
        }
      );
    }
  
 
  usuario(tipo)
  {
    if(tipo=="ADMIN")
    {
      this.email="admin@admin.com";
      this.password="123456";

    }
    else
    {
      this.email="visita@visita.com";
      this.password="123456";
    }
  }
}
