import { Routes } from '@angular/router';
import { LoginComponent } from './components/Login/login.component';
import { ListaGruposComponent } from './components/lista-grupos/lista-grupos.component';
import { RegistroComponent } from './components/registro/registro.component';
<<<<<<< HEAD
import { GastosListComponent } from './components/gastos-list/gastos-list.component';
=======
import { GrupoViewComponent } from './components/grupo-view/grupo-view.component';
>>>>>>> proyecto-full-stack-front/dev

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: ListaGruposComponent },
  { path: 'login', component: LoginComponent },
<<<<<<< HEAD
  { path: 'login/registro', component: RegistroComponent },
  {path: 'listaGastos', component: GastosListComponent},
=======
  { path: 'register', component: RegistroComponent },
  { path: 'group/:id', component: GrupoViewComponent},
>>>>>>> proyecto-full-stack-front/dev
  { path: "**", redirectTo: 'home' }
];
