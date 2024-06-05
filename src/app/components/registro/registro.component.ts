import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [  
    // BrowserModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  usuario: any = {};

  // onSubmit() {
  //   // Aquí iría la lógica para enviar los datos del usuario al servidor
  //   console.log('Usuario registrado:', this.usuario);
  // }
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
    } else {
      console.log('Form not valid');
    }
  }


}
