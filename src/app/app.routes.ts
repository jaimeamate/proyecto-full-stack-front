import { Routes } from '@angular/router';
import { LoginComponent } from './components/Login/login.component';
import { ListaGruposComponent } from './components/lista-grupos/lista-grupos.component';
import { RegistroComponent } from './components/registro/registro.component';
import { CrearGastosComponent } from './components/crear-gastos/crear-gastos.component';
import { CrearGruposComponent } from './components/crear-grupos/crear-grupos.component';
import { GrupoViewComponent } from './components/grupo-view/grupo-view.component';
import { GastosListComponent } from './components/gastos-list/gastos-list.component';
import { authGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: ListaGruposComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'crearGastos', component: CrearGastosComponent, canActivate: [authGuard] },
  { path: 'creaGrupos', component: CrearGruposComponent, canActivate: [authGuard] },   
  { path: 'group/:id', component: GrupoViewComponent, canActivate: [authGuard]},
  { path: 'listaGastos', component: GastosListComponent, canActivate: [authGuard]},
  { path: "**", redirectTo: 'home' }
];
