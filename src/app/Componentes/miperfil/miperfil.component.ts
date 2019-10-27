import { Component, OnInit } from '@angular/core';


import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthService} from "src/app/services/auth.service"
import { Input} from '@angular/core';
import{User} from 'src/app/clases/user';
import { MatDialog } from '@angular/material';
import {LoginComponent} from 'src/app/Componentes/login/login.component'
import {ProfileService} from "src/app/services/profile.service"

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {
  public interval;
  public userProfile: any;
  public birthDate: Date;
  public perfil:string;

  constructor(private AFauth : AngularFireAuth,public auth:AuthService, private router : Router, private db : AngularFirestore, private profileService: ProfileService,    public dialog: MatDialog
    ) {

      
    //  this.interval = setInterval(() => this.Detectar(), 1000);
      this.Detectar();
      console.log( "el userProfile es:");
  console.log( this.userProfile);

  }//fin constructor


  ngOnInit() {


  }
  Detectar(){
    console.log("detectando perfil");
    
        this.profileService
      .getUserProfile()
      .get()
      .then( userProfileSnapshot => {
        this.userProfile = userProfileSnapshot.data();
        // console.log(this.userProfile);
        //this.birthDate = userProfileSnapshot.data().birthDate;
        this.perfil= userProfileSnapshot.data().perfil;
        console.log(this.perfil);

      });
  }

  
}
