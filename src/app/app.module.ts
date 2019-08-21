import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoComponent } from './componentes/alumno/alumno.component';
import { FormsModule } from '@angular/forms';
import { ListadoAlumnosComponent } from './componentes/listado-alumnos/listado-alumnos.component';
import { DetalleAlumnosComponent } from './componentes/detalle-alumnos/detalle-alumnos.component';
import { ProfesorComponent } from './componentes/profesor/profesor.component';
import { DetalleProfesorComponent } from './componentes/detalle-profesor/detalle-profesor.component';
import { ListadoProfesorComponent } from './componentes/listado-profesor/listado-profesor.component';
import { TablaProfesorComponent } from './componentes/tabla-profesor/tabla-profesor.component';
import { FilaProfesorComponent } from './componentes/fila-profesor/fila-profesor.component';


//FIREBASE

import { firebaseConfig } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, FirestoreSettingsToken } from "@angular/fire/firestore";

//componentes
import { AltaEstrellacineComponent } from './componentes/alta-estrellacine/alta-estrellacine.component';
import { LoginComponent } from './componentes/login/login.component';
import { PageNotFoundComponentComponent } from './componentes/page-not-found-component/page-not-found-component.component';
import { ActoresComponent } from './componentes/actores/actores.component';
import { RouterModule } from '@angular/router';
import { AltaPeliculaComponent } from './componentes/alta-pelicula/alta-pelicula.component';
import { ListadopeliculasComponent } from './componentes/listadopeliculas/listadopeliculas.component';
import { BotoneliminapeliculasComponent } from './componentes/botoneliminapeliculas/botoneliminapeliculas.component';
import { BusquedapeliculaComponent } from './componentes/busquedapelicula/busquedapelicula.component';
import { AltausuarioComponent } from './componentes/altausuario/altausuario.component';
import { ListadoactoresComponent } from './componentes/listadoactores/listadoactores.component';
import { AuthGuard } from './guards/auth.guard';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { AdivinaElNumeroComponent } from './componentes/adivina-el-numero/adivina-el-numero.component';
import { AgilidadAritmeticaComponent } from './componentes/agilidad-aritmetica/agilidad-aritmetica.component';
import { TatetiComponent } from './componentes/tateti/tateti.component';
import { PptComponent } from './componentes/ppt/ppt.component';
import { AnagramaComponent } from './componentes/anagrama/anagrama.component';
import { PreguntasComponent } from './componentes/preguntas/preguntas.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { Anagrama2Component } from './componentes/anagrama2/anagrama2.component';
import { ListadoresultadoComponent } from './componentes/listadoresultado/listadoresultado.component';

const MiRuteo  = [
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'principal', component: PrincipalComponent,canActivate:[AuthGuard]},
  { path: 'agilidad', component: AgilidadAritmeticaComponent,canActivate:[AuthGuard]},
  { path: 'tateti', component: TatetiComponent,canActivate:[AuthGuard]},
  { path: 'adivinanum', component: AdivinaElNumeroComponent ,canActivate:[AuthGuard]},
  { path: 'anagrama', component: Anagrama2Component,canActivate:[AuthGuard]},
  { path: 'preguntas', component: PreguntasComponent ,canActivate:[AuthGuard]},
  { path: 'ppt', component: PptComponent,canActivate:[AuthGuard]},
  { path: 'listadoresult', component: ListadoresultadoComponent ,canActivate:[AuthGuard]}, 

  { path: 'soy', component: QuienSoyComponent ,canActivate:[AuthGuard]},




  { path: 'peliculas',
  children:
  [
  { path: '', component: ListadopeliculasComponent ,canActivate:[AuthGuard]},
    {path:'alta', component: AltaPeliculaComponent ,canActivate:[AuthGuard]}
  ]
   
}, 
{ path: 'actor',
  children:
  [
    {path:'alta', component: AltaEstrellacineComponent ,canActivate:[AuthGuard]},
    {path:'listado', component: ListadoactoresComponent ,canActivate:[AuthGuard]}
  ]
   
},
  { path: 'altausuario', component: AltausuarioComponent ,canActivate:[AuthGuard] }, 
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AlumnoComponent,
    ListadoAlumnosComponent,
    DetalleAlumnosComponent,
    ProfesorComponent,
    DetalleProfesorComponent,
    ListadoProfesorComponent,
    TablaProfesorComponent,
    FilaProfesorComponent,
    AltaEstrellacineComponent,
    LoginComponent,
    PageNotFoundComponentComponent,
    ActoresComponent,
    AltaPeliculaComponent,
    ListadopeliculasComponent,
    BotoneliminapeliculasComponent,
    BusquedapeliculaComponent,
    AltausuarioComponent,
    ListadoactoresComponent,
    NavbarComponent,
    PrincipalComponent,
    AdivinaElNumeroComponent,
    AgilidadAritmeticaComponent,
    TatetiComponent,
    PptComponent,
    AnagramaComponent,
    PreguntasComponent,
    QuienSoyComponent,
    Anagrama2Component,
    ListadoresultadoComponent
  ],
  imports: [
    FormsModule,    RouterModule.forRoot(MiRuteo),
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, AngularFirestoreModule
  ],
  providers: [
    {provide: FirestoreSettingsToken, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
