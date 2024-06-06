import { Component, EventEmitter, Output, inject } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { FormsModule, NgForm } from '@angular/forms';
import { IGroup } from '../../interfaces/igroup';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-crear-grupos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-grupos.component.html',
  styleUrl: './crear-grupos.component.css'
})
export class CrearGruposComponent {
  @Output() groupCreated = new EventEmitter<void>();

  groupService = inject(GroupService)
  router = inject(Router)
  newGroup: IGroup = {
    "name": ''
  };

  constructor(public activeModal: NgbActiveModal) {}

  createGroup(form: NgForm): void { 
    this.newGroup.name.trim()
    this.groupService.insertOne(this.newGroup).then(response => {
      form.resetForm()
      this.groupCreated.emit();
      this.activeModal.close();
      // const { id } = response
      // this.router.navigateByUrl(`/group/${id}`)
    });
  }
}
