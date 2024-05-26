import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GrupoItemComponent } from '../grupo-item/grupo-item.component';
import { CrearGruposComponent } from "../crear-grupos/crear-grupos.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-lista-grupos',
    standalone: true,
    templateUrl: './lista-grupos.component.html',
    styleUrl: './lista-grupos.component.css',
    imports: [RouterLink, GrupoItemComponent, CrearGruposComponent]
})
export class ListaGruposComponent {
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void { }
  listaGrupos = ['Grupo 1','Grupo 2','Grupo 3','Grupo 4','Grupo 5','Grupo 6','Grupo 7','Grupo 8','Grupo 9','Grupo 10'];

  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
