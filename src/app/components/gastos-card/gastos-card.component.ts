import { Component, Input } from '@angular/core';
import { Iactivity } from '../../interfaces/iactivity';

@Component({
  selector: 'app-gastos-card',
  standalone: true,
  imports: [],
  templateUrl: './gastos-card.component.html',
  styleUrl: './gastos-card.component.css'
})
export class GastosCardComponent {
  @Input() miSpent!: Iactivity
}
