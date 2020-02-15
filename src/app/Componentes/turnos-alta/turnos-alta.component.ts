import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import{TurnosService} from 'src/app/services/turnos.service'
import { ImageService } from 'src/app/services/image.service';
import { useAnimation } from '@angular/animations';
import { from } from 'rxjs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AuthService} from 'src/app/services/auth.service'
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';


//DETECTAR USUARIO
import { Observable } from 'rxjs';
import {ProfileService} from "src/app/services/profile.service"


import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

export const MY_FORMATS = {
  display: {
    dateInput: 'DD-MM-YYYY'
  },
};

class profesional {
  age: String;
  avatar: String;
  DiasDeTrabajo: String;
  especialidad: String;
  name: String;

  surname: String;
  uidProfesional:String;

  ingresarperfil=false;

//DETECTAR USUARIO
  isLoggedIn$: Observable<boolean>;
  usrName = '';
  Logueado= false;
  public userProfile: any;
  public birthDate: Date;
  public perfil:string;

  constructor(age:String,avatar:String,DiasDeTrabajo:String,especialidad:String,name:String,uidProfesional:String )
  {
    this.age=age;
    this.avatar=avatar;
    this.DiasDeTrabajo=DiasDeTrabajo;
    this.especialidad=especialidad;
    this.name=name;
    this.uidProfesional=uidProfesional;

  }
}

@Component({
  selector: 'app-turnos-alta',
  templateUrl: './turnos-alta.component.html',
  styleUrls: ['./turnos-alta.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})


export class TurnosAltaComponent  implements OnInit {

  public clientes:any;
   contador:any;
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
  especialidades = [];
  imageUrl2;
  DiaTurno;
  profesional;
  consultorio;
  picker:any;
  fechatotal;
  allTechnologies = [
     '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
     '14:30', '15:00', '16:00', '16:30', '17:00', '17:30', '18:00'
] 
consultorios = [
  '1A', '1B', '1C'
]


public fotoespecialistElegido:String;
 public nombreEspecialistaelegido:String;
 public uidProfesional:String;
 public mostrarbotonSeleccionar=false;
  events: string[] = [];
  profesionales : any;
  horaTurno;
  turnos : any;
  ageValue: number = 0;
  searchValue: string = "";
  
  
  listadoespecialistas: Array<profesional>;
  listadoespecialistaspordia: any;
   filtrarlistaporespecialidad:any;
   listadoespecialistasconTurnos:any;
   listadoFinal: Array<any>=[];
   profesional1:profesional;

  cliente;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  mostrarListado=false;
  mostrarEspecialistaelegido=false;
  mostrarListadoFinal=false;

  especialidadesTurno = [
   'Odontologo',
    'Odontopediatría',
    'Implantólogo'		 
] 
usuarioactual:any;

public currentUser: firebase.User;
uidUsuario:any;
ocultarPrimerListado=false;
isLoggedIn$: Observable<boolean>;
usrName = '';
Logueado= false;
public userProfile: any;
public perfil:string;
public email:String;

 
// constructor(private AFauth : AngularFireAuth,public auth:AuthService, public auth2:AuthGuard, private router : Router, private db : AngularFirestore,
//   ) {

 constructor(private storage: AngularFireStorage,  private authprofile: AuthService,public auth:AuthService,
  private fb: FormBuilder,private servicioProfesionales: abmProfesionales, private profileService: ProfileService,
  public dialog: MatDialog,
  private router: Router,
  public firebaseService: TurnosService,private service: ImageService
) {



  this.createForm();


  this.traerprofesional();
  this.traerturnos();

       ///////////////////////////////////////////////////////////////////////////////////////////////observable
       this.isLoggedIn$ = this.auth.isLoggedIn;
       console.log(this.isLoggedIn$)
       this.isLoggedIn$.subscribe(res => {
         if(res){
           this.setUsrName()
         }
       });
  

 }
 
 async traerturnos()
 {
   this.firebaseService.getTurnos().subscribe(data => {

     this.turnos = data.map(e => {
       return {
         id: e.payload.doc.id,
         DiaTurno: e.payload.doc.data()['DiaTurno'],
         apellidoPaciente: e.payload.doc.data()['apellidoPaciente'],
         horaTurno: e.payload.doc.data()['horaTurno'],
         nombrePaciente: e.payload.doc.data()['nombrePaciente'],
         profesional: e.payload.doc.data()['profesional'],
         email: e.payload.doc.data()['email'],


       };
     })

     
  
   });
   return this.turnos;
 }
 async traerprofesional()
 {
   this.servicioProfesionales.getUsers().subscribe(data => {
 
     this.profesionales = data.map(e => {
       return {
         id: e.payload.doc.id,
         name: e.payload.doc.data()['name'],
         avatar: e.payload.doc.data()['avatar'],
         especialidad: e.payload.doc.data()['especialidad'],
         horario: e.payload.doc.data()['horario'],
         diasDeTrabajo: e.payload.doc.data()['diasDeTrabajo'],
         surname: e.payload.doc.data()['surname'],
         uid: e.payload.doc.data()['uid'],
     
       };
     })
 
     
  
   });

   return this.profesionales;
 }
 
 createForm() {
  this.exampleForm = this.fb.group({
    nombrePaciente: ['', Validators.required ],
//    apellidoPaciente: ['', Validators.required ],
    cliente: this.uidUsuario,
    DiaTurno: this.fechatotal,
    horaTurno: this.horaTurno,
    profesional: ['', Validators.required ],
    consultorio: "3F",
    especialidad: ['', Validators.required ]
  });
}




resetFields(){
  this.avatarLink = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
  this.exampleForm = this.fb.group({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    especialidad : new FormControl('', Validators.required),

  });

  this.imgSrc = '/assets/img/image_placeholder.jpg';
  this.selectedImage = null;
  this.isSubmitted = false;
}


 ngOnInit() {
  
       ///////////////////////////////////////////////////////////////////////////////////////////////observable
       this.isLoggedIn$ = this.auth.isLoggedIn;
       console.log(this.isLoggedIn$)
       this.isLoggedIn$.subscribe(res => {
         if(res){
           this.setUsrName()
         }
       });
  


}





  

  ////////////////////////imagen
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '/assets/imagenes/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  onSubmit(value){
    console.log("_________________________________________");
    console.log(this.usuarioactual);
    console.log(this.nombreEspecialistaelegido);

    this.firebaseService.createTurno(this.nombreEspecialistaelegido,this.uidUsuario,value,this.fechatotal,this.makeRandom(),this.email,this.uidProfesional,this.fechatotal)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

   makeRandom() {
    var lengthOfCode = 5;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let text = "";
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
      return text;
  }



  
 eventoCalendario(type: string, event: MatDatepickerInputEvent<Date>) {
   
  //this.datosCliente();
  this.mostrarListado=true;
  this.mostrarListadoFinal=false;
  this.events.push(`${event.value}`);

 var fecha= this.events.toString();
 var fechavalidacion = parseInt(fecha);
var fechaHoy = parseInt( Date.now().toString())

//  alert(fechavalidacion);
//  alert(fechaHoy);

 if(fechavalidacion < fechaHoy)
 {
  alert("la fecha debe ser mayor");
 }

 this.fechatotal=fecha;
 //console.log("esta es l fecha"+fecha);
 //var fechaAdate =Date.parse(this.event);
 var valor=event.value.toString().split(" ",1);
 var color: string;

 

switch (valor.toString()) {
  case "Mon":
      var buscrcomo= "Lunes,Miercoles,Viernes";
      this.especialistaPorDia(buscrcomo);
  break;
  case "Tue":
   var buscrcomo= "Martes,Jueves";
   this.especialistaPorDia(buscrcomo);
   break;
  case "Wed":
      var buscrcomo= "Lunes,Miercoles,Viernes";

    this.especialistaPorDia(buscrcomo);
  //  this.compararFecha();
    break;
  case "Thu":
      var buscrcomo= "Martes,Jueves";

    this.especialistaPorDia(buscrcomo);
    break;
  case "Fri":
      var buscrcomo= "Lunes,Miercoles,Viernes";

    this.especialistaPorDia(buscrcomo);
    break;
    case "Sat":
        var buscrcomo= "Jueves,Sabados";

      this.especialistaPorDia(buscrcomo);
      break;
  default:
   // confirm("Sorry, that color is not in the system yet!");
}


  
  this.events.length=0;
}



especialistaPorDia (dia: String)///////////////////////////////////////////////////////////CLASIFICA POR DIA
{
       this.listadoespecialistaspordia = [];

        
       this.filtrarlistaporespecialidad.forEach(element => {
       console.log(element.diasDeTrabajo)
       console.log(dia);
         if(element.diasDeTrabajo == dia)
         {
            this.profesional = new profesional(element.age,element.avatar,element.DiasDeTrabajo,element.especialidad,element.name,element.uid);
           this.listadoespecialistaspordia.push(this.profesional);
         }
         });
  
}

  
 filtrarEspecialidad(){

  this.filtrarlistaporespecialidad = [];


  this.profesionales.forEach(element => {
  
    if(element.especialidad == this.especialidades)
    {
      this.filtrarlistaporespecialidad.push(element);
    }
    });

 }






          seleccionandoHoraDeturnoOLD()//AL CAMBIAR EL HORARIO INGRESA ACA SELECTHORARIO
          {
           // this.datosCliente();

            this.mostrarbotonSeleccionar=true;
            this.mostrarListadoFinal=true;

            this.listadoespecialistasconTurnos=[];




            //////////////////////////primer foreach

        
     this.turnos.forEach(element => {
          

              if(element.horaTurno == this.horaTurno && element.DiaTurno == this.DiaTurno.toString())
              {
             // console.log("ya existe un turno en esa fecha");
              }
              else
              {
                //ESPECIALISTA EN TURNO LIBRE
                this.listadoespecialistasconTurnos.push( element.profesional);//
               
              }
           });

              //ultimo foreach

              this.listadoespecialistasconTurnos.forEach(element => {///////////////////////////primer foreach
               
                this.listadoespecialistaspordia.forEach(item => {

                if(item.name ==  element)
                {
                  this.profesional = new profesional(item.age,item.avatar,item.DiasDeTrabajo,item.especialidad,item.name,item.uid);
             //     this.listadoespecialistaspordia.push(this.profesional);
                  this.listadoFinal.push(this.profesional);
                  console.log("agregoAllistadofinal");
                }
             

              });
             });


          }


          seleccionandoHoraDeturno()//AL CAMBIAR EL HORARIO INGRESA ACA SELECTHORARIO
          {
            this.mostrarListado=false;
            this.listadoFinal.length=0;
           // this.datosCliente();

            this.mostrarbotonSeleccionar=true;
            this.mostrarListadoFinal=true;

      this.listadoespecialistasconTurnos=[];
            //this.listadoespecialistasconTurnos;
            // console.log("this.listadoespecialistasconTurnos");

            // console.log(this.listadoespecialistasconTurnos);
            console.log(this.listadoespecialistasconTurnos);

            this.listadoespecialistaspordia.forEach(element => {
              this.turnos.forEach(item => {///////////////////////////primer foreach

            
              
   

              if(item.horaTurno == this.horaTurno && item.DiaTurno == this.DiaTurno.toString() && element.name == item.profesional ) 
              {
                this.profesional = new profesional(item.age,item.avatar,item.DiasDeTrabajo,item.especialidad,item.profesiona,item.uid);
                //     this.listadoespecialistaspordia.push(this.profesional);
                  //   this.listadoFinal.push(this.profesional);

                this.listadoespecialistasconTurnos.push(this.profesional);         
                   }
              else
              {
                //ESPECIALISTA EN TURNO LIBRE
               
              }
           });
          });

        //  console.log(this.listadoespecialistasconTurnos);

          //SEGUNDO FOR TOMA LOS ESPECIALISTAS POR DIA QUE NO ESTAN RESERVADOS
          console.log(this.listadoespecialistaspordia);
          console.log( this.listadoespecialistasconTurnos);

          this.listadoespecialistaspordia.forEach(element => {
              this.listadoespecialistasconTurnos.forEach(item => {///////////////////////////primer foreach

            
              
   
              console.log(item.name);
              console.log(element.name);
              if(element.name == item.name ) 
              {

                   }
              else
              {
                //ESPECIALISTA EN TURNO LIBRE
                this.listadoFinal.push( element);         

              }
           });
          });

          if(this.listadoespecialistasconTurnos.length == 0)
          {
            console.log("entor");
            this.listadoespecialistaspordia.forEach(element => {

            
              
                
                //ESPECIALISTA EN TURNO LIBRE
                this.listadoFinal.push( element);         

           
         
          });
          }
   



          }

      
   


         viewDetails(item)
         {

          // filtro la lista por especialidad y  por dia (lunes, martes ) 
          // y lo guardo en una nueva lista (a) listadoespec
          //3 selecciono el horario y que consulte en turnos si algun especialista a esa hs tiene turno.. si tiene
          //(B)guardo en una tercera lista los especialistas que no estan ocupados y muestro el boton seleccionar

           this.mostrarListado=false;
           this.mostrarListadoFinal=false;
           this.mostrarEspecialistaelegido=true;

           this.fotoespecialistElegido= item.avatar;
           this.nombreEspecialistaelegido=item.name;
           this.uidProfesional=item.uidProfesional;

        
         }


    
         Detectar(){
         // this.Logueado=true;
      console.log("entro a detectar");
              this.profileService
            .getUserProfile()
            .get()
            .then( userProfileSnapshot => {
              this.userProfile = userProfileSnapshot.data();
               console.log(this.userProfile);
              this.email = userProfileSnapshot.data().email;
              this.perfil= userProfileSnapshot.data().perfil;
              //console.log(this.perfil);
      
            });
      
            firebase.auth().onAuthStateChanged(user => {
       
              this.currentUser = user;
              this.uidUsuario = user.uid});
          // }
      
          console.log(this.currentUser);
          console.log(this.email);

          console.log(this.uidUsuario); 
      
      
        }
        setUsrName(){
        // let usr = this.auth.getCurrentUser();
          //this.usrName = usr.email;
          this.Detectar();
        }
       
        usuarioes()
        {
          // alert(this.userProfile);

          // alert(this.uidUsuario);
        }

         

}
