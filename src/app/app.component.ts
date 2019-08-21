import { Component } from '@angular/core';
import { Alumno } from '../app/clases/alumno';
import { Profesor } from './clases/profesor';
import * as firebase from 'firebase/app';
import { environment, firebaseConfig } from '../environments/environment';
import { MiservicioPrincipalService } from './services/miservicioPrincipal/miservicio-principal.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public profileService: MiservicioPrincipalService,public router: Router) {
  }
  public userProfile: any;
  public birthDate: Date;
  public perfil:string;
  // public valor="hola";
  price: any = '';


  ngOnInit() {
    this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        // console.log(this.userProfile);
        this.birthDate = userProfileSnapshot.data().birthDate;
        this.perfil= userProfileSnapshot.data().perfil;
      });
    //  console.log(this.userProfile.perfil);
alert(this.perfil);
  }

  logout(){
    this.profileService.logoutUser();
    this.router.navigate(['/login'] );

  }

}
