import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GrupoItemComponent } from '../grupo-item/grupo-item.component';
import { GroupService } from '../../services/group.service';
import { IGroup } from '../../interfaces/igroup';

@Component({
  selector: 'app-lista-grupos',
  standalone: true,
  imports: [RouterLink, GrupoItemComponent],
  templateUrl: './lista-grupos.component.html',
  styleUrl: './lista-grupos.component.css'
})
export class ListaGruposComponent {
  groupService = inject(GroupService)
  groups: IGroup[] = []
  
  async getGroups() {
    this.groups = await this.groupService.getAll()
    console.log(this.groups)
  }

  ngOnInit() {
    this.getGroups()
  }
  
}
