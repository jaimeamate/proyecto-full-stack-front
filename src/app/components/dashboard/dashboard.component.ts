import { Component, EventEmitter, Input, Output, TemplateRef, inject } from '@angular/core';
import { Iactivity } from '../../interfaces/iactivity';
import { PagosService } from '../../services/pagos.service';
import { GroupService } from '../../services/group.service';
import { Usuario } from '../../interfaces/iusuario';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DecimalPipe, JsonPipe, PercentPipe } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { EditMembersGroupComponent } from '../edit-members-group/edit-members-group.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, DecimalPipe, PercentPipe, CurrencyPipe, JsonPipe, EditMembersGroupComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @Input() user: any;
  @Input() miSpent!: Iactivity;
  @Input() payments: number[] = [];
  @Input() idGroup!: number; // Recibe el id del grupo como input
  initialLength = 0
  groupService = inject(GroupService)
  members:any[] = []
  editing = false


pagosService = inject(PagosService);
totalAmount: number = 0;

constructor(private modalService: NgbModal,private userService: UsuariosService) {
  this.initialLength = this.payments.length
}

async ngOnInit() {
  this.members = await this.groupService.getGroupMembers(this.idGroup)
  this.calculateTotal()
}
calculateTotal(){
  if(this.payments && this.initialLength!==this.payments.length){
    this.totalAmount = this.payments.reduce(
      (acc,crr) => acc + crr, 0
    )
    this.initialLength = this.payments.length
    this.groupService.groupEmitter.emit(this.totalAmount)
  }
}
open(content: TemplateRef<any>) {
  this.modalService.open(content, { size: 'lg' })
}
onDeleteAllPayments(){
  Swal.fire({
    title: "Are you sure to delete all paymets?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonColor: "#3085d6",
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      await this.groupService.deleteAllActivitiesByIdGroup(this.idGroup)
      this.userService.userEmitter.emit()
      Swal.fire({
        title: "Deleted!",
        text: "All payments has been deleted.",
        icon: "success"
      });
    }
  });
}




}



