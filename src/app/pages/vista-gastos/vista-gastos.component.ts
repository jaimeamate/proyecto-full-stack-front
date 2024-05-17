import { Component } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { TablaGastosComponent } from '../../components/tabla-gastos/tabla-gastos.component';
import { USUARIOS } from '../../db/usuarios.mock';

@Component({
  selector: 'app-vista-gastos',
  standalone: true,
  imports: [TablaGastosComponent],
  templateUrl: './vista-gastos.component.html',
  styleUrl: './vista-gastos.component.css'
})
export class VistaGastosComponent {
  usuarios: IUser[] = USUARIOS;
}
