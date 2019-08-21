import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AltaEstrellacineComponent } from './componentes/alta-estrellacine/alta-estrellacine.component';
import { AuthGuard } from "./guards/auth.guard";
import { NoLoginGuard } from "./guards/no-login.guard";
import { PageNotFoundComponentComponent } from './componentes/page-not-found-component/page-not-found-component.component';

const routes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
