import { Component, OnInit } from '@angular/core';
import { MiservicioPrincipalService } from 'src/app/services/miservicioPrincipal/miservicio-principal.service';

@Component({
  selector: 'app-altausuario',
  templateUrl: './altausuario.component.html',
  styleUrls: ['./altausuario.component.css']
})
export class AltausuarioComponent implements OnInit {

  id:any;
  nombre:any;
  mail:any;
  perfil:any;
  pass:any;
  constructor( public usuarioserv:MiservicioPrincipalService) { }

  ngOnInit() {
  }

  crearUsuario(
  
  ): void {

    if (
      this.nombre == null||
      this.mail === null ||
      this.perfil === null ||
      this.pass === null ||
      this.id === null 
    ) {
      alert("Complete todos los campos");
      return;
    }
    //this.loading = true;

    this.usuarioserv
      .crearusuario(this.id,this.nombre,this.mail, this.perfil, this.pass )
      .then(() => {
        // this.router.navigateByUrl('comida-list');
        alert("guardada");
      });

      this.usuarioserv.signupUser(this.mail,this.pass,this.perfil);
  }

}
