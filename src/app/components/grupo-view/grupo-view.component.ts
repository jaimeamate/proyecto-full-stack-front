import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { IGroup } from '../../interfaces/igroup';
import { GastosListComponent } from '../gastos-list/gastos-list.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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
  group: IGroup = { 
    "name": '',
    "description": ''
  };
  editing: boolean = false;
  
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params:any) => {
      const id = params.id
      try {
        this.group = await this.groupService.getById(id)
      } catch (error) {
        this.router.navigate(['/home'])
      }
    })
  }

  editMode() {
    this.editing = !this.editing
  }

  editGroup(): boolean | void {
    this.groupService.updateById(this.group)
    this.editMode()
  }

  applyEdit(form: NgForm){
    form.value.id = this.group.id
    this.group = form.value;
    this.editGroup()
  }

  async onDelete(){
    const {value: deleteGroup} = await Swal.fire({
      title: `Would you like delete group '${this.group.name}'?`,
      icon: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
      confirmButtonColor: '#DC3545',
      showCloseButton: true
    })
    // const deleteGroup = confirm(`Would you like delete ${this.group.name}`)
    if(deleteGroup && this.group.id !== undefined){
      this.groupService.deleteById(this.group.id).then(async ()=>{
        await Swal.fire({
          title: "Deleted!",
          text: `'${this.group.name}' has been deleted!`,
          icon: "success"
        });
        this.router.navigate(['/home'])
      })
    }
  }
}
