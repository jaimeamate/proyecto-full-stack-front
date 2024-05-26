import { Routes } from '@angular/router';
import { LoginComponent } from './components/Login/login.component';
import { ListaGruposComponent } from './components/lista-grupos/lista-grupos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GrupoViewComponent } from './components/grupo-view/grupo-view.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: ListaGruposComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'group/:id', component: GrupoViewComponent},
  { path: "**", redirectTo: 'home' }
];
