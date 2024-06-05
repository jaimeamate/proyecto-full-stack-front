import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { IGroup } from '../../interfaces/igroup';
import { GastosListComponent } from '../gastos-list/gastos-list.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grupo-view',
  standalone: true,
  imports: [GastosListComponent,NgbDropdownModule,FormsModule],
  templateUrl: './grupo-view.component.html',
  styleUrl: './grupo-view.component.css'
})
export class GrupoViewComponent {
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  groupService = inject(GroupService)
  group!: IGroup;
  groupBase!: IGroup;
  editing: boolean = true;
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params:any) => {
      const id = params.id
      try {
        this.groupBase = await this.groupService.getById(id)
        this.group = this.groupBase;
      } catch (error) {
        this.router.navigate(['/home'])
      }
    })
  }

  editMode() {
    this.editing = !this.editing
  }

  editGroup(): boolean | void {
    if (this.group.name === undefined) return false
    this.groupService.updateById(this.group)
    this.editMode()
  }
}
