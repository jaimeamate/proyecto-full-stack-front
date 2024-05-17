import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-tabla-gastos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tabla-gastos.component.html',
  styleUrl: './tabla-gastos.component.css'
})
export class TablaGastosComponent {
  @Input() miUsuario!: IUser;

}
