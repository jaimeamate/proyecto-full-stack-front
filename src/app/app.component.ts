import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VistaGastosComponent } from './pages/vista-gastos/vista-gastos.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,VistaGastosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front-full-stack-unir-project';
}
