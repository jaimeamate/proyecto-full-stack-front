import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GrupoItemComponent } from '../grupo-item/grupo-item.component';

@Component({
  selector: 'app-lista-grupos',
  standalone: true,
  imports: [RouterLink, GrupoItemComponent],
  templateUrl: './lista-grupos.component.html',
  styleUrl: './lista-grupos.component.css'
})
export class ListaGruposComponent {
  listaGrupos = ['Grupo 1','Grupo 2','Grupo 3','Grupo 4','Grupo 5','Grupo 6','Grupo 7','Grupo 8','Grupo 9','Grupo 10']
}
