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
import { ExportAsModule } from 'ngx-export-as';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CarrouselComponent } from './Componentes/carrousel/carrousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  
import { ChartsModule } from 'ng2-charts';
// import 'hammerjs';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AbmGestionComponent } from './Componentes/abm-gestion/abm-gestion.component';
import { ContactanosComponent } from './Componentes/contactanos/contactanos.component';
import { InformacionComponent } from './Componentes/informacion/informacion.component';
import { ListadoConsultorioComponent } from './Componentes/listado-consultorio/listado-consultorio.component';
import { AlertaLogueoComponent } from './Componentes/alerta-logueo/alerta-logueo.component';
import { ServiciosComponent } from './Componentes/servicios/servicios.component';
import { MiperfilComponent } from './Componentes/miperfil/miperfil.component';
import { InstalacionComponent } from './Componentes/instalacion/instalacion.component';
import { EstadisticasTurnosComponent } from './Componentes/estadisticas-turnos/estadisticas-turnos.component';
import { EstadisticasEspecialidadesComponent } from './Componentes/estadisticas-especialidades/estadisticas-especialidades.component';
import { EstadisticasEmpleadosComponent } from './Componentes/estadisticas-empleados/estadisticas-empleados.component';
import {ProfileService} from "src/app/services/profile.service";
import { TurnosRecepcionComponent } from './Componentes/turnos-recepcion/turnos-recepcion.component';
import { MisTurnosComponent } from './Componentes/mis-turnos/mis-turnos.component';
import { TurnosAltaEspecialistaComponent } from './Componentes/turnos-alta-especialista/turnos-alta-especialista.component';
import { EditPacienteComponent } from './edit-paciente/edit-paciente.component'

// Import library module
import { NgxSpinnerModule } from "ngx-spinner";
import { MatSnackBarModule } from "@angular/material";
import { ListadocomentariosComponent } from './listadocomentarios/listadocomentarios.component';
@NgModule({
  declarations: [
    AppComponent,
    // NgxHmCarouselModule,
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
    EditEspecialistaComponent,
    CarrouselComponent,
    AbmGestionComponent,
    ContactanosComponent,
    InformacionComponent,
    ListadoConsultorioComponent,
    AlertaLogueoComponent,
    ServiciosComponent,
    MiperfilComponent,
    InstalacionComponent,
    EstadisticasTurnosComponent,
    EstadisticasEspecialidadesComponent,
    EstadisticasEmpleadosComponent,
    TurnosRecepcionComponent,
    MisTurnosComponent,
    TurnosAltaEspecialistaComponent,
    EditPacienteComponent,
    ListadocomentariosComponent
  ],
  entryComponents: [AvatarDialogComponent],
  imports: [
    BrowserModule,NgxCaptchaModule,NgbModule ,
    FormsModule,MatDatepickerModule, MatInputModule,MatNativeDateModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,MatDialogModule,
    ReactiveFormsModule,MatCardModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,    AngularFireAuthModule, AngularFirestoreModule,
    ExportAsModule,
    BrowserAnimationsModule,
    MatButtonModule, MatSnackBarModule,
    MatInputModule,MatFormFieldModule,NgxSpinnerModule
    ,
    MatSliderModule,    ChartsModule

  ],
   providers: [FirebaseService,abmProfesionales,ProfileService, EditUserResolver],

  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
