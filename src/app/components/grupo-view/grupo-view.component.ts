import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { IGroup } from '../../interfaces/igroup';

@Component({
  selector: 'app-grupo-view',
  standalone: true,
  imports: [],
  templateUrl: './grupo-view.component.html',
  styleUrl: './grupo-view.component.css'
})
export class GrupoViewComponent {
  activatedRoute = inject(ActivatedRoute)
  groupService = inject(GroupService)
  group: IGroup | any
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params:any) => {
      const id = params.id
      try {
        this.group = await this.groupService.getById(id)
      } catch (error) {
        console.log(error)
      }
    })
  }
}
