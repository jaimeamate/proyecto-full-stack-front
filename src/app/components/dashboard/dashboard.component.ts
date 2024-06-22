import { Component, Input, inject } from '@angular/core';
import { Iactivity } from '../../interfaces/iactivity';
import { PagosService } from '../../services/pagos.service';
import { GroupService } from '../../services/group.service';
import { Usuario } from '../../interfaces/iusuario';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, DecimalPipe, JsonPipe, PercentPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, DecimalPipe, PercentPipe, CurrencyPipe, JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @Input() miSpent!: Iactivity;
  @Input() payments: number[] = [];
  @Input() idGroup!: number; // Recibe el id del grupo como input
  initialLength = 0
  groupService = inject(GroupService)
  members:any[] = []
  editing = false


pagosService = inject(PagosService);
totalAmount: number = 0;

constructor() {
  console.log(this.payments.length)
  this.initialLength = this.payments.length
  console.log('Constructor - idGroup:', this.idGroup);
}

async ngOnInit() {
  this.members = await this.groupService.getGroupMembers(this.idGroup)
  console.log(this.payments)
  this.calculateTotal()
  console.log('idGroup:', this.idGroup); // Verificar el id del grupo recibido
  console.log(this.members)
  console.log(this.totalAmount)
//   if (this.idGroup !== undefined && this.idGroup !== null) {
//     this.pagosService.getByGroup(this.idGroup).then(activities => {
//       console.log('Activities received:', activities); // Verificar los datos obtenidos
//       this.totalAmount = activities.reduce((sum, activity) => {
//         const amount = Number(activity.amount);
//         console.log('Current amount:', amount, 'Current sum:', sum);
//         return sum + amount;
//       }, 0);
//       console.log('Total Amount:', this.totalAmount); // Verificar el total calculado
//     }).catch(error => {
//       console.error('Error fetching activities:', error);
//     });
//   } else {
//     console.error('Invalid idGroup:', this.idGroup);
//   }
// }
}
calculateTotal(){
  console.log(this.payments)
  if(this.payments && this.initialLength!==this.payments.length){
    this.totalAmount = this.payments.reduce(
      (acc,crr) => acc + crr, 0
    )
    this.initialLength = this.payments.length
  }
}
editMode(){
  this.editing = !this.editing
}
}



