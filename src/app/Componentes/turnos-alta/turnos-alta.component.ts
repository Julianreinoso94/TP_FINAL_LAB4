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

  events: string[] = [];

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${event.value}`);

   var fecha= this.events.toString();
   var valor=fecha.split(" ",1);

   var color: string;
  switch (valor.toString()) {
    case "Mon":
      alert("Lunes.");
      break;
    case "Tue":
      confirm("Martes");
      break;
    case "Wed":
      confirm("Miercoles");
      break;
    case "Thu":
      confirm("Jueves");
      break;
    case "Fri":
      confirm("Viernes");
      break;
      case "Sat":
      confirm("Sabado");
      break;
    default:
      confirm("Sorry, that color is not in the system yet!");
  }

    console.log(valor);

    console.log(this.events);
    this.events.length=0;
  }


  public clientes:any;

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
  especialidades = [];
  imageUrl2;
  picker:any;
  allTechnologies = [
     '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
     '14:30', '15:00', '16:00', '16:30', '17:00', '17:30', '18:00'
] 
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
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: TurnosService,private service: ImageService
  ) {
    this.authprofile.traerBebidas().subscribe(data => {
      this.clientes = data.map(e => {
        return {
          id: e.payload.doc.id,
          // isEdit: false,
          email: e.payload.doc.data()['email'],
          uid: e.payload.doc.data()['uid'],
        };
      })
      console.log(this.clientes);
    });

    

   }

  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.exampleForm = this.fb.group({
      nombrePaciente: ['', Validators.required ],
      apellidoPaciente: ['', Validators.required ],
      DiaTurno: ['', Validators.required ],
      horaTurno: ['', Validators.required ],
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
    this.firebaseService.createTurno(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }
}
