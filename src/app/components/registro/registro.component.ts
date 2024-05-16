import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  usuario: any = {};

  onSubmit() {
    // Aquí iría la lógica para enviar los datos del usuario al servidor
    console.log('Usuario registrado:', this.usuario);
  }
}
