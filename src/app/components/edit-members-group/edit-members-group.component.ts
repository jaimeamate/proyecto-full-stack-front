import { PercentPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-members-group',
  standalone: true,
  imports: [PercentPipe,ReactiveFormsModule],
  templateUrl: './edit-members-group.component.html',
  styleUrl: './edit-members-group.component.css'
})
export class EditMembersGroupComponent {
  @Input() members: any;
  modalService = inject(NgbModal);

  constructor(){}
  ngOnInit(){
    console.log(this.members)
  }
}
