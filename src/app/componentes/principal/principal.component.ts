import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/services/miservicioPrincipal/miservicio-principal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  public userProfile: any;
  public birthDate: Date;
  public perfil:string;
  // public valor="hola";
  price: any = '';
constructor(public profileService:MiservicioPrincipalService, private router: Router){}

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
// alert(this.perfil);
  }

  tateti()
  {
    this.router.navigate(['/tateti'] );

  }
  ppt()
  {
    this.router.navigate(['/ppt'] );

  }
  adivina()
  {
    this.router.navigate(['/adivinanum'] );

  }
  agilidad()
  {
    
      this.router.navigate(['/agilidad'] );
  
    
  }
  anagrama()
  {
    this.router.navigate(['/anagrama'] );

  }
  preguntas()
  {
    this.router.navigate(['/preguntas'] );

  }

}
