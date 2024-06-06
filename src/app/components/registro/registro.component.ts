import { CommonModule } from '@angular/common';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UsuariosService } from '../../services/user.service'; 
import { Usuario } from '../../interfaces/iusuario';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';


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

  constructor(private authService: AuthService, private route: ActivatedRoute, private modalService: NgbModal,  private usuariosService: UsuariosService) {
    this.usuario = {
      _id: '',
      id: 0,
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
  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted!', form.value);
    } else {
      console.log('Form not valid');
    }
  }

  confirmDelete() {
    this.modalRef = this.modalService.open(this.confirmModal);
  }

  deleteAccount(modal: NgbModalRef) {
    // Actualizar el campo `ind_baja` a `true`
    this.usuariosService.updateUserIndBaja(this.usuario.id, true).subscribe({
      next: (response) => {
        console.log('Usuario dado de baja:', response);
        modal.close(); // Cierro el modal
      },
      error: (err) => {
        console.error('Error al dar de baja al usuario:', err);
      }
    });
  }


}
