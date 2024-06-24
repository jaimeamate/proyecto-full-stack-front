import { Component, EventEmitter, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Iactivity } from '../../interfaces/iactivity';
import { UsuariosService } from '../../services/user.service';
import { JsonPipe, PercentPipe } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-saldos-card',
  standalone: true,
  imports: [RouterLink, PercentPipe],
  templateUrl: './saldos-card.component.html',
  styleUrl: './saldos-card.component.css'
})
export class SaldosCardComponent {
  @Input() myactivity! :Iactivity;
  @Input() member: any;
  totalAmount: number = 0;

  constructor(private groupService: GroupService){}
  ngOnInit(){
    this.groupService.groupEmitter.subscribe((total)=>{
      this.totalAmount = total
    })
  }
}
