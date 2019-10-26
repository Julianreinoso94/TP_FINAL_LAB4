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
  events: string[] = [];
  pedidos : any;
  horaTurno;
  turnos : any;
  ageValue: number = 0;
  searchValue: string = "";
  listadoespecialistas: Array<any>;
  listadoespecialistaspordia: Array<any>=[];
  cliente;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  especialidadesTurno = [
   'Odontologo',
    'Odontopediatría',
    'Implantólogo'		 
] 
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);

   var fecha= this.events.toString();
   this.fechatotal=fecha;
   console.log("esta es l fecha"+fecha);
   var valor=fecha.split(" ",1);

   var color: string;
  //  var valor1 = this.listadoespecialistaspordia.length;

    //  console.log( valor1);
   // this.listadoespecialistaspordia.length=0;


   

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

  constructor(private storage: AngularFireStorage,  private authprofile: AuthService,
    private fb: FormBuilder,private servicioProfesionales: abmProfesionales,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: TurnosService,private service: ImageService
  ) {

 

    this.createForm();

    // this.servicioProfesionales.getUser
    this.traerprofesional();
    this.traerturnos();

   }

  ngOnInit() {
    console.log("ngOnInit");

  
  }



  createForm() {
    this.exampleForm = this.fb.group({
      nombrePaciente: ['', Validators.required ],
      apellidoPaciente: ['', Validators.required ],
      cliente:this.cliente,
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

  async traerprofesional()
  {
    this.servicioProfesionales.getUsers().subscribe(data => {

      this.pedidos = data.map(e => {
        return {
          id: e.payload.doc.id,
          avatar: e.payload.doc.data()['avatar'],
          especialidad: e.payload.doc.data()['especialidad'],
          horario: e.payload.doc.data()['horario'],
          diasDeTrabajo: e.payload.doc.data()['diasDeTrabajo'],
          surname: e.payload.doc.data()['surname'],
      
        };
      })

      
   
    });
    return this.pedidos;
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
    return this.pedidos;
  }

   especialistaPorDia (dia: String){
    this.listadoespecialistaspordia = [];

     this.contador=0;
     this.contador++;
     if (this.contador>0)
     {
      this.listadoespecialistaspordia.length = 0;
     }

    this.pedidos.forEach(element => {
     
      if(element.diasDeTrabajo == dia)
      {
        this.listadoespecialistaspordia = element;
      }
      });

      console.log(this.listadoespecialistaspordia);
   this.compararFecha();
  }

          compararFecha()
          {
            
           console.log("la fechaelegida es:"+this.DiaTurno.getTime() );
            this.turnos.forEach(element => {
            

              if(element.DiaTurno == this.fechatotal)
              {
                this.listadoespecialistaspordia = element;
                alert("ya existe un turno en esa fecha");
              }
              });


   
          }

          profesionalLibrePorHora()
          {
            this.listadoespecialistaspordia=[];
            alert(this.horaTurno);

            this.listadoespecialistaspordia.forEach(element => {
            

              if(element.horaTurno == this.horaTurno)
              {
                this.listadoespecialistaspordia = element;
                alert("ya existe un turno en esa fecha");
              }
              });

          }

          objectKeys (objeto: any) {
            const keys = Object.keys(objeto);
            console.log(keys); // echa un vistazo por consola para que veas lo que hace "Object.keys"
            return keys;
         }


}
