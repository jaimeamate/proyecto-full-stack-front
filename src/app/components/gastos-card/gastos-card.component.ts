import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iusers.interface';

@Component({
  selector: 'app-gastos-card',
  standalone: true,
  imports: [],
  templateUrl: './gastos-card.component.html',
  styleUrl: './gastos-card.component.css'
})
export class GastosCardComponent {
  @Input() miUsuario!: IUser
}
