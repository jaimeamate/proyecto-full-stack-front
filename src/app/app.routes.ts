import { Routes } from '@angular/router';
import { LoginComponent } from './components/Login/login.component';
import { ListaGruposComponent } from './components/lista-grupos/lista-grupos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CrearGruposComponent } from './components/crear-grupos/crear-grupos.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: ListaGruposComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login/registro', component: RegistroComponent },
  { path: 'creaGrupos', component: CrearGruposComponent },   
  { path: "**", redirectTo: 'home' }
];
