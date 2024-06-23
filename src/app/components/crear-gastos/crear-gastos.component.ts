import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormControl, FormGroup, NgForm, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { PagosService } from '../../services/pagos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Iactivity } from '../../interfaces/iactivity';
import { Ipayer } from '../../interfaces/ipayer';

// Custom validator to check max digits



@Component({
  selector: 'app-crear-gastos',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-gastos.component.html',
  styleUrl: './crear-gastos.component.css'
})

export class CrearGastosComponent {
  @Output() close = new EventEmitter<void>();

  @Output() spentCreated = new EventEmitter<void>();
  @Input() idGroup!: number | undefined;
  @Output() payerIdEmitter = new EventEmitter<number>();

  spentsForm: FormGroup;
  pagosService = inject(PagosService)
  groupService = inject(GroupService)
  router = inject(Router)
  activateRoute = inject(ActivatedRoute)
  newSpent: Iactivity[] = []
  members: any[] = [] 
  payerId: Ipayer | undefined;


  
  // public activeModal: NgbActiveModal
    

  constructor(){
    this.spentsForm = new FormGroup({
      
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      amount: new FormControl('',[
        Validators.required,
        Validators.minLength(1),
        this.maxDigitsValidator(10) // Custom validator para chequear la cantidad de dígitos


      ]),
      date: new FormControl('',[
        Validators.required,
      ]),

      idPayer: new FormControl('', [
        Validators.required
      ]), // A
      
      

    }, [])
  }

//Funcion custom validator check max digits
  maxDigitsValidator(maxDigits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (value && value.toString().length > maxDigits) {
        return { maxDigits: true };
      }
      return null;
    };
  }

  
  ngOnInit(): void {
   this.getMembers();
    
    this.getDataForm();
  }

  async getDataForm() {
    if (this.spentsForm.valid) {
      console.log(this.spentsForm.value);
      const newSpent: Iactivity = { ...this.spentsForm.value, idGroup: this.idGroup };
      console.log(this.idGroup) // Cambiado para crear un objeto en lugar de un arreglo
      try {
        await this.pagosService.insert(newSpent).then(Response =>{
          this.spentsForm.reset();
          this.spentCreated.emit();
          this.cerrarModal()
        }); // Pasamos directamente el objeto
        console.log('Gasto creado con éxito');
        console.log('Nuevo gasto:', newSpent);
        this.spentCreated.emit();
        this.spentsForm.reset();
      } catch (error) {
        console.error('Error al crear el gasto', error);
      }
    }
  }

  async getMembers() {
    if (this.idGroup !== undefined) {
      this.members = await this.groupService.getGroupMembers(this.idGroup);
      console.log('Miembros del grupo:', this.members); // Verifica los datos obtenidos
    }
  }
                     
  cerrarModal() {
    this.close.emit(); // Esto notificará al componente padre
  }

  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.spentsForm.get(formControlName)?.hasError(validador) && this.spentsForm.get(formControlName)?.touched
  }


}
 
  

