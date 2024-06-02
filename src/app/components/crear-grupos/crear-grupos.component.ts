import { Component, Input, inject } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { FormsModule, NgForm } from '@angular/forms';
import { IGroup } from '../../interfaces/igroup';
import { Router } from '@angular/router';
@Component({
  selector: 'app-crear-grupos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-grupos.component.html',
  styleUrl: './crear-grupos.component.css'
})
export class CrearGruposComponent {
  groupService = inject(GroupService)
  router = inject(Router)
  newGroup: IGroup = {
    "name": ''
  };

  createGroup(form: NgForm): void {
    this.newGroup.name.trim()
    this.groupService.insertOne(this.newGroup).then(response => {
      form.resetForm()
      // const { id } = response
      // this.router.navigateByUrl(`/group/${id}`)
    })
  }
}
