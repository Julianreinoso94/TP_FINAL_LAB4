import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from 'src/app/Componentes/login/login.component'
import { NewUserComponent } from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';
import { AltasComponent } from './Componentes/altas/altas.component';
import { AuthGuard } from './guards/auth.guard';
import { ListadoEspecialistasComponent } from './Componentes/listado-especialistas/listado-especialistas.component';
import { ModificarProfesionalComponent } from './Componentes/modificar-profesional/modificar-profesional.component';
import { TurnosAltaComponent } from './Componentes/turnos-alta/turnos-alta.component';
import { AsignarTareasComponent } from './Componentes/asignar-tareas/asignar-tareas.component';


export const rootRouterConfig: Routes = [
  { path: '', component: LoginComponent },
  { path: 'altas', component: AltasComponent  ,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent  ,canActivate:[AuthGuard]},
  { path: 'new-user', component: NewUserComponent  ,canActivate:[AuthGuard]},
  { path: 'details/:id', component: EditUserComponent, resolve:{data : EditUserResolver}  ,canActivate:[AuthGuard]},
  { path: 'listadoespecialistas', component: ListadoEspecialistasComponent  ,canActivate:[AuthGuard]},
  { path: 'ModificarProfesional', component: ModificarProfesionalComponent  ,canActivate:[AuthGuard]},
  { path: 'TurnosAlta', component: TurnosAltaComponent  ,canActivate:[AuthGuard]},
  { path: 'AsignarTareas', component: AsignarTareasComponent  ,canActivate:[AuthGuard]},


];
