import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { UsuariosService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';



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

  constructor(private usuariosService: UsuariosService, private router: Router, private authService: AuthService) { }
  ngOnInit(): void {}
  onSubmit() {
    this.usuariosService.login(this.credentials).subscribe({
      next: (response) => {
        // Manejo de la respuesta del login
        console.log('Login exitoso:', response);
        
        // Convierte el token a string
        const token = String(response.jwt);
        
        // Guarda el token en el almacenamiento local
        localStorage.setItem('token', token);
        
        // Decodifica el token
        const decodedToken: any = jwtDecode(token);
        
        // Guarda el nombre del usuario en el almacenamiento local
        localStorage.setItem('email', decodedToken.email);
        localStorage.setItem('role', decodedToken.role);

        if (decodedToken.ind_baja) {
          alert('Su cuenta está inactiva. Contacte al administrador.');
          this.onLogout();
          return;
        }
        // Redirige a la página principal o a otra página después del login
        this.router.navigate(['/home']);
      },
      error: (err) => {
        // Manejo de errores
        console.error('Error en el login:', err);
        Swal.fire({
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });      }
    });
  }
  
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  

  
}
