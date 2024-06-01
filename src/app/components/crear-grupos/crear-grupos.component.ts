import { Component, inject } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { FormsModule, NgForm } from '@angular/forms';
import { IGroup } from '../../interfaces/igroup';
import { isString } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-crear-grupos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-grupos.component.html',
  styleUrl: './crear-grupos.component.css'
})
export class CrearGruposComponent {
  groupService = inject(GroupService)
  newGroup!: IGroup;

  async createGroup(form: NgForm): Promise<IGroup | any> {
    if (!isString(form.name)) return undefined;
    this.newGroup.name = form.name
    await this.groupService.insertOne(this.newGroup)
  }
}
