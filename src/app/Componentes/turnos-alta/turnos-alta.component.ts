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



@Component({
  selector: 'app-turnos-alta',
  templateUrl: './turnos-alta.component.html',
  styleUrls: ['./turnos-alta.component.css']
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
 public mostrarbotonSeleccionar=false;
  events: string[] = [];
  profesionales : any;
  horaTurno;
  turnos : any;
  ageValue: number = 0;
  searchValue: string = "";
  
  
  listadoespecialistas: Array<any>;
  listadoespecialistaspordia: Array<any>=[];
   filtrarlistaporespecialidad:any;
   listadoespecialistasSinTurnos: Array<any>=[];
   listadoFinal: Array<any>=[];


  cliente;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;
  mostrarListado=false;
  mostrarEspecialistaelegido=false;

  especialidadesTurno = [
   'Odontologo',
    'Odontopediatría',
    'Implantólogo'		 
] 
 

 constructor(private storage: AngularFireStorage,  private authprofile: AuthService,
  private fb: FormBuilder,private servicioProfesionales: abmProfesionales,
  public dialog: MatDialog,
  private router: Router,
  public firebaseService: TurnosService,private service: ImageService
) {



  this.createForm();


  this.traerprofesional();
  this.traerturnos();

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
     
       };
     })
 
     
  
   });
   
   console.log("el listado que trae de especialistas es")
   console.log(this.profesionales);
   return this.profesionales;
 }
 
 createForm() {
  this.exampleForm = this.fb.group({
    nombrePaciente: ['', Validators.required ],
    apellidoPaciente: ['', Validators.required ],
    cliente:"this.cliente",
    DiaTurno: this.fechatotal,
    horaTurno: this.horaTurno,
    profesional: ['', Validators.required ],
    consultorio: ['', Validators.required ],
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
  console.log("ngOnInit");


}




 eventoCalendario(type: string, event: MatDatepickerInputEvent<Date>) {
    this.mostrarListado=true;
    this.events.push(`${event.value}`);

   var fecha= this.events.toString();
   this.fechatotal=fecha;
   console.log("esta es l fecha"+fecha);
   var valor=fecha.split(" ",1);

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
      confirm("Sorry, that color is not in the system yet!");
  }

    // console.log(valor);

    // console.log(this.events);
    
    this.events.length=0;
  }


//   validation_messages = {
//    'nombrePaciente': [
//      { type: 'required', message: 'Name is required.' }
//    ],
//    'apellidoPaciente': [
//      { type: 'required', message: 'Surname is required.' }
//    ],
//    'age': [
//      { type: 'required', message: 'Age is required.' },
//    ]
//    ,
   
//    'especialidad': [
//     { type: 'required', message: 'La Especialidad es requirida.' },
//   ]
//  };

 

 



  

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
    this.firebaseService.createTurno(value,this.fechatotal,this.makeRandom())
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


  

  getData(){
    this.firebaseService.getespecialistas()
    .subscribe(result => {
      this.listadoespecialistas = result;
      this.age_filtered_items = result;
      this.name_filtered_items = result;
    })
  }

 

  
 filtrarEspecialidad(){

  this.filtrarlistaporespecialidad = [];


  this.profesionales.forEach(element => {
  
    if(element.especialidad == this.especialidades)
    {
      this.filtrarlistaporespecialidad.push(element);
    }
    });
    console.log("this.filtrarlistaporespecialidad)");
    console.log(this.filtrarlistaporespecialidad);
//this.compararFecha();
//alert("filtro por especialidad ")
 }


   especialistaPorDia (dia: String)///////////////////////////////////////////////////////////CLASIFICA POR DIA
   {
          this.listadoespecialistaspordia = [];

    
          this.filtrarlistaporespecialidad.forEach(element => {
          
            if(element.diasDeTrabajo == dia)
            {
              this.listadoespecialistaspordia.push(element);
            }
            });
            console.log("calendario");
            console.log(this.listadoespecialistaspordia);
        //this.compararFecha();
  }



          seleccionandoHoraDeturno()//AL CAMBIAR EL HORARIO INGRESA ACA SELECTHORARIO
          {
            this.mostrarbotonSeleccionar=true;

            this.listadoespecialistasSinTurnos=[];

            alert(this.especialidades);


            //////////////////////////primer foreach
     this.turnos.forEach(element => {
            
     

              if(element.horaTurno == this.horaTurno && element.DiaTurno == this.DiaTurno)
              {
                alert("ya existe un turno en esa fecha");
              }
              else
              {
                //ESPECIALISTA EN TURNO LIBRE
                this.listadoespecialistasSinTurnos.push( element);
               
              }
           });

              //ultimo foreach

              this.listadoespecialistasSinTurnos.forEach(element => {///////////////////////////primer foreach
            
                this.turnos.forEach(item => {

                if(item.profesional ==  element.name)
                {
                  this.listadoFinal.push(element);
                }
             

              });
             });
             
             console.log(this.listadoFinal);

          }

          // compararFecha()
          // {
            
          //  console.log("la fechaelegida es:"+this.DiaTurno.getTime() );
          //   this.turnos.forEach(element => {
            

          //     if(element.DiaTurno == this.fechatotal)
          //     {
          //       this.listadoespecialistaspordia = element;
          //       alert("ya existe un turno en esa fecha");
          //     }
          //     });


   
          // }

  objectKeys (objeto: any) {
            const keys = Object.keys(objeto);
           // console.log(keys); // echa un vistazo por consola para que veas lo que hace "Object.keys"
            return keys;
         }

         viewDetails(item)
         {

          // filtro la lista por especialidad y  por dia (lunes, martes ) 
          // y lo guardo en una nueva lista (a) listadoespec
          //3 selecciono el horario y que consulte en turnos si algun especialista a esa hs tiene turno.. si tiene
          //(B)guardo en una tercera lista los especialistas que no estan ocupados y muestro el boton seleccionar

           console.log(item);
           this.mostrarListado=false;
           this.mostrarEspecialistaelegido=true;

           this.fotoespecialistElegido= item.avatar;
           this.nombreEspecialistaelegido=item.name;

           console.log( this.fotoespecialistElegido);
           console.log( this.nombreEspecialistaelegido);
         }


         

}
