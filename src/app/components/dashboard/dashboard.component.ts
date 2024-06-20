import { Component, Input, inject } from '@angular/core';
import { Iactivity } from '../../interfaces/iactivity';
import { PagosService } from '../../services/pagos.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @Input() miSpent!: Iactivity;
  @Input() idGroup!: number; // Recibe el id del grupo como input



pagosService = inject(PagosService);
totalAmount: number = 0;

constructor() { 
  console.log('Constructor - idGroup:', this.idGroup);
}

ngOnInit() {
  console.log('idGroup:', this.idGroup); // Verificar el id del grupo recibido

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
}



