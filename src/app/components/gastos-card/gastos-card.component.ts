import { Component, EventEmitter, Input, Output, inject, output } from '@angular/core';
import { Iactivity } from '../../interfaces/iactivity';
import { PagosService } from '../../services/pagos.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearGastosComponent } from '../crear-gastos/crear-gastos.component';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/user.service';


@Component({
  selector: 'app-gastos-card',
  standalone: true,
  imports: [FormsModule, NgbDropdownModule, CrearGastosComponent, ReactiveFormsModule],
  templateUrl: './gastos-card.component.html',
  styleUrl: './gastos-card.component.css'
})
export class GastosCardComponent {
  @Input() miSpent!: Iactivity;
    @Output() spentUpdated = new EventEmitter<Iactivity>(); // Evento de salida
    @Input() members: any[] = []; // Agrega esto para recibir la lista de miembros

  @Output() spendDeleted = new EventEmitter<number>();

  spentsForm: FormGroup;

  spent: Iactivity[] = [
    {
      "name": '',
    "amount": 0,
    "id": 0,
    "date": "",
    "idGroup": 0,
    }
  ];

  router = inject(Router);
  pagosService = inject(PagosService);
  userService = inject(UsuariosService);
  payer: any = {

  }

  editing: boolean = false;

  constructor() {
    this.spentsForm = new FormGroup({
       name: new FormControl('', [
         Validators.required,
         Validators.minLength(3)
       ]),
       amount: new FormControl('', [
         Validators.required,
         Validators.minLength(1)
       ]),
       date: new FormControl('', [
         Validators.required,
       ]),

       idPayer: new FormControl('', [
         Validators.required
       ]),
    }, []);
  }


  async ngOnInit(): Promise<void> {

   await this.getPayerNameById(this.miSpent.idPayer)
   console.log(this.payer)

    if (this.miSpent) {
      this.spentsForm.patchValue(this.miSpent);
    }
    // this.refreshPage()
  }

  editMode() {
    this.editing = !this.editing;
    if (this.editing) {
      this.spentsForm.patchValue(this.miSpent);
    }
  }

  applyEdit() {
    if (this.spentsForm.valid) {
      const updatedSpent: Iactivity = {
        ...this.miSpent,
        ...this.spentsForm.value
      };
      this.pagosService.update(updatedSpent)
        .then(() => {
          this.miSpent = updatedSpent;
          this.editMode();
          this.spentUpdated.emit(updatedSpent); // Emitir el evento

        })
        .catch((err) => {
          console.error('Error updating spent:', err);
        });
    
    }
    

  }

  

  async getPayerNameById(Id?: any): Promise<void> {
    this.payer = await this.userService.getUserById(Id)  }

  async onDelete() {
    const { value: deleteSpent } = await Swal.fire({
      title: `¿Deseas eliminar el gasto '${this.miSpent.name}'?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      confirmButtonColor: '#DC3545',
      cancelButtonColor: '#6c757d'
    });
  
    if (deleteSpent) {
      if (this.miSpent.id !== undefined) {
        this.pagosService.delete(this.miSpent.id).then(async () => {
          await Swal.fire({
            title: '¡Eliminado!',
            text: `'${this.miSpent.name}' ha sido eliminado.`,
            icon: 'success'
          });
          // Redirigir o actualizar la lista de gastos aquí
          this.spendDeleted.emit();

        }).catch((err) => {
          console.error('Error deleting spent:', err);
        });
      } else {
        console.error('Error deleting spent: Invalid ID');
      }
    }
  }



  checkControl(formControlName: string, validador: string):boolean | undefined {
    return this.spentsForm.get(formControlName)?.hasError(validador) && this.spentsForm.get(formControlName)?.touched;
  }
}
