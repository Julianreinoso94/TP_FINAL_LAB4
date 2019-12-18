import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, Params } from '@angular/router';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import{TurnosService} from 'src/app/services/turnos.service'
import{HistoriaClinicaService} from 'src/app/services/historiaClinicaservice'



//DETECTAR USUARIO
import { Observable } from 'rxjs';
import {ProfileService} from "src/app/services/profile.service"
import {AuthService} from 'src/app/services/auth.service'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


class Turnos {

  diaTurno: String;
  cliente: String;
  consultorio: String;
  especialidad: String;
  estado: String;

  horaTurno: String;
  numTurno: String;
  profesional:String;

  // ingresarperfil=false;


  constructor(diaTurno:String,cliente:String,consultorio:String,especialidad:String,estado:String,horaTurno:String,numTurno:String,profesional:string )
  {
    this.diaTurno=diaTurno;
    this.cliente=cliente;
    this.consultorio=consultorio;
    this.especialidad=especialidad;
    this.estado=estado;
    this.horaTurno=horaTurno;
    this.numTurno=numTurno;
    this.profesional=profesional;

  }
}

@Component({
  selector: 'app-ver-turnos-paciente',
  templateUrl: './ver-turnos-paciente.component.html',
  styleUrls: ['./ver-turnos-paciente.component.css']
})
export class VerTurnosPacienteComponent implements OnInit {
  turnos : any;
  public fechaHoy =  new Date();
  ageValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  codigoTurno:any;
  historiaClinica:any;
  listadomisTurnos:any;
  turno:any;

  mostrarHistoriaClinica=true;

  //DETECTAR USUARIO
  isLoggedIn$: Observable<boolean>;
  usrName = '';
  Logueado= false;
  public userProfile: any;
  public email:any;
  public birthDate: Date;
  public perfil:string;
  uidUsuario:any;
  public currentUser: firebase.User;

  constructor(public firebaseService: TurnosService,private profileService: ProfileService, public historiaservice:HistoriaClinicaService,
    private authprofile: AuthService,public auth:AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
     ///////////////////////////////////////////////////////////////////////////////////////////////observable
     this.isLoggedIn$ = this.auth.isLoggedIn;
     console.log(this.isLoggedIn$)
     this.isLoggedIn$.subscribe(res => {
       if(res){
         this.setUsrName()
       }
     });

  }

  getData(){
    this.firebaseService.TraerTurnosDentista().subscribe(data => {
      
      this.turnos = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          codigo: e.payload.doc.data()['codigo'],
          estado: e.payload.doc.data()['estado'],
          profesional: e.payload.doc.data()['profesional'],
          consultorio: e.payload.doc.data()['consultorio'],
          cliente: e.payload.doc.data()['cliente'],
          especialidad: e.payload.doc.data()['especialidad'],
          horaTurno: e.payload.doc.data()['horaTurno'],
          DiaTurno: e.payload.doc.data()['DiaTurno'],
          numTurno: e.payload.doc.data()['numTurno'],
        
        };
      })
      console.log(this.turnos);
    });
  }
  

  habilitarTurno(codigo){
    console.log(codigo);

    this.firebaseService.cambiarEstado(codigo,"Presente");
  }


  cancelarTurno(codigo){
    console.log(codigo);

    this.firebaseService.cambiarEstado(codigo,"Ausente");
  }

 

  guardarHistoriaClinica(val,profesional){
    this.mostrarHistoriaClinica=false;
    console.log(val);
   // "uid","DiaTurno","descripcion","profesional"
    this.historiaservice.createHistoriaClinica(val,this.fechaHoy.toString(),this.historiaClinica,profesional);
  }


  Detectar(){
    // this.Logueado=true;
 console.log("entro a detectar");
         this.profileService
       .getUserProfile()
       .get()
       .then( userProfileSnapshot => {
         this.userProfile = userProfileSnapshot.data();
      
         //this.birthDate = userProfileSnapshot.data().birthDate;
         this.perfil= userProfileSnapshot.data().perfil;
         this.email= userProfileSnapshot.data().email;

         //console.log(this.perfil);
 
       });
 
       firebase.auth().onAuthStateChanged(user => {
  
         this.currentUser = user;
         this.uidUsuario = user.uid
        });
     this.mostrarTurnos();
 
   }
   setUsrName(){
   // let usr = this.auth.getCurrentUser();
     //this.usrName = usr.email;
     this.Detectar();
   }
  
   usuarioes()
   {
    //  alert(this.userProfile);

    //  alert(this.uidUsuario);
   }


   mostrarTurnos()
   {
    // alert( this.userProfile);

    //  alert("");
    this.listadomisTurnos= [];

    this.turnos.forEach(item => {///////////////////////////primer foreach

            

      // if(item.profesional == this.uidUsuario ) 
      // {
        this.turno = new Turnos(item.diaTurno,item.cliente,item.DiasDeTrabajo,item.consultorio,item.especialidad,item.horaTurno,item.numTurno,item.profesional);
        //     this.listadoespecialistaspordia.push(this.profesional);
          //   this.listadoFinal.push(this.profesional);

          console.log(this.turno);
        this.listadomisTurnos.push(this.turno);         
      //      }
      // else
      // {
      //   //ESPECIALISTA EN TURNO LIBRE
       
      // }
   });
  
   }

}
