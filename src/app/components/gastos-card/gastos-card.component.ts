import { Component, EventEmitter, Input, Output, inject, output } from '@angular/core';
import { Iactivity } from '../../interfaces/iactivity';
import { PagosService } from '../../services/pagos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CrearGastosComponent } from '../crear-gastos/crear-gastos.component';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { IGroup } from '../../interfaces/igroup';
import { GroupService } from '../../services/group.service';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-gastos-card',
  standalone: true,
  imports: [FormsModule, NgbDropdownModule, CrearGastosComponent, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './gastos-card.component.html',
  styleUrl: './gastos-card.component.css'
})
export class GastosCardComponent {
  @Input() miSpent!: Iactivity;
    @Output() spentUpdated = new EventEmitter<Iactivity>(); // Evento de salida
    @Input() members: any[] = []; // Agrega esto para recibir la lista de miembros

  @Output() spendDeleted = new EventEmitter<number>();
  activatedRoute = inject(ActivatedRoute)
  authService = inject(AuthService)
  groupService= inject(GroupService)

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
  payer: any = {}

  group!: IGroup

  user: any = {}
  isAdmin: boolean = false;
  editing: boolean = false;
  groupLoaded: boolean = false


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

    this.activatedRoute.params.subscribe(async (params:any) => {
      const id = params.id
      try {
        this.user = this.authService.getUserData()
        console.log(this.user)
        console.log(this.user)    
        this.group = await this.groupService.getById(id)
        this.members = await this.groupService.getGroupMembers(id)
        const [userData] = this.members.filter((m:any) => m.id === this.user.user_id)
        console.log(this.members)
        console.log(userData)
        this.isAdmin = userData.isAdmin
        console.log(this.members)
        console.log(this.isAdmin)
        this.user = userData
        this.groupLoaded = true
      } catch (error) {
        this.router.navigate(['/home'])
      }
    })
  }



  async editMode() {
    this.editing = !this.editing;
    if (this.editing) {
      
      this.spentsForm.patchValue(this.miSpent);
      console.log(this.miSpent)
    }
  }

  applyEdit() {
    if (this.spentsForm.valid) {
      const updatedSpent: Iactivity = {
        ...this.miSpent,
        ...this.spentsForm.value
      };
      this.pagosService.update(updatedSpent)
        .then(async() => {
          this.miSpent = updatedSpent;
          await this.editMode();
          this.payer = await this.userService.getUserById(this.spentsForm.value.idPayer)
      console.log(this.payer)
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
