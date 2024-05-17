import { Component } from '@angular/core';
import { IUser } from '../../interfaces/iusers.interface';
import { GastosCardComponent } from '../gastos-card/gastos-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gastos-list',
  standalone: true,
  imports: [GastosCardComponent,RouterLink],
  templateUrl: './gastos-list.component.html',
  styleUrl: './gastos-list.component.css'
})
export class GastosListComponent {
  listaUsuarios = ['Grupo 1','Grupo 2','Grupo 3','Grupo 4','Grupo 5']


  //1. Metodo Inject--> en los componenetes donde lo vamos a utilizar
  usuarios: IUser[]=[]//para poder pintar con un @for en el html

  //2. paramentro dentro de la funcion constructor.
  //constructor(private studentServices: StudentsService){}

  ngOnInit(){
  }
}
