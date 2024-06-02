import { Routes } from '@angular/router';
import { LoginComponent } from './components/Login/login.component';
import { ListaGruposComponent } from './components/lista-grupos/lista-grupos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CrearGastosComponent } from './components/crear-gastos/crear-gastos.component';
import { CrearGruposComponent } from './components/crear-grupos/crear-grupos.component';
import { GrupoViewComponent } from './components/grupo-view/grupo-view.component';
import { GastosListComponent } from './components/gastos-list/gastos-list.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: ListaGruposComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'crearGastos', component: CrearGastosComponent },
  { path: 'creaGrupos', component: CrearGruposComponent },   
  { path: 'group/:id', component: GrupoViewComponent},
  {path: 'listaGastos', component: GastosListComponent},
  { path: "**", redirectTo: 'home' }
];
