import { Component, Input } from '@angular/core';
import { GastosCardComponent } from '../gastos-card/gastos-card.component';
import { RouterLink } from '@angular/router';
import { SaldosCardComponent } from '../saldos-card/saldos-card.component';
import { Iactivity } from '../../interfaces/iactivity';

@Component({
  selector: 'app-gastos-list',
  standalone: true,
  imports: [GastosCardComponent,RouterLink,SaldosCardComponent],
  templateUrl: './gastos-list.component.html',
  styleUrl: './gastos-list.component.css'
})
export class GastosListComponent {
  listaUsuarios = ['Grupo 1','Grupo 2','Grupo 3','Grupo 4','Grupo 5']
  listaGastos = ['Grupo 1','Grupo 2','Grupo 3','Grupo 4','Grupo 5']

  @Input() myactivity! :Iactivity;

  

  ngOnInit(){
  }
}
