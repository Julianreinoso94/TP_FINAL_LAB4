import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import { AppComponent } from './app.component';
import { AvatarDialogComponent } from './avatar-dialog/avatar-dialog.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeComponent } from './home/home.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { abmProfesionales } from './services/abmProfesionales.service';
import { AngularFireStorageModule } from "@angular/fire/storage";

import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireDatabaseModule } from "@angular/fire/database";


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatInputModule, MatSliderModule, MatDialogModule } from '@angular/material';
import { LoginComponent } from './Componentes/login/login.component';
import { AltasComponent } from './Componentes/altas/altas.component';
import { AltaEspecialistaComponent } from './Componentes/alta-especialista/alta-especialista.component';
import { TurnosAltaComponent } from './Componentes/turnos-alta/turnos-alta.component';
import { ListadoEspecialistasComponent } from './Componentes/listado-especialistas/listado-especialistas.component';
import { ModificarProfesionalComponent } from './Componentes/modificar-profesional/modificar-profesional.component';
import { InformacionLaboralComponent } from './Componentes/informacion-laboral/informacion-laboral.component';
import { MapasComponent } from './Componentes/mapas/mapas.component';
import { EncuestaUserComponent } from './Componentes/encuesta-user/encuesta-user.component';
import { AsignarTareasComponent } from './Componentes/asignar-tareas/asignar-tareas.component';
import { ListadoturnosEeComponent } from './Componentes/listadoturnos-ee/listadoturnos-ee.component';
import { ListadoPacientesComponent } from './Componentes/listado-pacientes/listado-pacientes.component';
import { HabilitarTurnosRecepcionComponent } from './Componentes/habilitar-turnos-recepcion/habilitar-turnos-recepcion.component';
import { AbmsalitaComponent } from './Componentes/abmsalita/abmsalita.component';
import { VerTurnosPacienteComponent } from './Componentes/ver-turnos-paciente/ver-turnos-paciente.component';
import { EncuestaClienteComponent } from './Componentes/encuesta-cliente/encuesta-cliente.component';
import { SalaDeesperaComponent } from './Componentes/sala-deespera/sala-deespera.component';
import { EstadisticasComponent } from './Componentes/estadisticas/estadisticas.component';



import {MatDatepickerModule, MatNativeDateModule} from '@angular/material';
import { EditEspecialistaComponent } from './Componentes/edit-especialista/edit-especialista.component';


@NgModule({
  declarations: [
    AppComponent,
    AvatarDialogComponent,
    EditUserComponent,
    NewUserComponent,
    HomeComponent,
    LoginComponent,
    AltasComponent,
    AltaEspecialistaComponent,
    TurnosAltaComponent,
    ListadoEspecialistasComponent,
    ModificarProfesionalComponent,
    InformacionLaboralComponent,
    MapasComponent,
    EncuestaUserComponent,
    AsignarTareasComponent,
    ListadoturnosEeComponent,
    ListadoPacientesComponent,
    HabilitarTurnosRecepcionComponent,
    AbmsalitaComponent,
    VerTurnosPacienteComponent,
    EncuestaClienteComponent,
    SalaDeesperaComponent,
    EstadisticasComponent,
    EditEspecialistaComponent
  ],
  entryComponents: [AvatarDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,MatDatepickerModule, MatInputModule,MatNativeDateModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,    AngularFireAuthModule, AngularFirestoreModule,

    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule
  ],
  providers: [FirebaseService,abmProfesionales, EditUserResolver],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
