import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GrupoItemComponent } from '../grupo-item/grupo-item.component';
import { GroupService } from '../../services/group.service';
import { IGroup } from '../../interfaces/igroup';
import { CrearGruposComponent } from "../crear-grupos/crear-grupos.component";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { COLORS } from '../../utils/colors';
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'app-lista-grupos',
    standalone: true,
    templateUrl: './lista-grupos.component.html',
    styleUrl: './lista-grupos.component.css',
    imports: [RouterLink, GrupoItemComponent, CrearGruposComponent]
})
export class ListaGruposComponent {
  authService = inject(AuthService)
  groupService = inject(GroupService)
  groups: IGroup[] = []
  colors: string[] = COLORS  
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.getGroups()
  }

  async getGroups(): Promise<void> {
    const {user_id:userId} = this.authService.getUserData()
    // console.log(await this.groupService.getAll())
    console.log("asada" + userId);
    this.groups = await this.groupService.getAll(userId)
    console.log("dfs" + this.groups);
  }

  getColorGroup(index: number) {
    return this.colors[index % this.colors.length]
  }

  openCrearGrupoModal() {
    const modalRef = this.modalService.open(CrearGruposComponent);
    modalRef.componentInstance.groupCreated.subscribe(async () => {
      await this.getGroups()
    });
  } 

}
