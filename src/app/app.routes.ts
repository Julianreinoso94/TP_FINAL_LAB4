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
import { ListadoPacientesComponent } from './Componentes/listado-pacientes/listado-pacientes.component';
import { HabilitarTurnosRecepcionComponent } from './Componentes/habilitar-turnos-recepcion/habilitar-turnos-recepcion.component';
import { AbmsalitaComponent } from './Componentes/abmsalita/abmsalita.component';
import { VerTurnosPacienteComponent } from './Componentes/ver-turnos-paciente/ver-turnos-paciente.component';
import { EncuestaClienteComponent } from './Componentes/encuesta-cliente/encuesta-cliente.component';
import { ListadoturnosEeComponent } from './Componentes/listadoturnos-ee/listadoturnos-ee.component';
import { SalaDeesperaComponent } from './Componentes/sala-deespera/sala-deespera.component';
import { EstadisticasComponent } from './Componentes/estadisticas/estadisticas.component';
import { EncuestaUserComponent } from './Componentes/encuesta-user/encuesta-user.component';
import { EditEspecialistaComponent } from './Componentes/edit-especialista/edit-especialista.component';
import { CarrouselComponent } from './Componentes/carrousel/carrousel.component';
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
import { TurnosRecepcionComponent } from './Componentes/turnos-recepcion/turnos-recepcion.component'
import { MisTurnosComponent } from './Componentes/mis-turnos/mis-turnos.component'
import { TurnosAltaEspecialistaComponent } from './Componentes/turnos-alta-especialista/turnos-alta-especialista.component'
import { EditPacienteComponent } from './edit-paciente/edit-paciente.component'






export const rootRouterConfig: Routes = [
 { path: '', component: HomeComponent},
 //{ path: '**', component: AlertaLogueoComponent},
  { path: 'altas', component: AltasComponent  ,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-user', component: NewUserComponent  ,canActivate:[AuthGuard]},
  { path: 'details/:id', component: EditEspecialistaComponent, resolve:{data : EditUserResolver}  ,canActivate:[AuthGuard]},
  { path: 'detailsEspecialista/:id', component: EditPacienteComponent, resolve:{data : EditUserResolver}  ,canActivate:[AuthGuard]},
  { path: 'listadoespecialistas', component: ListadoEspecialistasComponent  ,canActivate:[AuthGuard]},
  { path: 'ModificarProfesional', component: ModificarProfesionalComponent  ,canActivate:[AuthGuard]},
  { path: 'TurnosAlta', component: TurnosAltaComponent  ,canActivate:[AuthGuard]},
  { path: 'AsignarTareas', component: AsignarTareasComponent  ,canActivate:[AuthGuard]},
  { path: 'listadopacientes', component: ListadoPacientesComponent  ,canActivate:[AuthGuard]},
  { path: 'Habilitarturnos', component: HabilitarTurnosRecepcionComponent  ,canActivate:[AuthGuard]},
  { path: 'crearconsultario', component: AbmsalitaComponent  ,canActivate:[AuthGuard]},
  { path: 'verturnospaciente', component: VerTurnosPacienteComponent  ,canActivate:[AuthGuard]},
  { path: 'encuestacliente', component: EncuestaUserComponent  ,canActivate:[AuthGuard]},
  { path: 'TurnosDemispacientes', component: ListadoturnosEeComponent  ,canActivate:[AuthGuard]},
  { path: 'SalaDeEspera', component: SalaDeesperaComponent  ,canActivate:[AuthGuard]},
  { path: 'Estadisticas', component: EstadisticasComponent  ,canActivate:[AuthGuard]},
  { path: 'Carrousel', component: CarrouselComponent},
  { path: 'ABMGESTION', component: AbmGestionComponent},
  { path: 'ContactanosComponent', component: ContactanosComponent},
  { path: 'Informacion', component: InformacionComponent},
  { path: 'ListadoConsultorio', component: ListadoConsultorioComponent},
  { path: 'Servicios', component: ServiciosComponent},
  { path: 'miPerfil', component: MiperfilComponent ,canActivate:[AuthGuard] } ,
  { path: 'EstadisticasTurnos', component: EstadisticasTurnosComponent},
  { path: 'EstadisticasEspecialidades', component: EstadisticasEspecialidadesComponent},
  { path: 'EstadisticasEmpleados', component: EstadisticasEmpleadosComponent},
  { path: 'instalaciones', component: InstalacionComponent},
  { path: 'TurnosRecepcion', component: TurnosRecepcionComponent ,canActivate:[AuthGuard]},
  { path: 'misTurnos', component: MisTurnosComponent ,canActivate:[AuthGuard]},
  { path: 'TurnosEspecialista', component: TurnosAltaEspecialistaComponent ,canActivate:[AuthGuard]}




];
