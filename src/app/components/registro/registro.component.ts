import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/user.service'; 
import { Usuario } from '../../interfaces/iusuario';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';


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
  @ViewChild('confirmModal', { static: true }) confirmModal!: TemplateRef<any>;

  usuario!: Usuario;
  isUpdateMode: boolean = false;
  private modalRef?: NgbModalRef;

  constructor(private authService: AuthService, private route: ActivatedRoute, private modalService: NgbModal,  private usuariosService: UsuariosService, private router: Router) {
    this.usuario = {
      user_id: 0,
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      image: '',
      password: '',
      ind_baja: false
    };
    this.route.queryParams.subscribe(params => {
      this.isUpdateMode = params['mode'] === 'update';
    });
  }

  ngOnInit(): void {
    const userData = this.authService.getUserData();
    if (userData) {
      this.usuario = userData;
      // Asigna otros campos si es necesario
    }
  }
  // onSubmit() {
  //   // Aquí iría la lógica para enviar los datos del usuario al servidor
  //   console.log('Usuario registrado:', this.usuario);
  // }
  onSubmit(registroForm: NgForm) {
    if (registroForm.valid) {
      // Asignar valores predeterminados en caso de que alguna propiedad sea undefined
      const safeFirstName = this.usuario.first_name ?? '';
      const safeLastName = this.usuario.last_name ?? '';
      const safeEmail = this.usuario.email ?? '';
      const safePassword = this.usuario.password ?? '';
      const ind_baja = 0;
      const phoneNumber = ""; // Asumiendo que no hay un campo phoneNumber en el formulario actual
        this.usuariosService.register(safeFirstName, safeLastName, phoneNumber, safeEmail, safePassword, ind_baja).subscribe({
          next: (response) => {
            console.log('Registro exitoso', response);
            Swal.fire({
              title: 'Éxito',
              text: 'El registro ha sido exitoso',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error en el registro', error);
            Swal.fire({
              title: 'Error',
              text:  `Ha ocurrido un error en el registro `,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          }
        });
    }
  }

  confirmDelete() {
    this.modalRef = this.modalService.open(this.confirmModal);
  }

  deleteAccount(modal: NgbModalRef) {
    // Actualizar el campo `ind_baja` a `true`
    let user_id = this.usuario.user_id ?? -1;
    this.usuariosService.updateUserIndBaja(user_id, true).subscribe({
      next: (response) => {
        console.log('Usuario dado de baja:', response);
        modal.close(); // Cierro el modal
        this.onLogout();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al dar de baja al usuario:', err);
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
