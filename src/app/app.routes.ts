import { Routes } from '@angular/router';
import { LoginComponent } from './components/Login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: LoginComponent },//TODO: Poner aqui la pagina del home. esto es solo una prueba
  { path: 'login', component: LoginComponent },
  { path: "**", redirectTo: 'home' }
];
