import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import{EncuestasService} from 'src/app/services/encuestas.service';

import { ImageService } from 'src/app/services/image.service';
import { useAnimation } from '@angular/animations';
import { from } from 'rxjs';

@Component({
  selector: 'app-encuesta-user',
  templateUrl: './encuesta-user.component.html',
  styleUrls: ['./encuesta-user.component.css']
})
export class EncuestaUserComponent implements OnInit {

  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
  especialidades = [];
  imageUrl2;
  allTechnologies = [
     '1', '2', '3', '4', '5', '6', '7',
     '8', '9', '10'
] 
  validation_messages = {
   'clinica': [
     { type: 'required', message: 'Name is required.' }
   ],
   'descripcion': [
    { type: 'required', message: 'Name is required.' }
  ],
   'especialista': [
     { type: 'required', message: 'Surname is required.' }
   ]
 };

  constructor(private storage: AngularFireStorage, 
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: EncuestasService,private service: ImageService
  ) {

   }

  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.exampleForm = this.fb.group({
      clinica: ['', Validators.required ],
      descripcion: ['', Validators.required ],
      especialista: ['', Validators.required ]
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
    this.firebaseService.createEncuesta(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }
}
