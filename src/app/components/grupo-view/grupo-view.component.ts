import { Component, inject, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GroupService } from '../../services/group.service';
import { IGroup } from '../../interfaces/igroup';
import { GastosListComponent } from '../gastos-list/gastos-list.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError, of, tap } from 'rxjs';



@Component({
  selector: 'app-grupo-view',
  standalone: true,
  imports: [GastosListComponent,NgbDropdownModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './grupo-view.component.html',
  styleUrl: './grupo-view.component.css'
})

export class GrupoViewComponent {
  @ViewChild('modalContent') modalContent: TemplateRef<any> | undefined;
  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)
  group: IGroup = { 
     id: 0,
    "name": '',
    "description": ''
  };
  editing: boolean = false;
  inputs: string[] = [];
  email: string = '';



  constructor(private modalService: NgbModal, private groupService: GroupService) {}


  
  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params:any) => {
      const id = params.id
      try {
        this.group = await this.groupService.getById(id)
      } catch (error) {
        this.router.navigate(['/home'])
      }
    })
  }

  editMode() {
    this.editing = !this.editing
  }

  editGroup(): boolean | void {
    this.groupService.updateById(this.group)
    this.editMode()
  }

  applyEdit(form: NgForm){
    form.value.id = this.group.id
    this.group = form.value;
    this.editGroup()
  }

  async onDelete(){
    const {value: deleteGroup} = await Swal.fire({
      title: `Would you like delete group '${this.group.name}'?`,
      icon: 'warning',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
      confirmButtonColor: '#DC3545',
      showCloseButton: true
    })
    // const deleteGroup = confirm(`Would you like delete ${this.group.name}`)
    if(deleteGroup && this.group.id !== undefined){
      this.groupService.deleteById(this.group.id).then(async ()=>{
        await Swal.fire({
          title: "Deleted!",
          text: `'${this.group.name}' has been deleted!`,
          icon: "success"
        });
        this.router.navigate(['/home'])
      })
    }
  }
  openModal() {
    const modalRef = this.modalService.open(this.modalContent);
    modalRef.result.finally(()=>{
      this.clearInput();
    })
  }

  clearInput() {
    this.email = '';
  }

  addInput() {
    this.inputs.push('');
  }
  /**
   * Aqui uso pipe para encadenar los multiples emails que se pueden enviar del modal.
   * Uso tap para enviar cada email
   */
  sendInputs(form: NgForm) {
    if (form.valid) {
      const payload = { to: this.email, groupId: form.value.groupId, user: localStorage.getItem('email') };
      this.groupService.sendInputs(payload).pipe(
        tap(response => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Mail con invitación enviado con exito!',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          this.modalService.dismissAll();
        }),
        catchError(error => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar el mail.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.error('Error sending inputs:', error);
          return of(null);
        })
      ).subscribe();
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, rellena todos los campos.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }
    // Función trackBy para mejorar el rendimiento de *ngFor
    trackByIndex(index: number, item: any): any {
      return index;
    }
}
