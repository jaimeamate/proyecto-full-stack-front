import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsuariosService } from '../../services/user.service';
import { FormsModule, NgModel } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = {
    email: '',
    password: ''
  };

  constructor(private usuariosService: UsuariosService, private router: Router) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit() {
    this.usuariosService.login(this.credentials).subscribe({
      next: (response) => {
        // Manejo de la respuesta del login
        console.log('Login exitoso:', response);
        // Redirigir a la página principal o a otra página después del login
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Manejo de errores
        console.error('Error en el login:', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
  

  
}
