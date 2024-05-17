import { Component } from '@angular/core';
import { TabGastosComponent } from '../../components/tab-gastos/tab-gastos.component';

@Component({
  selector: 'app-vista-gastos',
  standalone: true,
  imports: [TabGastosComponent],
  templateUrl: './vista-gastos.component.html',
  styleUrl: './vista-gastos.component.css'
})
export class VistaGastosComponent {

}
