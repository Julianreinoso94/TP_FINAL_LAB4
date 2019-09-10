import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { abmProfesionales } from 'src/app/services/abmProfesionales.service';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import {AuthService} from "src/app/services/auth.service"
import { ImageService } from 'src/app/services/image.service';


import { AvatarDialogComponent } from 'src/app/avatar-dialog/avatar-dialog.component';

@Component({
  selector: 'app-altas',
  templateUrl: './altas.component.html',
  styleUrls: ['./altas.component.css']
})
export class AltasComponent implements OnInit {
  imgSrc: string;
  selectedImage: any = null;
  isSubmitted: boolean;
  exampleForm: FormGroup;
  avatarLink: string = "https://s3.amazonaws.com/uifaces/faces/twitter/adellecharles/128.jpg";
  especialidades = [];
  imageUrl2;
  allTechnologies = [
     'Recepcionistava',
    'Odontologo',
     'Odontopediatría',
     'Implantólogo'		 
] 
  validation_messages = {
   'name': [
     { type: 'required', message: 'Name is required.' }
   ],
   'surname': [
     { type: 'required', message: 'Surname is required.' }
   ],
   'age': [
     { type: 'required', message: 'Age is required.' },
   ]
   ,
   'especialidad': [
    { type: 'required', message: 'La Especialidad es requirida.' },
  ]
 };

  constructor(private storage: AngularFireStorage, 
    private fb: FormBuilder,
    public dialog: MatDialog,public auth:AuthService,
    private router: Router,
    public firebaseService: abmProfesionales,private service: ImageService
  ) {

   }

  ngOnInit() {
    this.createForm();
  }


  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      age: ['', Validators.required ],
      especialidad: ['', Validators.required ],
      password: ['', Validators.required ],
      email: ['', Validators.required ]

    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.link;
      }
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

  
  onSubmit(value){
    var filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
         // formValue['imageUrl'] = url;
    console.log("entro");
      this.firebaseService.createUser(value, url)
      .then(
        res => {
        this.resetFields();
        
        }
      )
    })
      })
    ).subscribe();
    this.auth.registerEmpleado(value);
  
this.router.navigate(['/listadoespecialistas']);
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

}
