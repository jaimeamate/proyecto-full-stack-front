import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GrupoItemComponent } from '../grupo-item/grupo-item.component';
import { GroupService } from '../../services/group.service';
import { IGroup } from '../../interfaces/igroup';
import { CrearGruposComponent } from "../crear-grupos/crear-grupos.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { COLORS } from '../../utils/colors';


@Component({
    selector: 'app-lista-grupos',
    standalone: true,
    templateUrl: './lista-grupos.component.html',
    styleUrl: './lista-grupos.component.css',
    imports: [RouterLink, GrupoItemComponent, CrearGruposComponent]
})
export class ListaGruposComponent {
  groupService = inject(GroupService)
  groups: IGroup[] = []
  colors: string[] = COLORS 
  
  constructor(private modalService: NgbModal) { }
  
  ngOnInit() {
    this.getGroups()
  }

  async getGroups() {
    this.groups = await this.groupService.getAll()
    console.log(this.groups)
  }
  
  openModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  getColorGroup(index: number) {
    // console.log(index)
    return this.colors[index % this.colors.length]
  }
}
