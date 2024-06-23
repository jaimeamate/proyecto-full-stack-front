import { Component, EventEmitter, Output, inject } from '@angular/core';
import { GroupService } from '../../services/group.service';
import { FormsModule, NgForm } from '@angular/forms';
import { IGroup } from '../../interfaces/igroup';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-crear-grupos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './crear-grupos.component.html',
  styleUrl: './crear-grupos.component.css'
})
export class CrearGruposComponent {
  @Output() groupCreated = new EventEmitter<void>();

  authService = inject(AuthService)
  groupService = inject(GroupService)
  router = inject(Router)
  newGroup: IGroup = {
    "name": '',
    "description":''
  };

  constructor(public activeModal: NgbActiveModal) {}

  createGroup(form: NgForm): void {
    const {user_id: userID} = this.authService.getUserData() 
    this.newGroup.name.trim()
    this.newGroup.description ? this.newGroup.description.trim(): '';
    this.groupService.insertOne(this.newGroup, userID).then(response => {
      form.resetForm()
      this.groupCreated.emit();
      this.activeModal.close();
      // const { id } = response
      // this.router.navigateByUrl(`/group/${id}`)
    });
  }
}
