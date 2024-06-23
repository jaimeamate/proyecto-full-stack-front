import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Iactivity } from '../../interfaces/iactivity';

@Component({
  selector: 'app-saldos-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './saldos-card.component.html',
  styleUrl: './saldos-card.component.css'
})
export class SaldosCardComponent {
@Input() myactivity! :Iactivity;
@Input() member: any;

constructor(){}
}
